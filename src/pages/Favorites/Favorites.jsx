import React, {useContext, useState, useEffect} from 'react';
import "../Home/Home.css";
import {CoinContext} from '../../context/Coin-Context';
import {Link} from "react-router-dom";
import CoinTrending from '../../components/Coin-Trending/CoinTrending';
import {AuthContext} from '../../context/Auth-Context';

const Favorites = () => {
  const {allCoin, currency} = useContext(CoinContext);
  const {user, favoriteCoins, setFavoriteCoins} = useContext(AuthContext);
  const [displayCoin, setDisplayCoin] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Add console logs for debugging
    console.log("User:", user);
    console.log("AllCoin:", allCoin);
    console.log("FavoriteCoins:", favoriteCoins);

    if (!user) {
      setDisplayCoin([]);
      setIsLoading(false);
      return;
    }

    // Make sure both allCoin and favoriteCoins are available
    if (allCoin.length > 0 && favoriteCoins) {
      const favoriteCoinList = allCoin.filter(coin => favoriteCoins.includes(coin.id));
      console.log("Filtered coins:", favoriteCoinList);
      setDisplayCoin(favoriteCoinList);
    }
    
    setIsLoading(false);
  }, [allCoin, favoriteCoins, user]);

  const handleFavorite = (e, coinId) => {
    e.preventDefault();
    e.stopPropagation();
    setFavoriteCoins(prevFavorites => 
      prevFavorites.filter(id => id !== coinId)
    );
  }

  if (!user) {
    return (
      <div className="home favorites-page">
        <div className="hero">
          <h1>Please Sign In</h1>
          <p>Sign in to view and manage your favorite coins</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="home favorites-page">
        <div className="hero">
          <h1>Loading favorites...</h1>
        </div>
      </div>
    );
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
      
            <p className = {item.price_change_percentage_24h > 0 ? "t24hr-pos": "t24hr-neg"}>{Math.floor(item.price_change_percentage_24h * 100) / 100}%</p>
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

export default Favorites;