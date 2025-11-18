# Crypto-Palace

Crypto-Palace is a React app I built to track live cryptocurrency prices, market data, and user favorites. It pulls data from the CoinGecko API and uses Google Charts to show price history over different time ranges (24 hours, 1 month, 1 year, etc.). The UI is dark-themed, responsive, and kept simple on purpose.

## Key Features

- Live crypto data for 100+ coins (price, market cap, 24h change, rank)
- Sortable and searchable table of coins
- Price history charts with multiple time ranges (not just a single 10-day view)
- Favorites/watchlist so users can keep track of specific coins
- User auth and cross-device syncing with Firebase Authentication + Firestore
- Docker setup for consistent local development and deployment

## Tech Stack

| Layer          | Technologies                                  |
|----------------|-----------------------------------------------|
| Frontend       | React, Vite                                   |
| UI             | CSS (Flexbox/Grid), bootstrap                 |
| Data & Charts  | CoinGecko API, Google Charts                  |
| Auth & Data    | Firebase Authentication, Firestore            |
| Containerization | Docker                                      |
| Hosting        | Vercel                                        |

---

## Getting Started

### Run Locally

1. Clone the repository:
   ```sh
   git clone https://github.com/manzazas/Crypto-Palace.git
   cd Crypto-Palace
