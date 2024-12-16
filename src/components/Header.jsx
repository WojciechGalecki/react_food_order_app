import { useContext } from "react";

import logo from "../assets/logo.jpg";
import { OrderContext } from "../store/OrderContext";
import Button from "./UI/Button";

export default function Header({ onCartOpen }) {
  const { items } = useContext(OrderContext);

  const totalItemsQuantity = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  return (
    <header id="main-header">
      <div id="title">
        <img src={logo} alt="app logo" />
        <h1>food order</h1>
      </div>
      <nav>
        <Button textOnly onClick={onCartOpen}>
          Cart ({totalItemsQuantity})
        </Button>
      </nav>
    </header>
  );
}
