import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Grid,
  Typography,
  IconButton,
  TableCell,
  Table,
  TableBody,
  TableHead,
  TableRow,
  Stack,
  Button,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { AddCartButton } from "../Components/StyledComponents";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

function Product({ updateCart }) {
  const { t } = useTranslation();
  const params = useParams();
  const { id } = params;

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  useEffect(() => {
    updateCart();
  }, []);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/product/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        if (response.status === 200) {
          const data = await response.json();
          setProduct(data.product);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);
  const handleAddToCart = (productId, name, price, photo, quantity) => {
    const cartItem = { productId, name, price, photo, quantity };
    setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
    fetch("/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, name, price, photo, quantity }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
        updateCart();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleAddToWishlist = (productId, name, price, photo) => {
    const wishlistItem = { productId, name, price, photo };
    setWishlistItems((prevWishlistItems) => [
      ...prevWishlistItems,
      wishlistItem,
    ]);
    fetch("/wishlist/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, name, price, photo }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <Grid container sx={{ m: 2 }}>
      <Grid item xs={1}></Grid>
      <Grid item xs={5} sx={{ display: { xs: "none", md: "flex" } }}>
        <Stack sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">
            {product.name}, {product.description}
          </Typography>
          <img
            src={`/images/products/${product.image}`}
            width="50%"
            alt={product.id}
          />
        </Stack>
      </Grid>
      <Grid item xs={5} sx={{ display: { xs: "none", md: "flex" } }}>
        <Stack>
          <Typography variant="h6" color="red" sx={{ mt: 10, mb: 3 }}>
            {product.price}Lei
          </Typography>
          <AddCartButton
            sx={{ width: "150%" }}
            onClick={() =>
              handleAddToCart(
                product.id,
                product.name,
                product.price,
                product.image,
                1
              )
            }
          >
            <ShoppingCartOutlinedIcon fontSize="medium" /> {t("add_cart")}
          </AddCartButton>
          <Button
            variant="outlined"
            sx={{ width: "150%", mt: 1 }}
            onClick={() =>
              handleAddToWishlist(
                product.id,
                product.name,
                product.price,
                product.image
              )
            }
          >
            <Typography sx={{ color: "red" }}>
              <FavoriteBorderIcon fontSize="medium" />
            </Typography>
            <Typography variant="button">{t("add_wishlist")}</Typography>
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={10} sx={{ display: { xs: "flex", md: "none" } }}>
        <Stack sx={{ display: "flex", alignItems: "center" }}>
          <Typography variant="h6">{product.name}</Typography>
          <img
            src={`/images/products/${product.image}`}
            width="50%"
            alt={product.id}
          />
          <Typography variant="h6" color="red" sx={{ mt: 5 }}>
            {product.price}Lei
          </Typography>
          <AddCartButton
            sx={{ width: "100%" }}
            onClick={() =>
              handleAddToCart(
                product.id,
                product.name,
                product.price,
                product.image,
                1
              )
            }
          >
            <ShoppingCartOutlinedIcon fontSize="medium" /> {t("add_cart")}
          </AddCartButton>
          <Button
            variant="outlined"
            sx={{ width: "100%", m: 1 }}
            onClick={() =>
              handleAddToWishlist(
                product.id,
                product.name,
                product.price,
                product.image
              )
            }
          >
            <Typography sx={{ color: "red" }}>
              <FavoriteBorderIcon fontSize="medium" />
            </Typography>
            <Typography variant="button">{t("add_wishlist")}</Typography>
          </Button>
        </Stack>
      </Grid>
      <Grid item xs={1}></Grid>

      <Grid item xs={12}>
        <Table aria-label="specifications" sx={{ textTransform: "capitalize" }}>
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography sx={{ fontWeight: "bold" }}>
                  {t("general_characteristics")}
                </Typography>
              </TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component="th">
                <Typography>{t("type")}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>{product.product_type}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">
                <Typography>{t("brand")}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>{product.brand}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">
                <Typography>{t("color")}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography>{product.color}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th">
                <Typography>{t("specifications")}</Typography>
              </TableCell>
              <TableCell align="left">
                {product.specifications.map((item) => (
                  <Typography>{item}</Typography>
                ))}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
    </Grid>
  );
}

export default Product;
