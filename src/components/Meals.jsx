import { useEffect, useState } from "react";

import { fetchData } from "../http";
import ErrorPage from "./ErrorPage";
import MealItem from "./MealItem";

const mainUrl = "http://localhost:3000";

export default function Meals() {
  const [isFetching, setIsFetching] = useState();
  const [error, setError] = useState();
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    async function loadMeals() {
      setIsFetching(true);

      try {
        const data = await fetchData(`${mainUrl}/meals`);
        setMeals(data);
      } catch (err) {
        setError({ message: err.message });
      }

      setIsFetching(false);
    }

    loadMeals();
  }, []);

  if (error) {
    return <ErrorPage message={error.message} />;
  }

  return (
    <div>
      {isFetching && <p>Loading meals...</p>}
      {!isFetching && meals.length === 0 && (
        <p>Sorry... Couldn't load meals.</p>
      )}
      {!isFetching && meals.length > 0 && (
        <ul id="meals">
          {meals.map((meal) => (
            <MealItem key={meal.id} meal={meal} mainUrl={mainUrl} />
          ))}
        </ul>
      )}
    </div>
  );
}
