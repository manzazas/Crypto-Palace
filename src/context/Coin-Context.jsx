import {createContext, useState, useEffect} from "react";

export const CoinContext = createContext();

const API_KEY = import.meta.env.VITE_APP_COINGECKO_API_KEY;

const CoinContextProvider = (props) => {
    const [allCoin, setAllCoin] = useState([]);
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    });

    const fetchAllCoin = async () => {
        try {
            const options = {
                method: 'GET',
                headers: { 
                    accept: 'application/json', 
                    'x-cg-demo-api-key': API_KEY 
                }
            };
            const response = await fetch(
                `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, 
                options
            );
            
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAllCoin(data);
        } catch (error) {
            console.error('Error fetching coins:', error);
        }
    }

    useEffect(() => {
        fetchAllCoin();
    }, [currency]);

    const contextValue = {
        allCoin, 
        currency, 
        setCurrency
    }

    return (
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    );
}

export default CoinContextProvider;