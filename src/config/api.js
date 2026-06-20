const API_BASE = "https://corsproxy.io/?https://api.coingecko.com/api/v3";

export const CoinList = (currency) =>
  `${API_BASE}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id) =>
  `${API_BASE}/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) =>
  `${API_BASE}/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `${API_BASE}/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;