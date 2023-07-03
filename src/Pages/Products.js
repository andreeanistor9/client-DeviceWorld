import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  IconButton,
  Button,
  Box,
  Stack,
  List,
  Checkbox,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  FormGroup,
  FormControlLabel,
  Pagination,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  AddCartButton,
  StyledListItem,
  StyledList,
} from "../Components/StyledComponents";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import { useLocation } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
function Products({ updateCart }) {
  const { t } = useTranslation();
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [products, setProducts] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [resetFilters, setResetFilters] = useState(false);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const priceRangeOptions = [
    { value: "1000-2000", label: "1000 - 2000" },
    { value: "2000-3000", label: "2000 - 3000" },
    { value: "3000-4000", label: "3000 - 4000" },
    { value: "4000-5000", label: "4000 - 5000" },
    { value: "5000-100000", label: "5000+" },
  ];
  const orderOptions = [
    { value: "1", label: "crescator" },
    { value: "0", label: "descrescator" },
  ];
  const currentType = new URLSearchParams(window.location.search).get("type");
  const colors = [];
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("search");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const [paginatedProductsPage, setPaginatedProducts] = useState([]);
  const getProducts = async (type, brand) => {
    try {
      let url = "/products";
      if (type) {
        url += `?type=${type}`;
        if (brand) {
          url += `&brand=${brand}`;
        }
      } else if (brand) {
        url += `?brand=${brand}`;
      }
      const response = await fetch(url);
      const jsonData = await response.json();
      setProducts(jsonData.products);

      console.log(colors);
      if (!type) {
        if (brand) {
          setBrandOptions(jsonData.brandOptions);
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getProducts(currentType);
  }, [currentType]);

  const handleChangeBrand = (event) => {
    setSelectedBrand(event.target.value);
  };

  const handlePriceRangeToggle = (value) => {
    const selectedIndex = selectedPriceRanges.indexOf(value);
    let newSelectedPriceRanges = [];

    if (selectedIndex === -1) {
      newSelectedPriceRanges = [...selectedPriceRanges, value];
    } else {
      newSelectedPriceRanges = selectedPriceRanges.filter(
        (range) => range !== value
      );
    }

    setSelectedPriceRanges(newSelectedPriceRanges);
  };

  const filterProducts = () => {
    let filteredProducts = products;
    if (sortField === "price") {
      filteredProducts = filteredProducts.sort((a, b) => {
        console.log(sortOrder);
        if (sortOrder === "desc") {
          return b.price - a.price;
        } else {
          return a.price - b.price;
        }
      });
    } else if (sortField === "name") {
      filteredProducts = filteredProducts.sort((a, b) => {
        if (sortOrder === "desc") {
          return b.name.localeCompare(a.name);
        } else {
          return a.name.localeCompare(b.name);
        }
      });
    } else if (sortField === "") {
      filteredProducts = filteredProducts.sort((a, b) => {
        return a.id - b.id;
      });
    }
    if (searchQuery) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedBrand) {
      filteredProducts = filteredProducts.filter(
        (product) => product.brand.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    if (selectedPriceRanges.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        for (const range of selectedPriceRanges) {
          const [min, max] = range.split("-");
          if (
            product.price >= parseInt(min) &&
            product.price <= parseInt(max)
          ) {
            return true;
          }
        }
        return false;
      });
    }
    setFilteredProducts(filteredProducts);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const paginatedProducts = filteredProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    );

    setPaginatedProducts(paginatedProducts);
  };
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  const handleResetFilters = () => {
    setSortOrder("asc");
    setSortField("");
    setSelectedBrand("");
    setSelectedPriceRanges([]);
    setResetFilters(!resetFilters);
  };

  useEffect(() => {
    filterProducts();
  }, [
    products,
    sortField,
    sortOrder,
    searchQuery,
    selectedBrand,
    selectedPriceRanges,
    resetFilters,
    currentPage,
  ]);
  useEffect(() => {
    updateCart();
  }, []);
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
  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };
  const handleToggleOrder = () => {
    setShowOrder(!showOrder);
  };

  return (
    <Grid container sx={{ m: 2, mt: 10 }}>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <Grid item xs={1}></Grid>
        <Grid item xs={2} sx={{ mr: 5 }}>
          <Typography variant="h6">{t("filters")}</Typography>
          <FormControl sx={{ mt: 5, width: "100%" }}>
            <InputLabel>{t("SortBy")}</InputLabel>
            <Select
              value={sortField}
              label={t("SortBy")}
              onChange={(event) => setSortField(event.target.value)}
            >
              <MenuItem value="">{t("none")}</MenuItem>
              <MenuItem value="price">{t("price")}</MenuItem>
              <MenuItem value="name">{t("name")}</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ mt: 5, width: "100%" }}>
            <InputLabel>{t("SortOrder")}</InputLabel>
            <Select
              value={sortOrder}
              label={t("SortOrder")}
              onChange={(event) => setSortOrder(event.target.value)}
            >
              <MenuItem value="asc">{t("asc")}</MenuItem>
              <MenuItem value="desc">{t("desc")}</MenuItem>
            </Select>
          </FormControl>
          <Typography variant="body1" sx={{ mt: 5 }}>
            {t("price")}
          </Typography>
          <FormControl sx={{ m: 1, width: "100%" }}>
            <FormGroup>
              {priceRangeOptions.map((option) => (
                <FormControlLabel
                  key={option.value}
                  control={
                    <Checkbox
                      checked={selectedPriceRanges.indexOf(option.value) > -1}
                      onChange={() => handlePriceRangeToggle(option.value)}
                    />
                  }
                  label={option.label}
                />
              ))}
            </FormGroup>
          </FormControl>
          <FormControl sx={{ mt: 5, width: "100%" }}>
            <InputLabel>{t("brand")}</InputLabel>
            <Select
              value={selectedBrand}
              label={t("brand")}
              onChange={handleChangeBrand}
            >
              <MenuItem value="">{t("all")}</MenuItem>
              <MenuItem value="apple">Apple</MenuItem>
              <MenuItem value="asus">Asus</MenuItem>
              <MenuItem value="dell">Dell</MenuItem>
              <MenuItem value="huawei">Huawei</MenuItem>
              <MenuItem value="lenovo">Lenovo</MenuItem>
              <MenuItem value="samsung">Samsung</MenuItem>
              <MenuItem value="sony">Sony</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant="contained"
            onClick={handleResetFilters}
            sx={{ mt: 5, ml: "25%" }}
          >
            {t("reset")}
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {!paginatedProductsPage ? (
              <p>{t("loading")}...</p>
            ) : paginatedProductsPage.length === 0 ? (
              <img
                src="/images/products/no-product-found.png"
                alt="no-product-found"
              />
            ) : (
              paginatedProductsPage.map((product, i) => (
                <Grid item xs={4}>
                  <StyledList>
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
                    <StyledListItem key={product.image}>
                      <Button href={`/product/${product.id}`}>
                        <img
                          src={`/images/products/${product.image}`}
                          width="100%"
                          alt={`product${i + 1}`}
                        />
                      </Button>
                    </StyledListItem>
                    <StyledListItem key={product.name}>
                      <Typography>{product.name}</Typography>
                    </StyledListItem>
                    <StyledListItem key={product.price}>
                      <Typography>{product.price} RON</Typography>
                    </StyledListItem>

                    <StyledListItem key={product.id}>
                      {localStorage.getItem("user") && product.quantity > 0 ? (
                        <Stack>
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
                        </Stack>
                      ) : (
                        <AddCartButton
                          disabled
                          sx={{ backgroundColor: "#537ec5", color: "white" }}
                        >
                          <ShoppingCartOutlinedIcon fontSize="medium" />{" "}
                          {t("add_cart")}
                        </AddCartButton>
                      )}
                    </StyledListItem>
                  </StyledList>
                </Grid>
              ))
            )}
          </Grid>
          <Pagination
            count={Math.ceil(filteredProducts.length / productsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            variant="outlined"
            shape="rounded"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "2rem",
            }}
          />
        </Grid>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: { xs: "flex", md: "none" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack direction="column">
          <Stack
            direction="row"
            spacing={3}
            sx={{ justifyContent: "center", alignItems: "center" }}
          >
            {/* {t("products")} */}
            <Button variant="outlined" onClick={handleToggleFilters}>
              <FilterAltOutlinedIcon fontSize="large" />
              <Typography>{t("filters")}</Typography>
            </Button>
            <Button variant="outlined" onClick={handleToggleOrder}>
              <SortOutlinedIcon fontSize="large" />
              <Typography>{t("order")}</Typography>
            </Button>
          </Stack>
          {showFilters && (
            <Stack>
              <FormControl sx={{ m: 5, width: "100%" }}>
                <Typography variant="body1">{t("price")}</Typography>
                <FormGroup>
                  {priceRangeOptions.map((option) => (
                    <FormControlLabel
                      key={option.value}
                      control={
                        <Checkbox
                          checked={
                            selectedPriceRanges.indexOf(option.value) > -1
                          }
                          onChange={() => handlePriceRangeToggle(option.value)}
                        />
                      }
                      label={option.label}
                    />
                  ))}
                </FormGroup>
              </FormControl>
              <FormControl sx={{ ml: 5, mr: 5, width: "80%" }}>
                <InputLabel>{t("brand")}</InputLabel>
                <Select
                  value={selectedBrand}
                  label={t("brand")}
                  onChange={handleChangeBrand}
                >
                  <MenuItem value="">{t("all")}</MenuItem>
                  <MenuItem value="apple">Apple</MenuItem>
                  <MenuItem value="asus">Asus</MenuItem>
                  <MenuItem value="dell">Dell</MenuItem>
                  <MenuItem value="huawei">Huawei</MenuItem>
                  <MenuItem value="lenovo">Lenovo</MenuItem>
                  <MenuItem value="samsung">Samsung</MenuItem>
                  <MenuItem value="sony">Sony</MenuItem>
                </Select>
              </FormControl>
              <Box sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  onClick={handleResetFilters}
                  sx={{ m: 2 }}
                >
                  {t("reset")}
                </Button>
                <Button
                  variant="contained"
                  onClick={handleToggleFilters}
                  sx={{ m: 2 }}
                >
                  {t("save")}
                </Button>
              </Box>
            </Stack>
          )}
          {showOrder && (
            <>
              <FormControl sx={{ m: 5, width: "80%" }}>
                <InputLabel>{t("SortBy")}</InputLabel>
                <Select
                  value={sortField}
                  label={t("SortBy")}
                  onChange={(event) => setSortField(event.target.value)}
                >
                  <MenuItem value="">{t("none")}</MenuItem>
                  <MenuItem value="price">{t("price")}</MenuItem>
                  <MenuItem value="name">{t("name")}</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ ml: 5, mr: 5, width: "80%" }}>
                <InputLabel>{t("SortOrder")}</InputLabel>
                <Select
                  value={sortOrder}
                  label={t("SortOrder")}
                  onChange={(event) => setSortOrder(event.target.value)}
                >
                  <MenuItem value="asc">{t("asc")}</MenuItem>
                  <MenuItem value="desc">{t("desc")}</MenuItem>
                </Select>
              </FormControl>

              <Button
                variant="contained"
                onClick={handleToggleOrder}
                sx={{ m: 2 }}
              >
                {t("save")}
              </Button>
            </>
          )}
          {!filteredProducts ? (
            <p>{t("loading")}...</p>
          ) : filteredProducts.length === 0 ? (
            <p>{t("no_products_found")}</p>
          ) : (
            filteredProducts.map((product, i) => (
              <List>
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
                <StyledListItem key={product.image}>
                  <Button href={`/product/${product.id}`}>
                    <img
                      src={`/images/products/${product.image}`}
                      width="70%"
                      alt={`product${i + 1}`}
                    />
                  </Button>
                </StyledListItem>
                <StyledListItem key={product.name}>
                  <Typography>{product.name}</Typography>
                </StyledListItem>
                <StyledListItem key={product.price}>
                  <Typography>{product.price} RON</Typography>
                </StyledListItem>

                <StyledListItem key={product.id}>
                  {localStorage.getItem("user") ? (
                    <Stack>
                      <AddCartButton
                        sx={{ backgroundColor: "#537ec5", color: "white" }}
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
                    </Stack>
                  ) : (
                    <AddCartButton
                      disabled
                      sx={{ backgroundColor: "#537ec5", color: "white" }}
                    >
                      <ShoppingCartOutlinedIcon fontSize="medium" />{" "}
                      {t("add_cart")}
                    </AddCartButton>
                  )}
                </StyledListItem>
              </List>
            ))
          )}
        </Stack>
      </Box>
    </Grid>
  );
}

export default Products;
