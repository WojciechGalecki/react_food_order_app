import { createContext, useState } from "react";

export const UserProgressContext = createContext({
  progress: "",
  showCart: () => {},
  showCheckout: () => {},
  resetProgress: () => {},
});

export default function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState("");

  function showCart() {
    setUserProgress("cart");
  }

  function showCheckout() {
    setUserProgress("checkout");
  }

  function resetProgress() {
    setUserProgress("");
  }

  const ctxValue = {
    progress: userProgress,
    showCart,
    showCheckout,
    resetProgress,
  };

  return (
    <UserProgressContext.Provider value={ctxValue}>
      {children}
    </UserProgressContext.Provider>
  );
}
