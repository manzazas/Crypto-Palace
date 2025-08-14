import React, {useContext, useState,useEffect} from 'react';
import './Navbar.css';
import logo from '../../assets/testingfinal.png'; //import logo
import arrow_icon from '../../assets/arrow_icon.png';//import icon
import {CoinContext} from '../../context/Coin-Context'; //import context
import {Link} from 'react-router-dom'; //import Link for navigation
import {AuthContextProvider} from '../../context/Auth-Context'; //import AuthContextProvider
import {AuthContext} from '../../context/Auth-Context'; //import AuthContext for user authentication
import {signInWithGoogle, auth} from '../../firebase'; //import firebase auth and google sign-in function
import {onAuthStateChanged, signOut } from 'firebase/auth'; //import firebase auth state change listener
const Navbar = () => {
    const { user } = useContext(AuthContext); //get userinfo from AuthContext

    const handleSignOut = async () => {
        try{
            await signOut(auth);
            

        }catch (error){
            console.error("Sign out error:", error);
        }

    }





    const {setCurrency} = useContext(CoinContext);//import context for updating currency type
    
    const currencyHandler = (event) => { //triggered when currency is changed
        switch (event.target.value) {//switch the previous currency based on the current event value that was triggered
            case "usd":{
                setCurrency({
                    name: "usd",
                    symbol: "$"
                });
                break }
            case "eur": {
                setCurrency({
                    name: "eur",
                    symbol: "€"
                });
                break }
            default: {
                setCurrency({
                    name: "usd",
                    symbol: "$"
                })
                break} //default to usd if no match
        }
    }
  
    return (
    <div className="navbar-container">
        <div className="navbar">
        
        <Link to = "/">
        <img className = "logo" src = {logo} alt = "CryptoPalace logo"></img>
        </Link>

        <ul>
            <Link to = "/"><li>Home</li></Link>
            <Link to = "/favorites"><li>Favorites</li></Link>
            <li>Blog</li>
        </ul>
        <div className = "nav-right">
            <select onChange = {currencyHandler}> //calls currencyHandler when changed
                <option value = "usd">USD</option>
                 <option value = "eur">EUR</option>
            </select>

            {user ? (
                <button onClick={handleSignOut}>Sign Out</button>
            ) : (
                <button onClick={signInWithGoogle}>Sign In with Google</button>
            )}

        </div>
        </div>
    </div>


   )
}// end Navbar function




export default Navbar;