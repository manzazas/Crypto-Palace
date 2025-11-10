import React from "react";
import "./ArticleCard.css";

const ArticleCard = ({ article }) => {
  // prefer the API's image_url, then source_icon, then other fallbacks
  const image =
    article.image_url ||
    article.image ||
    article.enclosure?.link ||
    article.thumbnail ||
    article.source_icon ||
    "";

  const title = article.title || "Untitled";

  return (
    <a
      className="article-card"
      href={article.link || "#"}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className="article-card__media"
        style={
          image
            ? { backgroundImage: `url(${image})` }
            : { backgroundImage: `linear-gradient(135deg,#0f1724,#15324a)` }
        }
      />
      <div className="article-card__meta">
        <h3 className="article-card__title">{title}</h3>
        {article.pubDate && (
          <time className="article-card__time">
            {new Date(article.pubDate).toLocaleDateString()}
          </time>
        )}
      </div>
    </a>
  );
};

export default ArticleCard;