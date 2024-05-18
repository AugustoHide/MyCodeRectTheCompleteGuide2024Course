import Error from "./Error";
import useHttp from "./hooks/useHook";
import Meal from "./Meal";

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch the meals" message={error} />;
  }

  return (
    <section>
      <ul id="meals">
        {loadedMeals.map((meal) => (
          <Meal key={meal.id} meal={meal} />
        ))}
      </ul>
    </section>
  );
}
