import React from "react";
import { Link } from "react-router-dom";

export default function StudyBreadcrumb({deck}) {

  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to={"/"}>
            <i className="bi bi-house-door-fill mr-2"></i>Home
          </Link>
        </li>
        <li className="breadcrumb-item">{deck.name}</li>
        <li className="breadcrumb-item active" aria-current="page">
          Study
        </li>
      </ol>
    </nav>
  );
}
