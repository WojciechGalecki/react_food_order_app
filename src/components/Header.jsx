import { useContext } from "react";

import logo from "../assets/logo.jpg";
import { OrderContext } from "../store/OrderContext";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContext";

export default function Header() {
  const { items } = useContext(OrderContext);
  const { showCart } = useContext(UserProgressContext);

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
        <Button textOnly onClick={showCart}>
          Cart ({totalItemsQuantity})
        </Button>
      </nav>
    </header>
  );
}
