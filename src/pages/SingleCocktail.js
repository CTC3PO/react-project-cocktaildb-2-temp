import React from "react";
import Loading from "../components/Loading";
import { useParams, Link } from "react-router-dom";
const url = "https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=";

const SingleCocktail = () => {
  const { id } = useParams();
  const [loading, setLoading] = React.useState(false);
  const [cocktail, setCocktail] = React.useState(null);

  //useEffect to invoke getCocktail method (but first, set up the method)
  React.useEffect(() => {
    setLoading(true);

    //getCocktail method
    async function getCocktail() {
      //try-catch block

      try {
        const response = await fetch(`${url}${id}`);
        const data = await response.json();

        //if fetch data successfully, simplify drinks data property, and set up newCocktail with those property
        if (data.drinks) {
          const {
            strDrink: name,
            strDrinkThumb: image,
            strAlcoholic: info,
            strCategory: category,
            strGlass: glass,
            strInstructions: instructions,
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          } = data.drinks[0];

          //ingredients list
          const ingredients = [
            strIngredient1,
            strIngredient2,
            strIngredient3,
            strIngredient4,
            strIngredient5,
          ];

          //set newCocktail as the mapped values above
          const newCocktail = {
            name,
            image,
            info,
            category,
            glass,
            instructions,
            ingredients,
          };

          //set the newCocktail as the cocktail to display
          setCocktail(newCocktail);
        }

        //else block, if no drinks data found
        else {
          setCocktail(null);
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    //call getCocktail method
    getCocktail();
  }, [id]);

  //check if loading
  if (loading) {
    return <Loading />;
  }

  //if no cocktail to display
  if (!cocktail) {
    return <h2 className="section-title">no cocktail to display</h2>;
  }

  //finally, if found cocktail, display the cocktail info
  //detail cocktail w all the property:
  const { name, image, category, info, glass, instructions, ingredients } =
    cocktail;

  //return the info
  return (
    <section className="section cocktail-section">
      <Link to="/" className="btn btn-primary">
        Back home
      </Link>
      <h2 className="section-title">{name}</h2>
      <div className="drink">
        <img src={image} alt={name} />
        <div className="drink-info">
          <p>
            <span className="drink-data">Name :</span>
            {name}
          </p>
          <p>
            <span className="drink-data">Category :</span>
            {category}
          </p>
          <p>
            <span className="drink-data">Info :</span>
            {info}
          </p>
          <p>
            <span className="drink-data">glass :</span>
            {glass}
          </p>
          <p>
            <span className="drink-data">Instructions :</span>
            {instructions}
          </p>
          <p>
            {/* map ingredients to each item, check if that ingredient exist, if yes show, if not, null display*/}
            <span className="drink-data">Ingredients:</span>
            {ingredients.map((item, index) => {
              return item ? <span key={index}>{item}</span> : null;
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SingleCocktail;
