import { useContext } from "react";

import { OrderContext } from "../store/OrderContext";
import Button from "./UI/Button";

export default function MealItem({ meal, mainUrl }) {
  const { addItemToCart } = useContext(OrderContext);

  return (
    <li className="meal-item">
      <article>
        <img src={`${mainUrl}/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">${meal.price}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={() => addItemToCart(meal)}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
