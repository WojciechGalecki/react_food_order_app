import { useContext } from "react";

import { OrderContext } from "../store/OrderContext";
import CartItem from "./CartItem";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContext";

export default function Cart() {
  const { items, totalItemsPrice } = useContext(OrderContext);
  const { progress, resetProgress, showCheckout } =
    useContext(UserProgressContext);

  return (
    <Modal
      className="cart"
      open={progress === "cart"}
      onClose={progress === "cart" ? resetProgress : null}
    >
      <h2>Your Cart</h2>
      <ul>
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </ul>
      <p className="cart-total">${totalItemsPrice}</p>
      <p className="modal-actions">
        <Button textOnly onClick={resetProgress}>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={showCheckout}>Go to Checkout</Button>
        )}
      </p>
    </Modal>
  );
}
