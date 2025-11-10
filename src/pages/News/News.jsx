import React, { useEffect, useState } from "react";
import ArticleCard from "../../components/ArticleCard/ArticleCard";
import "../../components/ArticleCard/ArticleCard.css";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const News = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    const url = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&q=cryptocurrency&language=en`;
    fetch(url)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data) => {
        console.log("API data:", data);
        const list = Array.isArray(data?.results) ? data.results : [];
        setArticles(list);
      })
      .catch((e) => {
        console.error("Fetch error:", e);
        setErr("Failed to load news.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading…</p>;
  if (err) return <p>{err}</p>;

  return (
    <div className="news-page">
      <h1 style={{ textAlign: "center" }}>Latest Cryptocurrency News</h1>
      <div className="news-grid">
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </div>
    </div>
  );
};

export default News;
