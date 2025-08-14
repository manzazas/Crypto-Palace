import React, { useState, useEffect, useContext } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/Coin-Context';
import LineChart from '../../components/LineChart/LineChart.jsx';

const Coin = () => {
  const { coinId } = useParams();
  const { currency } = useContext(CoinContext);

  const [coinData, setCoinData] = useState(null);
  const [historicalData, setHistoricalData] = useState(null);
  const [chartDay, setChartDay] = useState(1);

  const API_KEY = import.meta.env.VITE_APP_COINGECKO_API_KEY;

  // Fetch the coin's metadata
  const fetchCoinData = async () => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'x-cg-demo-api-key': API_KEY
        }
      };

      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        options
      );
      const data = await res.json();
      setCoinData(data);
    } catch (err) {
      console.error('Error fetching coin data:', err);
    }
  };

  // Fetch price history for the given number of days
  const fetchHistoricalData = async (days) => {
    try {
      const options = {
        method: 'GET',
        headers: {
          'accept': 'application/json',
          'x-cg-demo-api-key': API_KEY
        }
      };

      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=${days}`,
        options
      );
      const data = await res.json();
      setHistoricalData(data);
    } catch (err) {
      console.error('Error fetching historical data:', err);
    }
  };

  // On mount or when coinId/currency changes, load both datasets
  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData(chartDay);
  }, [coinId, currency]);

  // When chartDay changes, re-fetch just the history
  useEffect(() => {
    fetchHistoricalData(chartDay);
  }, [chartDay, coinId, currency]);

  // Show spinner until both calls finish
  if (!coinData || !historicalData) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  return (
    <div className="coin">
      {/* Header */}
      <div className="coin-name">
        <img src={coinData.image.large} alt={coinData.name} />
        <p>
          <b>
            {coinData.name} ({coinData.symbol.toUpperCase()})
          </b>
        </p>
      </div>

      {/* Chart */}
      <div className="coin-chart">
        <LineChart historicalData={historicalData} />
      </div>

      {/* Timeframe buttons */}
      <div className="button-container">
        <div className="button-wrapper">
          <div className="button-group">
            <button onClick={() => setChartDay(1)}>24hr</button>
            <button onClick={() => setChartDay(7)}>1W</button>
            <button onClick={() => setChartDay(30)}>1M</button>
            <button onClick={() => setChartDay(90)}>3M</button>
            <button onClick={() => setChartDay(365)}>1Y</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="coin-info">
        <ul>
          <li>Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Current Price</li>
          <li>
            {currency.symbol}{' '}
            {coinData.market_data.current_price[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>
            {currency.symbol}{' '}
            {coinData.market_data.market_cap[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24h High</li>
          <li>
            {currency.symbol}{' '}
            {coinData.market_data.high_24h[currency.name].toLocaleString()}
          </li>
        </ul>
        <ul>
          <li>24h Low</li>
          <li>
            {currency.symbol}{' '}
            {coinData.market_data.low_24h[currency.name].toLocaleString()}
          </li>
        </ul>
      </div>
    </div>
  );

 
};

export default Coin;
