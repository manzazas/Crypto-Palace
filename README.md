# 🏦 Crypto‑Palace

**Crypto‑Palace** is a sleek, modern React app that displays live cryptocurrency pricing, market data, and charts using the CoinGecko API. Built with a dark-themed UI, sortable tables, currency selectors, and smooth line charts—it's optimized for friendliness and aesthetics.

## 🚀 Key Features

- **Real-time crypto data** using CoinGecko API (market cap, 24h high/low, current price, rank)
- **Interactive line chart** visualizing the last 10 days of price history using Google Charts
- **Automatic currency toggle** (e.g. USD, EUR) via React Context
- **Responsive design** featuring minimalist gradients and hover interactions
- **Light on dependencies**, built with Vite and React Hooks

## 🧱 Tech Stack

| Layer             | Technologies                                 |
|------------------|----------------------------------------------|
| Frontend         | React, Vite, React Router                    |
| UI & Layout      | CSS Grid/Flexbox, custom themes              |
| Data & Charts    | CoinGecko API, Google Charts (`react-google-charts`) |
| Context & State  | React Context (`CoinContext`)                |
| Hosting          | Vercel                                       |



# CryptoPalace

A React app for tracking cryptocurrency prices and favorites.

---

## 🚀 Getting Started

### Option 1: Run Locally

1. **Clone the repo**
    ```sh
    git clone https://github.com/manzazas/Crypto-Palace.git
    cd cryptopalace
    ```

2. **Create a `.env` file in the project root:**
    ```
    VITE_APP_COINGECKO_API_KEY=your_coingecko_api_key
    VITE_APP_FIREBASE_API_KEY=your_firebase_api_key
    ```

3. **Install dependencies**
    ```sh
    npm install
    ```

4. **Start the development server**
    ```sh
    npm run dev
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

---

### Option 2: Run with Docker

1. **Make sure you have a `.env` file in the project root (see above).**

2. **Build the Docker image**
    ```sh
    docker build -t cryptopalace .
    ```

3. **Run the Docker container**
    ```sh
    docker run -p 5173:5173 cryptopalace
    ```
    Open [http://localhost:5173](http://localhost:5173) in your browser.

---

### Option 3: View the Live Demo

Check out the live deployment on Vercel:  
[https://your-vercel-domain.vercel.app](https://crypto-palace-mauve.vercel.app/)

---

## 🔑 API Keys

- You need your own [CoinGecko API key](https://www.coingecko.com/en/api) and [Firebase API key](https://console.firebase.google.com/) to use all features.
- The `.env` file should **not** be committed to GitHub.

---

## 📝 License

MIT
