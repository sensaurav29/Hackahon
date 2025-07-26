import React, { useState } from "react";

import { createContext } from "react";
import { prod_data } from "@/data/products";


export const productContext = createContext(null);

const Wrapper = (props) => {
  const [cart, setCart] = useState([]);

  const data = prod_data;

  const addToCart = (id) => {
    const item = data.find((prod) => prod.id === id);
    if (!item) return;

    const existingItem = cart.find((c) => c.id === id);

    if (existingItem) {
      // If item is already in cart, increase quantity
      const updatedCart = cart.map((c) =>
        c.id === id ? { ...c, quantity: c.quantity + 1 } : c
      );
      setCart(updatedCart);
    } else {
      // First time adding, so add with quantity = 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeOneFromCart = (id) => {
  const existingItem = cart.find((item) => item.id === id);
  if (!existingItem) return;

  if (existingItem.quantity > 1) {
    // Reduce quantity by 1
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    );
    setCart(updatedCart);
  } else {
    // If quantity is 1, remove item from cart
    setCart(cart.filter((item) => item.id !== id));
  }
};

  const removeFromCart = (pId) => {
  const filteredData = cart.filter((item) => item.id !== pId);
  setCart(filteredData);
};

  return (
    <div>
      <productContext.Provider
        value={{ data, cart, addToCart, removeFromCart, removeOneFromCart }}
      >
        {props.children}
      </productContext.Provider>
    </div>
  );
};

export default Wrapper;
