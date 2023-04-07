import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./Components/Fragments/Footer";
import Header from "./Components/Fragments/Header";
import Home from "./Pages/Home";
import Brands from "./Pages/Brands";
import Products from "./Pages/Products";
import Promotions from "./Pages/Promotions";
import Support from "./Pages/Support";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";
import Account from "./Pages/Account";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/products" element={<Products />} />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/support" element={<Support />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
     
      <Footer />
    </Router>
  );
}

export default App;
