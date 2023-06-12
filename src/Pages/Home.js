import React, { useState, useEffect } from "react";

import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import { Grid, Link, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import Slider from "../Components/Fragments/Slider";
function Home() {
  // eslint-disable-next-line
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  });
  const fetchProducts = async () => {
    try {
      const response = await fetch("/products");
      const jsonData = await response.json();
      const uniqueImages = new Set();
      let uniqueProducts = [];
      jsonData.products.forEach((product) => {
        if (!uniqueImages.has(product.image)) {
          uniqueImages.add(product.image);
          uniqueProducts.push(product);
        }
      });
      setProducts(uniqueProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Slider items={products} cart={false} />
      </Grid>
    </Grid>
  );
}
export default Home;
