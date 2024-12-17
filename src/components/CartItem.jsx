import { useContext } from "react";

import { OrderContext } from "../store/OrderContext";

export default function CartItem({ item }) {
  const { updateItemQuantity } = useContext(OrderContext);

  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.quantity} x ${item.price}
      </p>
      <p className="cart-item-actions">
        <button onClick={() => updateItemQuantity(item.id, "-")}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateItemQuantity(item.id, "+")}>+</button>
      </p>
    </li>
  );
}
