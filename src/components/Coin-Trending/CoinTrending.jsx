import React, {useState, useEffect} from 'react';
import emoji from 'emoji-dictionary';
import './CoinTrending.css'
function CoinTrending() {
  const API_KEY = import.meta.env.VITE_APP_COINGECKO_API_KEY;
  const [trendingCoins, setTrendingCoins] = useState([]);

  const fetchTrendingCoins = async () => {
    try {
      const res = await fetch(
        'https://api.coingecko.com/api/v3/search/trending',
        {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'x-cg-demo-api-key': API_KEY
          }
        }
      );
      const json = await res.json();
      setTrendingCoins(json.coins);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTrendingCoins();   // ← actually fetch
  }, []);

  return (
    <div className = "trending-card">
      <h1 className = "card-title">Trending Coins {emoji.getUnicode('fire')} </h1>
      {trendingCoins.length === 0 ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {trendingCoins.slice(0,5).map(({ item }) => (
            <li className = "trending-coins" key={item.id}>
              <img src={item.small} alt={item.name} width="20" style={{ marginRight: '8px' }}/>
              {item.name} ({item.symbol.toUpperCase()}) – #
              {item.market_cap_rank}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default CoinTrending;
