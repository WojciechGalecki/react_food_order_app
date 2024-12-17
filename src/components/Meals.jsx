import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";
import ErrorPage from "./ErrorPage";

const mainUrl = "http://localhost:3000";
const requestConfig = {};

export default function Meals() {
  const { data, isLoading, error } = useHttp(
    `${mainUrl}/meals`,
    requestConfig,
    []
  );

  if (error) {
    return <ErrorPage title="Failed to failed meals" message={error.message} />;
  }

  return (
    <div>
      {isLoading && <p className="center">Loading meals...</p>}
      {!isLoading && data.length > 0 && (
        <ul id="meals">
          {data.map((meal) => (
            <MealItem key={meal.id} meal={meal} mainUrl={mainUrl} />
          ))}
        </ul>
      )}
    </div>
  );
}
