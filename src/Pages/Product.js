import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

function Product({ pid }) {
  const { t } = useTranslation();

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/product/${pid}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data = await response.json();
        setProduct(data.product);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [pid]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h2>buna</h2>
      {/* Render the rest of the product details */}
    </div>
  );
}

export default Product;
