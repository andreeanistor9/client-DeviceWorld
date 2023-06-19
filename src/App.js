import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Footer from "./Components/Fragments/Footer";
import Header from "./Components/Fragments/Header";
import Home from "./Pages/Home";
import Brands from "./Pages/Brands";
import Products from "./Pages/Products";
import Product from "./Pages/Product";
import Promotions from "./Pages/Promotions";
import Support from "./Pages/Support";
import Wishlist from "./Pages/Wishlist";
import Cart from "./Pages/Cart";
import Account from "./Pages/Account";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Users from "./Pages/Users";
import ScrollToTopButton from "./Components/Fragments/ScrollToTopButton";
import OrderHistory from "./Pages/OrderHistory";
import AdminProducts from "./Pages/AdminProducts";
import TermsAndConditions from "./Pages/TermsAndConditions";
import PrivacyPolicy from "./Pages/PrivacyPolicy";

function App() {
  const [searchedEl, setSearchedEl] = useState("");

  const handleSearchSubmit = (searchTerm) => {
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    window.location.href = `/products?search=${encodedSearchTerm}`;
  };

  const [badgeNr, setBadgeNr] = useState(0);

  const updateCart = async () => {
    try {
      const response = await fetch("/cart");
      const jsonData = await response.json();
      setBadgeNr(jsonData.cart_length);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  return (
    <Router>
      <Header
        searchedEl={searchedEl}
        setSearchedEl={setSearchedEl}
        handleSearchSubmit={handleSearchSubmit}
        badgeNr={badgeNr}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brands" element={<Brands />} />
        <Route
          path="/products"
          element={<Products updateCart={updateCart} />}
        />
        <Route
          path="/product/:id"
          element={<Product updateCart={updateCart} />}
        />
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/support" element={<Support />} />
        <Route
          path="/wishlist"
          element={<Wishlist updateCart={updateCart} />}
        />
        <Route path="/cart" element={<Cart updateCart={updateCart} />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/users" element={<Users />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/users" element={<Users />} />
        <Route path="/adminProducts" element={<AdminProducts />} />
        <Route path="/terms_conditions" element={<TermsAndConditions />} />
        <Route path="/privacy_policy" element={<PrivacyPolicy />} />
      </Routes>
      <ScrollToTopButton />
      <Footer />
    </Router>
  );
}

export default App;
