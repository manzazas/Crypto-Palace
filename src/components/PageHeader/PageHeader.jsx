import React from "react";
import "./PageHeader.css";

const PageHeader = ({ title, sub, size }) => {
  const cls = `page-header${size === "large" ? " page-header--large" : ""}`;
  return (
    <header className={cls}>
      <h1 className="page-title">{title}</h1>
      {sub && <p className="page-sub">{sub}</p>}
      <div className="page-accent" aria-hidden="true" />
    </header>
  );
};

export default PageHeader;