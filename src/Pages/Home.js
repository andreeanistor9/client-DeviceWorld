import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Grid, Typography, Button, IconButton } from "@mui/material";
import Slider from "../Components/Fragments/Slider";
import { useTranslation } from "react-i18next";
import { AddCartButton } from "../Components/StyledComponents";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { styled } from "@mui/system";
const StyledList = styled("List")({
  listStyle: "none",
  display: "flex",
  overflowX: "hidden",
  scrollBehavior: "smooth",
  padding: 1,
  margin: 0,
  backgroundColor: "#edf2f9",
});

const StyledListItem = styled("ListItem")({
  flex: "0 0 33%",
  textAlign: "center",
});
function Home({ updateCart }) {
  const { t } = useTranslation();
  const [promotions, setPromotions] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);
  const handleScrollRight = () => {
    const scrollContainer = scrollContainerRef.current;
    const scrollWidth = scrollContainer.scrollWidth;
    const containerWidth = scrollContainer.offsetWidth;
    const maxScrollPosition = scrollWidth - containerWidth;
    const newScrollPosition = Math.min(
      scrollPosition + containerWidth,
      maxScrollPosition
    );
    setScrollPosition(newScrollPosition);
    scrollContainer.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });
  };

  const handleScrollLeft = () => {
    const scrollContainer = scrollContainerRef.current;
    const containerWidth = scrollContainer.offsetWidth;
    const newScrollPosition = Math.max(scrollPosition - containerWidth, 0);
    setScrollPosition(newScrollPosition);
    scrollContainer.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });
  };
  const slide = [
    {
      id: "1",
      image: "prod1.png",
    },
    {
      id: "2",
      image: "sales.png",
    },
    {
      id: "3",
      image: "macbookpro.png",
    },
    {
      id: "4",
      image: "airpodsmax.png",
    },
    {
      id: "5",
      image: "sales.png",
    },
    {
      id: "6",
      image: "samsungtv.png",
    },
  ];
  useEffect(() => {
    getPromotions();
  }, []);
  const getPromotions = async () => {
    try {
      const response = await fetch("/products");
      const jsonData = await response.json();

      setPromotions(jsonData.products);
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleAddToCart = (
    productId,
    name,
    price,
    photo,
    quantity,
    brand,
    product_type
  ) => {
    const cartItem = {
      productId,
      name,
      price,
      photo,
      quantity,
      brand,
      product_type,
    };
    setCartItems((prevCartItems) => [...prevCartItems, cartItem]);

    fetch("/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        name,
        price,
        photo,
        quantity,
        brand,
        product_type,
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to add item to cart");
        }
      })
      .then((data) => {
        console.log(data.message);
        updateCart();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    updateCart();
  }, []);
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
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h4" sx={{ textAlign: "center", padding: 5 }}>
          {t("welcome_message")}
        </Typography>
        <Slider items={slide} cart={false} />
        <Typography
          variant="body1"
          sx={{ textAlign: "center", mt: 5, paddingInline: 10 }}
        >
          {t("home_description")}
        </Typography>
      </Grid>
      {promotions.length > 0 && (
        <Grid item xs={12}>
          <Typography
            variant="h4"
            sx={{ paddingInline: 10, mt: 5, color: "red", fontWeight: "bold" }}
          >
            {t("promotions")}
          </Typography>
        </Grid>
      )}

      <Grid
        item
        xs={12}
        style={{ display: "flex", alignItems: "center" }}
        sx={{ paddingBottom: 2 }}
      >
        <Button onClick={handleScrollLeft}>&lt;</Button>
        <StyledList ref={scrollContainerRef} sx={{ padding: 1 }}>
          {promotions.length > 0 &&
            promotions.map((product, i) =>
              product.old_price && product.old_price > product.price ? (
                <StyledListItem>
                  {localStorage.getItem("user") ? (
                    <IconButton
                      sx={{ color: "red" }}
                      onClick={() =>
                        handleAddToWishlist(
                          product.id,
                          product.name,
                          product.price,
                          product.image
                        )
                      }
                    >
                      <FavoriteBorderIcon fontSize="medium" />
                    </IconButton>
                  ) : (
                    <IconButton disabled>
                      <FavoriteBorderIcon fontSize="medium" />
                    </IconButton>
                  )}

                  <Button href={`/product/${product.id}`}>
                    <img
                      src={`/images/products/${product.image}`}
                      width="50%"
                      alt={`product${i + 1}`}
                    />
                  </Button>

                  <Typography variant="body1">{product.name}</Typography>

                  <Typography sx={{ textDecoration: "line-through" }}>
                    {product.old_price} RON
                  </Typography>

                  <Typography color="red" variant="h6">
                    {product.price} RON
                  </Typography>

                  {localStorage.getItem("user") && product.quantity > 0 ? (
                    <AddCartButton
                      sx={{
                        backgroundColor: "#537ec5",
                        color: "white",
                      }}
                      onClick={() =>
                        handleAddToCart(
                          product.id,
                          product.name,
                          product.price,
                          product.image,
                          1,
                          product.brand,
                          product.product_type
                        )
                      }
                    >
                      <ShoppingCartOutlinedIcon fontSize="medium" />{" "}
                      {t("add_cart")}
                    </AddCartButton>
                  ) : (
                    <AddCartButton
                      disabled
                      sx={{
                        backgroundColor: "#537ec5",
                        color: "white",
                        width: "70%",
                      }}
                    >
                      <ShoppingCartOutlinedIcon fontSize="medium" />{" "}
                      {t("add_cart")}
                    </AddCartButton>
                  )}
                </StyledListItem>
              ) : (
                <></>
              )
            )}
        </StyledList>
        <Button onClick={handleScrollRight}>&gt;</Button>
      </Grid>
    </Grid>
  );
}
export default Home;
