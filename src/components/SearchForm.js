import React from "react";
import { useGlobalContext } from "../context";

const SearchForm = () => {
  //invoke the search functionality from the context file (useGlobalContext)
  const { setSearchTerm } = useGlobalContext();

  //define searchValue
  const searchValue = React.useRef("");

  //useEffect to invoke searchValue and set as current
  React.useEffect(() => {
    searchValue.current.focus();
  }, []);

  //searchCocktail method
  const searchCocktail = () => {
    setSearchTerm(searchValue.current.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <section className="section search">
      <form className="search-form">
        <div className="form-control">
          <label htmlFor="name">Search your favorite coctail</label>
          <input
            type="text"
            id="name"
            ref={searchValue}
            onChange={searchCocktail}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
