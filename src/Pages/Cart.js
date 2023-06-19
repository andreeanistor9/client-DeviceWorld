import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Button,
  Box,
  Stack,
  List,
  ListItem,
  OutlinedInput,
  InputLabel,
  FormControl,
  Link,
  IconButton,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Slider from "../Components/Fragments/Slider";
function Cart({ updateCart }) {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [orderDetails, setOrderDetails] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [address, setAddress] = useState("");
  const [products, setProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);
  useEffect(() => {
    fetchCart();
  }, []);
  useEffect(() => {
    updateCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response1 = await fetch("/cart");
      const jsonData1 = await response1.json();
      setCartItems(jsonData1.cartItems || []);

      calculateTotalPrice(jsonData1.cartItems);
      const response2 = await fetch("/products");
      const jsonData2 = await response2.json();
      setProducts(jsonData2.products || []);
      const prod = jsonData2.products.filter((product) =>
        jsonData1.cartItems.some(
          (item) =>
            item.brand === product.brand &&
            item.product_type !== product.product_type
        )
      );

      console.log(prod);
      console.log(jsonData1.cartItems);
      console.log(jsonData2.products);
      setRecommendedProducts(prod);
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const response = await fetch(`/cart/remove/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: 1 }),
      });

      if (response.ok) {
        fetchCart();
        updateCart();
      } else {
        console.error("Error removing product from cart:", response.status);
      }
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };
  const handleOrderDetails = () => {
    setOrderDetails(!orderDetails);
  };
  const handlePlaceOrder = async () => {
    const body = { address: address };
    try {
      if (address !== "") {
        const response = await fetch("/order", {
          method: "POST",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          setOrderPlaced(!orderPlaced);
          fetchCart();
        } else {
          console.error("Error placing order:", response.status);
        }
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  const updateQuantity = async (productId, quantity) => {
    try {
      const response = await fetch(`/cart/update/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity }),
      });

      if (response.ok) {
        fetchCart(); // Fetch the updated cart and quantity
      } else {
        console.error("Failed to update product quantity in cart.");
      }
    } catch (error) {
      console.error("Error updating product quantity:", error);
    }
  };
  const calculateTotalPrice = (items) => {
    const total = items.reduce(
      (sum, item) => sum + parseFloat(item.price) * parseInt(item.quantity),
      0
    );
    setTotalPrice(total);
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Grid container sx={{ mt: 2, padding: 1 }}>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Stack direction="row">
            <Typography variant="h5">{t("cart")}</Typography>
            {cartItems.length > 0 ? (
              <Grid container>
                <Grid item xs={4}>
                  <Typography variant="h6" sx={{ mt: 5 }}>
                    {t("products")}:
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography variant="h6" sx={{ mt: 5 }}>
                    Total: {totalPrice} RON{" "}
                  </Typography>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={4}>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      onClick={handleOrderDetails}
                      sx={{ width: "100%" }}
                    >
                      {t("orderDetails")}
                    </Button>

                    <Button
                      href="/products"
                      variant="outlined"
                      sx={{ width: "100%" }}
                    >
                      {t("continueShopping")}
                    </Button>
                  </Stack>
                  {orderDetails && (
                    <Stack>
                      <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="address">
                          {t("address")}
                        </InputLabel>
                        <OutlinedInput
                          name="address"
                          type="address"
                          label={t("address")}
                          autoComplete="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </FormControl>

                      <Button
                        type="submit"
                        variant="contained"
                        onClick={handlePlaceOrder}
                        sx={{ width: "100%" }}
                      >
                        {t("placeOrder")}
                      </Button>
                    </Stack>
                  )}
                </Grid>
              </Grid>
            ) : localStorage.getItem("user") ? (
              <>
                {orderPlaced ? (
                  <Grid container>
                    <Grid item xs="3"></Grid>
                    <Grid item xs="6">
                      <Stack
                        direction="column"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={10}
                        sx={{ padding: 10 }}
                      >
                        <Typography variant="h5">
                          {t("orderReceived")}
                        </Typography>
                        <img
                          src="/images/things/orderReceived.png"
                          width="30%"
                          alt="order_received"
                          sx={{ padding: 5 }}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs="3"></Grid>
                  </Grid>
                ) : (
                  <Grid container>
                    <Grid item xs="3"></Grid>
                    <Grid item xs="6">
                      <Stack
                        direction="column"
                        justifyContent="space-evenly"
                        alignItems="center"
                        sx={{ padding: 10 }}
                      >
                        <Typography variant="h5">
                          {t("emptyCart")} <ArrowRightAltOutlinedIcon />
                          <Button
                            href="/products"
                            variant="outlined"
                            sx={{ ml: 1 }}
                          >
                            {t("goShopping")}
                          </Button>
                        </Typography>
                        <img
                          src="/images/things/empty_cart.png"
                          width="50%"
                          alt="empty_cart"
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs="3"></Grid>
                  </Grid>
                )}
              </>
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
          </Stack>

          {cartItems.map((item) => (
            <Grid container key={item.productId} sx={{ ml: 5 }}>
              <Grid item xs={2}>
                <img
                  src={`/images/products/${item.photo}`}
                  width="70%"
                  alt={item.productId}
                />
              </Grid>
              <Grid item xs={2}>
                <Link
                  href={`/product/${item.productId}`}
                  sx={{ textDecoration: "none" }}
                >
                  <Typography sx={{ mt: 5 }}>{item.name}</Typography>
                </Link>
              </Grid>
              <Grid item xs={1}>
                <Typography
                  sx={{ mt: 5, textAlign: "right", fontWeight: "bold" }}
                >
                  {item.price}RON{" "}
                </Typography>
              </Grid>
              <Grid item xs={1}></Grid>
              <Grid item xs={6} sx={{ mt: 5 }}>
                <Stack direction="row">
                  <Button
                    variant="outlined"
                    onClick={() => removeFromCart(item.productId)}
                    size="small"
                  >
                    {t("remove")}
                  </Button>
                  <Stack direction="row">
                    <Box>
                      <Button
                        onClick={() =>
                          item.quantity >= 1
                            ? updateQuantity(item.productId, item.quantity + 1)
                            : updateQuantity(item.productId, 1)
                        }
                      >
                        <AddIcon />
                      </Button>

                      {item.quantity}

                      <Button
                        onClick={() =>
                          item.quantity > 1
                            ? updateQuantity(item.productId, item.quantity - 1)
                            : removeFromCart(item.productId)
                        }
                      >
                        <RemoveIcon />
                      </Button>
                    </Box>
                  </Stack>
                </Stack>
              </Grid>
            </Grid>
          ))}
          {recommendedProducts && (
            <Slider items={recommendedProducts} cart={true} />
          )}
        </Grid>
      </Box>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <Grid item xs={12}>
          <Stack direction="row">
            <Typography variant="h5">{t("cart")}</Typography>
            {cartItems.length > 0 ? (
              <Grid container sx={{ mt: 5 }}>
                <Grid item xs={4}>
                  <Typography variant="body1">
                    Total:
                    <Typography sx={{ fontWeight: "bold" }}>
                      {totalPrice}RON
                    </Typography>
                  </Typography>
                </Grid>

                <Grid item xs={7}>
                  <Stack direction="row" spacing={2}>
                    <Button
                      variant="contained"
                      onClick={handleOrderDetails}
                      sx={{ width: "50%" }}
                    >
                      {t("orderDetails")}
                    </Button>
                    <Button
                      href="/products"
                      variant="outlined"
                      sx={{ width: "50%" }}
                    >
                      {t("continueShopping")}
                    </Button>
                  </Stack>
                  {orderDetails && (
                    <Stack>
                      <FormControl required fullWidth margin="normal">
                        <InputLabel htmlFor="address">
                          {t("address")}
                        </InputLabel>
                        <OutlinedInput
                          name="address"
                          type="address"
                          label={t("address")}
                          autoComplete="address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                        />
                      </FormControl>
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={handlePlaceOrder}
                        sx={{ width: "100%" }}
                      >
                        {t("placeOrder")}
                      </Button>
                    </Stack>
                  )}
                </Grid>
                <Grid item xs={1}></Grid>
              </Grid>
            ) : localStorage.getItem("user") ? (
              <>
                {orderPlaced ? (
                  <Grid container>
                    <Grid item xs="1"></Grid>
                    <Grid item xs="10">
                      <Stack
                        direction="column"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={10}
                        sx={{ padding: 5 }}
                      >
                        <Typography variant="h5">
                          {t("orderReceived")}
                        </Typography>
                        <img
                          src="/images/things/orderReceived.png"
                          width="60%"
                          alt="order_received"
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs="1"></Grid>
                  </Grid>
                ) : (
                  <Grid container>
                    <Grid item xs="1"></Grid>
                    <Grid item xs="10">
                      <Stack
                        direction="column"
                        justifyContent="space-evenly"
                        alignItems="center"
                        spacing={5}
                      >
                        <Typography sx={{ mt: 5 }}>
                          {t("emptyCart")} <ArrowRightAltOutlinedIcon />
                          <Button href="/products" variant="outlined">
                            {t("goShopping")}
                          </Button>
                        </Typography>
                        <img
                          src="/images/things/empty_cart.png"
                          width="100%"
                          alt="cart_empty"
                          sx={{ padding: 5 }}
                        />
                      </Stack>
                    </Grid>
                    <Grid item xs="1"></Grid>
                  </Grid>
                )}
              </>
            ) : (
              <Box sx={{ m: 3, mt: 5 }}>
                <Typography variant="h6">
                  {t("notLoggedIn")}
                  <ArrowRightAltOutlinedIcon />
                  <Button href="/login" variant="outlined">
                    {t("login")}
                  </Button>
                </Typography>
              </Box>
            )}
          </Stack>

          {cartItems.map((item) => (
            <Grid container key={item.productId} sx={{ ml: 5, mt: 3 }}>
              <Grid item xs={4}>
                <img
                  src={`/images/products/${item.photo}`}
                  width="70%"
                  alt={item.productId}
                />
              </Grid>
              <Grid item xs={4}>
                <Stack sx={{ mt: 1 }}>
                  <Link href={`/product/${item.productId}`}>
                    <Typography sx={{ padding: 1 }}>{item.name}</Typography>
                  </Link>
                  <Typography sx={{ padding: 1, fontWeight: "bold" }}>
                    {item.price} RON
                  </Typography>
                </Stack>
              </Grid>
              <Grid item xs={4} sx={{ mt: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => removeFromCart(item.productId)}
                  size="small"
                >
                  {t("remove")}
                </Button>

                <Box>
                  <IconButton
                    onClick={() =>
                      item.quantity >= 1
                        ? updateQuantity(item.productId, item.quantity - 1)
                        : removeFromCart(item.productId)
                    }
                  >
                    <RemoveIcon fontSize="small" />
                  </IconButton>
                  {item.quantity}
                  <IconButton
                    onClick={() =>
                      item.quantity >= 1
                        ? updateQuantity(item.productId, item.quantity + 1)
                        : updateQuantity(item.productId, 1)
                    }
                  >
                    <AddIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          ))}
          {recommendedProducts && (
            <Slider items={recommendedProducts} cart={true} />
          )}
        </Grid>
      </Box>
    </Grid>
  );
}

export default Cart;
