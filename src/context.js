import React, { useState, useContext, useEffect } from "react";
import { useCallback } from "react";

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  //set searchTerm and fetch (default of search is "a")
  const [searchTerm, setSearchTerm] = useState("a");
  //set cocktail display (result), defualt is an empty array
  const [cocktails, setCocktails] = useState([]);

  //set up fetchDrinks method
  //after fetched success, set loading as false
  const fetchDrinks = useCallback(async () => {
    setLoading(true);
    try {
      //try to grab drinks data from url/api, if there's drinks data,iterate over data
      //display it, else set an empty list, then set loading as false
      const response = await fetch(`${url}${searchTerm}`);
      const data = await response.json();
      const drinks = data;

      if (drinks) {
        //map the data to each drink data
        const newCocktails = drinks.map((item) => {
          //set item parameters and return them for each drink fetched
          const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass } =
            item;
          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            info: strAlcoholic,
            glass: strGlass,
          };
        });

        //setCocktails list with the new list just fetched from data
        setCocktails(newCocktails);
      } else {
        setCocktails([]);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [searchTerm]);

  //invoke fetchDrinks function, default is searchTerm
  //also add fetchDrinks as our dependency
  useEffect(() => {
    fetchDrinks();
  }, [searchTerm, fetchDrinks]);

  return (
    <AppContext.Provider
      //the value are the states defined above
      value={{ loading, searchTerm, cocktails, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
