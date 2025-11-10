import { createContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { onAuthStateChanged, browserLocalPersistence, setPersistence } from 'firebase/auth';
import { doc, setDoc, getDoc, onSnapshot } from 'firebase/firestore';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [favoriteCoins, setFavoriteCoins] = useState([]);
    const [error, setError] = useState(null);

    // Set up authentication persistence
    useEffect(() => {
        setPersistence(auth, browserLocalPersistence);
    }, []);

    // Authentication state listening
    useEffect(() => {
        setLoading(true);
        console.log("Setting up auth listener");
        
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            console.log("Auth state changed:", currentUser?.uid);
            setUser(currentUser);
            
            if (currentUser) {
                // Set up real-time listener for user's favorites
                const userFavoritesRef = doc(db, 'users', currentUser.uid);
                
                try {
                    // First, get the initial data
                    const docSnap = await getDoc(userFavoritesRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data().favorites || [];
                        console.log('Initial favorites load:', data);
                        setFavoriteCoins(data);
                    } else {
                        console.log('No favorites found initially');
                        setFavoriteCoins([]);
                    }
                } catch (error) {
                    console.error("Error fetching initial favorites:", error);
                }
                
                // Then set up the real-time listener
                const unsubscribeFavorites = onSnapshot(userFavoritesRef, (doc) => {
                    if (doc.exists()) {
                        const data = doc.data().favorites || [];
                        console.log('Favorites updated from DB:', data);
                        setFavoriteCoins(data);
                    }
                    setLoading(false);
                }, (error) => {
                    console.error("Favorites listener error:", error);
                    setError(error.message);
                    setLoading(false);
                });
                
                return () => {
                    console.log('Unsubscribing from favorites listener');
                    unsubscribeFavorites();
                };
            } else {
                setFavoriteCoins([]);
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    // Update favorites function
    const updateFavorites = async (newFavorites) => {
        if (!user) return;

        try {
            console.log('Saving favorites to DB:', newFavorites);
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, {
                favorites: newFavorites,
                updatedAt: new Date().toISOString()
            }, { merge: true });
        } catch (error) {
            console.error('Error saving favorites:', error);
            setError('Failed to save favorites');
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            loading,
            error,
            favoriteCoins,
            setFavoriteCoins: (newValue) => {
                // Handle both direct values and functional updates
                const updatedFavorites = typeof newValue === 'function' 
                    ? newValue(favoriteCoins) 
                    : newValue;
                
                setFavoriteCoins(updatedFavorites); // Update local state immediately
                if (user) updateFavorites(updatedFavorites); // Then update Firestore
            }
        }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

