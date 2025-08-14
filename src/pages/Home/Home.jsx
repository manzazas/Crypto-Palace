import React, {useContext, useState, useEffect} from 'react';
import './Home.css'; 
import {CoinContext} from '../../context/Coin-Context';
import {AuthContext} from '../../context/Auth-Context'; // Add this import
import {Link} from "react-router-dom";
import CoinTrending from '../../components/Coin-Trending/CoinTrending';

const Home = () => {
  const {allCoin, currency} = useContext(CoinContext);
  const {user, favoriteCoins, setFavoriteCoins} = useContext(AuthContext); // Get from AuthContext instead
  const [displayCoin, setDisplayCoin] = useState([]);
  const [searchTerm, setSearchTerm]= useState(""); // state to hold the search term

  const handleInput = (event) => {
    setSearchTerm(event.target.value); // update search term based on user input
    if(event.target.value === "") {
      setDisplayCoin(allCoin); // if search term is empty, show all coins
    }
  }

  const handleSearch = async (event) => {
    event.preventDefault();
    const coins = await allCoin.filter((item) => {
      return (item.name.toLowerCase().includes(searchTerm.toLowerCase()) )// filter coins based on search term
    })

    setDisplayCoin(coins); // update displayCoin with filtered coins


  }
  
  useEffect (()=> {
    setDisplayCoin(allCoin);
  }, [allCoin]); //when allCoin changes, the display coin is also updated
  

   const handleFavorite = (e, coinId) => {
    e.preventDefault();// prevent reroute
    e.stopPropagation(); // stop event from bubbling up
    
    if (!user) {
      alert('Please sign in to add favorites');
      return;
    }

    setFavoriteCoins(prevFavorites =>{
      const newFavorites = prevFavorites.includes(coinId)
      ? prevFavorites.filter(id => id !== coinId) // if coin is already favorite, remove it
      : [...prevFavorites, coinId]; // if coin is not favorite, add it
      console.log("Updated favorites:", newFavorites);
      return newFavorites;
    })
  }


  
  return (
    <div className = "home">
      <div className = "hero">
        <h1>World's Finest <br /> Crypto Marketplace</h1>
        <p>View your favorite cryptocurrencies with ease.</p>
        <form onSubmit = {handleSearch}><input onChange = {handleInput} list = "coinlist" value ={searchTerm} type = "text" placeholder = "Search Crypto..." required></input>
        <datalist id = 'coinlist'>{allCoin.map((item,index) => {
          return <option key = {index} value ={item.name} ></option>

        })}</datalist>
        
        <button type ="submit">Go</button>
        </form>
      </div> 
      
      <CoinTrending />

      <div className = "crypto-table">
        <div className = "table-design">
         
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p className = "t24-col" style = {{textAlign:"center"}}>24h Change</p>
          <p className = "market-cap">Market Cap</p>
          <p className = "ath-change">ATH change percentage</p>
          <p className = "fav-col">Favorite</p>
        </div>
        {
        displayCoin.slice(0,10).map((item, index) => {
          return (
          <Link to ={`/coin/${item.id}`}className = "table-design" key ={index}>
            <p>{item.market_cap_rank}</p>
            <div className = "coin-name">
              <img src = {item.image} alt = {item.name} /> 
            <p>{item.name + " - "+ item.symbol}</p>
            </div>
            <p>{currency.symbol} {item.current_price}</p>
      
            <p className = {item.price_change_percentage_24h > 0 ? "t24hr-pos": "t24hr-neg"}>{Math.floor(item.price_change_percentage_24h * 100) / 100}%</p>
            <p className = "market-cap">{currency.symbol} {item.market_cap.toLocaleString()}</p>
            <p className = {item.ath_change_percentage > 0 ? "ath-change-pos" : "ath-change-neg"}>{item.ath_change_percentage?.toFixed(2)}%</p>
            <button onClick = {(e) => handleFavorite(e, item.id)} className = "favorite-selector">{favoriteCoins.includes(item.id) ? "★" : "☆"}</button>
          </Link>)

        })}
      </div> 
     

    </div> //end home
  )
}

export default Home
