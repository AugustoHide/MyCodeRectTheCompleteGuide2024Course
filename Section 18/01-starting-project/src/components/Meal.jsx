import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import CartContext from "../context/CartContext";

export default function Meal({ meal }) {
  const cartCtx = useContext(CartContext);
  function handleAddMealToCart() {
    cartCtx.addItem(meal);
  }

  return (
    <li key={meal.id} className="meal-item">
      <article>
        <div>
          <img src={`http://localhost:3000/${meal.image}`} alt={meal.image} />
          <h3>{meal.name}</h3>
          <p className="meal-item-price">
            {currencyFormatter.format(meal.price)}
          </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p>
          <Button onClick={handleAddMealToCart} className="meal-tem-actions">
            Add to cart
          </Button>
        </p>
      </article>
    </li>
  );
}
