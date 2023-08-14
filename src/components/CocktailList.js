import React from "react";
import Cocktail from "./Cocktail";
import Loading from "./Loading";
import { useGlobalContext } from "../context";

const CocktailList = () => {
  // load cocktails (fetched data from context), loading from the context file ('cocktails' is the list returned from the search term)
  const { cocktails, loading } = useGlobalContext();

  //condition - if still loading, then show the Loading component
  if (loading) {
    return <Loading />;
  }

  //condition - there is no cocktails matched w the search term (when cocktaillist is an empty array = "there's no cocktai")
  if (cocktails.length < 1) {
    return <h2 className="section-title">No cocktails matched your search</h2>;
  }

  return (
    <section className="section">
      <h2 className="section-title"> Cocktails</h2>
      <div className="cocktail-center">
        {cocktails.map((item) => {
          return <Cocktail key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};

export default CocktailList;
