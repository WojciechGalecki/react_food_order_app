import { useContext } from "react";

import { OrderContext } from "../store/OrderContext";
import CartItem from "./CartItem";

export default function Cart({ onClose, onCheckout }) {
  const { items, totalItemsPrice } = useContext(OrderContext);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <p className="cart-total">${totalItemsPrice}</p>
      <button onClick={onClose}>Close</button>
      <button className="button" onClick={onCheckout}>
        Go to Checkout
      </button>
    </div>
  );
}
