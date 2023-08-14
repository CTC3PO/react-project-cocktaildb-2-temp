import React from "react";
import { Link } from "react-router-dom";

//set cocktail property (with id, name...fetched from api data for each drink)
//return an article
const Cocktail = ({ image, name, id, info, glass }) => {
  return (
    <article className="cocktail">
      <div className="img-container">
        img src={image} alt={name}
      </div>
      <div className="cocktail-footer">
        <h3>{name}</h3>
        <h4>{glass}</h4>
        <p>{info}</p>
        {/* link is to link to detail page of a single cocktail, link web is dynamic by cocktail id */}
        <Link to={`/cocktail/${id}`} className="btn btn-primary btn-details">
          Details
        </Link>
      </div>
    </article>
  );
};

export default Cocktail;
