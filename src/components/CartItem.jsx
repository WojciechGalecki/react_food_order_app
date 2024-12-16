import { useContext } from "react";

import { OrderContext } from "../store/OrderContext";

export default function CartItem({ item }) {
  const { updateItemQuantity } = useContext(OrderContext);
  return (
    <li className="cart-item">
      <p>
        {item.name} - {item.quantity} x ${item.price}
      </p>
      <div className="cart-item-actions">
        <button onClick={() => updateItemQuantity(item.id, "-")}>-</button>
        {item.quantity}
        <button onClick={() => updateItemQuantity(item.id, "+")}>+</button>
      </div>
    </li>
  );
}
