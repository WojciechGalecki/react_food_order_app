import Cart from "./components/Cart";
import Header from "./components/Header";
import Meals from "./components/Meals";
import OrderContextProvider from "./store/OrderContext";
import CheckoutForm from "./components/CheckoutForm";
import UserProgressContextProvider from "./store/UserProgressContext";

function App() {
  return (
    <UserProgressContextProvider>
      <OrderContextProvider>
        <Cart />
        <CheckoutForm />
        <Header />
        <Meals />
      </OrderContextProvider>
    </UserProgressContextProvider>
  );
}

export default App;
