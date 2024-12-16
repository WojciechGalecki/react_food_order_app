import { createContext, useReducer } from "react";

const Type = {
  add: "add",
  update: "update",
};

export const OrderContext = createContext({
  items: [],
  totalItemsPrice: 0,
  addItemToCart: () => {},
  updateItemQuantity: () => {},
});

function cartReducer(state, action) {
  if (action.type === Type.add) {
    const newItems = [...state.items];
    const existingCartItemIndex = newItems.findIndex(
      (item) => item.id === action.payload.id
    );
    const existingCartItem = newItems[existingCartItemIndex];

    if (existingCartItem) {
      newItems[existingCartItemIndex] = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
    } else {
      newItems.push({
        id: action.payload.id,
        name: action.payload.name,
        price: action.payload.price,
        quantity: 1,
      });
    }

    return {
      items: newItems,
    };
  }

  if (action.type === Type.update) {
    const newItems = [...state.items];
    const existingCartItemIndex = newItems.findIndex(
      (item) => item.id === action.payload.id
    );
    const existingCartItem = newItems[existingCartItemIndex];
    let newQuantity = existingCartItem.quantity;

    if (action.payload.mode === "+") {
      newQuantity++;
    }

    if (action.payload.mode === "-") {
      newQuantity--;
    }

    if (newQuantity <= 0) {
      newItems.splice(existingCartItemIndex, 1);
    } else {
      newItems[existingCartItemIndex] = {
        ...existingCartItem,
        quantity: newQuantity,
      };
    }

    return {
      items: newItems,
    };
  }

  return state;
}

export default function OrderContextProvider({ children }) {
  const [cartState, cartDispatch] = useReducer(cartReducer, { items: [] });
  const totalItemsPrice = cartState.items
    .reduce((sum, item) => sum + item.quantity * +item.price, 0)
    .toFixed(2);

  function handleAddItemToCart(product) {
    cartDispatch({
      type: Type.add,
      payload: product,
    });
  }

  function handleUpdateItemQuantity(id, mode) {
    cartDispatch({
      type: Type.update,
      payload: {
        id,
        mode,
      },
    });
  }

  const ctxValue = {
    items: cartState.items,
    totalItemsPrice,
    addItemToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateItemQuantity,
  };

  return (
    <OrderContext.Provider value={ctxValue}>{children}</OrderContext.Provider>
  );
}
