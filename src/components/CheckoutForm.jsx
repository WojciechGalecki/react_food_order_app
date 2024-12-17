import { useContext, useActionState } from "react";

import Input from "./UI/Input";
import { OrderContext } from "../store/OrderContext";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { UserProgressContext } from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import ErrorPage from "./ErrorPage";

const mainUrl = "http://localhost:3000";
const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function CheckoutForm() {
  const { totalItemsPrice, items, clearCart } = useContext(OrderContext);
  const { progress, resetProgress } = useContext(UserProgressContext);
  const {
    data,
    error,
    sendRequest,
    clearData,
  } = useHttp(`${mainUrl}/orders`, requestConfig);

  async function submitAction(_prevState, fd) {
    const customerData = Object.fromEntries(fd.entries());

    await sendRequest(
      JSON.stringify({
        order: {
          items,
          customer: customerData,
        },
      })
    );
  }

  const [_formState, formAction, isSending] = useActionState(submitAction, null);

  function handleFinish() {
    resetProgress();
    clearCart();
    clearData();
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={resetProgress}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  if (data && !error) {
    return (
      <Modal open={progress === "checkout"} onClose={handleFinish}>
        <h2>Success!</h2>
        <p>Your order was submitted successfully.</p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Ok</Button>
        </p>
      </Modal>
    );
  }

  return (
    <Modal open={progress === "checkout"} onClose={resetProgress}>
      <form action={formAction}>
        <h2>Checkout</h2>
        <p>Total Amount: ${totalItemsPrice}</p>
        <Input
          id="name"
          label="Full Name"
          type="text"
          required
        />
        <Input
          id="email"
          label="E-Mail Address"
          type="email"
          required
        />
        <Input
          id="street"
          label="Street"
          required
        />
        <div className="control-row">
          <Input
            id="postal-code"
            label="Postal Code"
            type="text"
            required
          />
          <Input
            id="city"
            label="City"
            type="text"
            required
          />
        </div>

        {error && <ErrorPage title="Failed to submit order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
