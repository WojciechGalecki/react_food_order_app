import { useState } from "react";

import Cart from "./components/Cart";
import Header from "./components/Header";
import Modal from "./components/UI/Modal";
import Meals from "./components/Meals";
import OrderContextProvider from "./store/OrderContext";
import CheckoutForm from "./components/CheckoutForm";

function App() {
  const [cartOpen, setCartOpen] = useState();
  const [checkoutOpen, setCheckoutOpen] = useState();

  function handleOpenCart() {
    setCartOpen(true);
  }

  function handleCloseCart() {
    setCartOpen(false);
  }

  function handleCheckoutOpen() {
    setCheckoutOpen(true);
    setCartOpen(false);
  }

  function handleCloseCheckout() {
    setCheckoutOpen(false);
  }

  return (
    <OrderContextProvider>
      <Modal open={cartOpen}>
        <Cart onClose={handleCloseCart} onCheckout={handleCheckoutOpen} />
      </Modal>
      <Modal open={checkoutOpen}>
        <CheckoutForm onClose={handleCloseCheckout} />
      </Modal>
      <Header onCartOpen={handleOpenCart} />
      <Meals />
    </OrderContextProvider>
  );
}

export default App;
