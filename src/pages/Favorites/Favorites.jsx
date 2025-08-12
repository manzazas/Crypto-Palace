import React, {useContext, useState, useEffect} from 'react';
import "../Home/Home.css";
import {CoinContext} from '../../context/Coin-Context'; //import context
import {Link} from "react-router-dom"; //import Link for coin details page
import CoinTrending from '../../components/Coin-Trending/CoinTrending';

const Favorites = () => {
  const {allCoin, currency,favoriteCoins, setFavoriteCoins} = useContext(CoinContext);//now allCoin and currency can be used in this page
  const [displayCoin, setDisplayCoin] = useState([]);
  

  
  useEffect (()=> {
    const favoriteCoinList = allCoin.filter(coin => favoriteCoins.includes(coin.id));


    setDisplayCoin(favoriteCoinList);
  }, [allCoin, favoriteCoins]); //when allCoin changes, the display coin is also updated
  

   const handleFavorite = (e, coinId) => {
    e.preventDefault();// prevent reroute
    e.stopPropagation(); // stop event from bubbling up
    setFavoriteCoins(prevFavorites =>{
      return prevFavorites.filter(id => id !== coinId)

    })
  }


  
  return (
    <div className = "home favorites-page">
      <div className = "hero">
        <h1>Favorite Coins</h1>
        {favoriteCoins.length === 0 && (<p>No favorite coins selected</p>)}
      </div>

    {favoriteCoins.length > 0 && (
      <div className = "crypto-table">
        <div className = "table-design">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p className = "t24-col" style = {{textAlign:"center"}}>24h Change</p>
          <p className = "market-cap">Market Cap</p>
          <p className = "ath-change">ATH change percentage</p>
          <p className = "fav-col">Favorites</p>
        </div>
        {
        displayCoin.map((item, index) => {
          return (
          <Link to ={`/coin/${item.id}`}className = "table-design" key ={item.id}>
            <p>{item.market_cap_rank}</p>
            <div className = "coin-name">
              <img src = {item.image} alt = {item.name} /> 
            <p>{item.name + " - "+ item.symbol}</p>
            </div>
            <p>{currency.symbol} {item.current_price}</p>
      
            <p className = {item.price_change_percentage_24h > 0 ? "t24hr-pos": "t24hr-neg"}>{Math.floor(item.price_change_percentage_24h * 100) / 100}</p>
            <p className = "market-cap">{currency.symbol} {item.market_cap.toLocaleString()}</p>
            <p className = {item.ath_change_percentage > 0 ? "ath-change-pos" : "ath-change-neg"}>{item.ath_change_percentage?.toFixed(2)}%</p>
            <button onClick = {(e) => handleFavorite(e, item.id)} className = "favorite-selector">★</button>
          </Link>)
        })}
      </div> 
    )}

    </div> //end Favorites
  )
}

export default Favorites