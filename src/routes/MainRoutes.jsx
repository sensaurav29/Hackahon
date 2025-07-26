import About from "@/Pages/About";
import CartPage from "@/Pages/CartPage";
import Home from "@/Pages/Home";
import ProductDetail from "@/Pages/ProductDetail";
import ProductsPage from "@/Pages/ProductsPage";
import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";

const MainRoutes = () => {
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element = {<ProductsPage />} />
      <Route path="/products/:id" element = {<ProductDetail />} />
      <Route path="/cart" element = {<CartPage />} />
      <Route path="/about" element={<About />}/>
    </Routes>
    </>
  );
};

export default MainRoutes;
