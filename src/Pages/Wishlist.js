import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, Link, Stack, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { AddCartButton } from "../Components/StyledComponents";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
function Wishlist({ updateCart }) {
  const { t } = useTranslation();
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    fetchWishlist();
  }, []);
  useEffect(() => {
    updateCart();
  }, []);
  const fetchWishlist = async () => {
    try {
      const response = await fetch("/wishlist");
      const jsonData = await response.json();
      setWishlistItems(jsonData.wishlistItems || []);
    } catch (error) {
      console.error("Error fetching wishlist: ", error);
    }
  };
  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch(`/wishlist/remove/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchWishlist();
      } else {
        console.error("Error removing product from wishlist:", response.status);
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };
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
  return (
    <>
      <Grid container sx={{ mt: 2, display: { xs: "none", md: "flex" } }}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Typography variant="h6">{t("wishlist")}</Typography>

          {localStorage.getItem("user") ? (
            wishlistItems.length > 0 ? (
              wishlistItems.map((item) => (
                <Grid container key={item.productId} sx={{ ml: 5 }}>
                  <Grid item xs={2}>
                    {console.log(item.photo)}
                    <img
                      src={`/images/products/${item.photo}`}
                      width="70%"
                      alt={item.productId}
                    />
                  </Grid>
                  <Grid item xs={2} sx={{ mt: 3 }}>
                    <Link href={`/product/${item.productId}`}>
                      <Typography sx={{ padding: 1 }}>{item.name}</Typography>
                    </Link>
                  </Grid>
                  <Grid item xs={2} sx={{ mt: 3 }}>
                    <Typography sx={{ padding: 1 }}>
                      {item.price}RON{" "}
                    </Typography>
                  </Grid>

                  <Grid item xs={3} sx={{ mt: 3 }}>
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="outlined"
                        onClick={() => removeFromWishlist(item.productId)}
                        size="small"
                      >
                        {t("remove")}
                      </Button>
                      <AddCartButton
                        sx={{ padding: 1 }}
                        size="small"
                        onClick={() =>
                          handleAddToCart(
                            item.productId,
                            item.name,
                            item.price,
                            item.photo,
                            1
                          )
                        }
                      >
                        <ShoppingCartOutlinedIcon fontSize="medium" />{" "}
                        {t("add_cart")}
                      </AddCartButton>
                    </Stack>
                  </Grid>
                </Grid>
              ))
            ) : (
              <Grid container>
                <Grid item xs={2}></Grid>
                <Grid item xs={8}>
                  <img
                    src="/images/products/no-product-found.png"
                    alt="no-product-found"
                  />
                </Grid>
                <Grid item xs={2}></Grid>
              </Grid>
            )
          ) : (
            <Box>
              <Typography variant="h6" sx={{ m: 5 }}>
                {t("notLoggedIn")} <ArrowRightAltOutlinedIcon />
                <Button href="/login" variant="outlined" sx={{ ml: 1 }}>
                  {t("login")}
                </Button>
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
      <Stack sx={{ display: { xs: "flex", md: "none" }, mt: 1 }}>
        <Typography variant="h6">{t("wishlist")}</Typography>

        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <Grid container sx={{ mt: 5 }}>
              <Grid item xs={11}>
                <Stack direction="row" spacing={2}>
                  <img
                    src={`/images/products/${item.photo}`}
                    width="30%"
                    alt={item.productId}
                  />
                  <Link href={`/product/${item.productId}`}>
                    <Typography sx={{ mt: 5 }}>{item.name}</Typography>
                  </Link>
                  <Box>
                    <Typography sx={{ mt: 5 }}>{item.price}RON </Typography>
                  </Box>
                  <Stack direction="column" spacing={2}>
                    <Button
                      variant="outlined"
                      sx={{ mt: 2 }}
                      onClick={() => removeFromWishlist(item.productId)}
                      size="small"
                    >
                      {t("remove")}
                    </Button>
                    <AddCartButton
                      size="small"
                      height="30%"
                      onClick={() =>
                        handleAddToCart(
                          item.productId,
                          item.name,
                          item.price,
                          item.photo,
                          1
                        )
                      }
                    >
                      <ShoppingCartOutlinedIcon fontSize="medium" />{" "}
                    </AddCartButton>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          ))
        ) : (
          <Grid container>
            <Grid item xs={2}></Grid>
            <Grid item xs={8}>
              <img
                src="/images/products/no-product-found.png"
                alt="no-product-found"
              />
            </Grid>
            <Grid item xs={2}></Grid>
          </Grid>
        )}
      </Stack>
    </>
  );
}

export default Wishlist;
