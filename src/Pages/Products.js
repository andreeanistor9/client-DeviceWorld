import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  IconButton,
  Button,
  Box,
  Stack,
  List,
  TextField,
  InputAdornment,
  Slider,
  Checkbox,
  FormControl,
  MenuItem,
  ListItemText,
  OutlinedInput,
  InputLabel,
  Select,
  Link,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  AddCartButton,
  StyledListItem,
  StyledList,
  StyledIconButton,
} from "../Components/StyledComponents";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import SearchIcon from "@mui/icons-material/Search";
import Product from "./Product";
function Products() {
  const { t } = useTranslation();
  const [searchedEl, setSearchedEl] = useState("");
  const [price, setPrice] = useState(0);
  const [checked, setChecked] = useState(false);
  const [selectedColors, setSelectedColors] = useState([]);
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
  const [showFilters, setShowFilters] = useState(false);
  const [showOrder, setShowOrder] = useState(false);
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
  const handleChangeSearch = (event) => {
    setSearchedEl(event.target.value);
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
    if (searchedEl !== "") {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchedEl.toLowerCase())
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
  };
  const handleResetFilters = () => {
    setSearchedEl("");
    setSelectedBrand("");
    setSelectedPriceRanges([]);
    setResetFilters(!resetFilters);
  };
  useEffect(() => {
    filterProducts();
  }, [products, searchedEl, selectedBrand, selectedPriceRanges, resetFilters]);
  const handleAddToCart = (productId, name, price) => {
    const cartItem = { productId, name, price };
    setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
    fetch("/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, name, price }),
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
          <Typography variant="h6">Filters</Typography>
          <TextField
            id="search"
            type="search"
            label={t("search")}
            value={searchedEl}
            onChange={handleChangeSearch}
            sx={{ width: "100%", mt: 3 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          ></TextField>
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
            Reset Filters
          </Button>
        </Grid>
        <Grid item xs={8}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {!filteredProducts ? (
              <p>{t("loading")}...</p>
            ) : filteredProducts.length === 0 ? (
              <p>{t("no_products_found")}</p>
            ) : (
              filteredProducts.map((product, i) => (
                <Grid item xs={4}>
                  <StyledList>
                    <IconButton sx={{ color: "red" }}>
                      <FavoriteBorderIcon fontSize="medium" />
                    </IconButton>
                    <StyledListItem key={product.image}>
                      <Button href={`product`}>
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
                      {localStorage.getItem("user") ? (
                        <AddCartButton
                          sx={{ backgroundColor: "#537ec5", color: "white" }}
                          onClick={() =>
                            handleAddToCart(
                              product.id,
                              product.name,
                              product.price
                            )
                          }
                        >
                          <ShoppingCartOutlinedIcon fontSize="medium" />{" "}
                          {t("add_cart")}
                        </AddCartButton>
                      ) : (
                        <AddCartButton
                          disabled
                          sx={{ backgroundColor: "#537ec5", color: "white" }}
                          onClick={() =>
                            handleAddToCart(
                              product.id,
                              product.name,
                              product.price
                            )
                          }
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
              <Typography>Filters</Typography>
            </Button>
            <Button variant="outlined" onClick={handleToggleOrder}>
              <SortOutlinedIcon fontSize="large" />
              <Typography>Order</Typography>
            </Button>
          </Stack>
          {showFilters && (
            <Stack>
              <TextField
                id="search"
                type="search"
                label={t("search")}
                value={searchedEl}
                onChange={handleChangeSearch}
                sx={{ width: "100%", mt: 3 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
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
              <Box sx={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  onClick={handleResetFilters}
                  sx={{ m: 2 }}
                >
                  Reset Filters
                </Button>
                <Button
                  variant="contained"
                  onClick={handleToggleFilters}
                  sx={{ m: 2 }}
                >
                  Save Filters
                </Button>
              </Box>
            </Stack>
          )}
          {showOrder && (
            <Stack>
              <FormControl sx={{ m:5, width: "100%" }}>
                <FormGroup>
                  {orderOptions.map((option) => (
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
              <Button
                variant="contained"
                onClick={handleToggleOrder}
                sx={{ m: 2 }}
              >
                Save
              </Button>
            </Stack>
          )}
          {!filteredProducts ? (
            <p>{t("loading")}...</p>
          ) : filteredProducts.length === 0 ? (
            <p>{t("no_products_found")}</p>
          ) : (
            filteredProducts.map((product, i) => (
              <List>
                <IconButton sx={{ color: "red" }}>
                  <FavoriteBorderIcon fontSize="medium" />
                </IconButton>
                <StyledListItem key={product.image}>
                  <Button href={`/product/${product.id}`} >
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
                  {localStorage.getItem("user") ? (
                    <AddCartButton
                      sx={{ backgroundColor: "#537ec5", color: "white" }}
                      onClick={() =>
                        handleAddToCart(product.id, product.name, product.price)
                      }
                    >
                      <ShoppingCartOutlinedIcon fontSize="medium" />{" "}
                      {t("add_cart")}
                    </AddCartButton>
                  ) : (
                    <AddCartButton
                      disabled
                      sx={{ backgroundColor: "#537ec5", color: "white" }}
                      onClick={() =>
                        handleAddToCart(product.id, product.name, product.price)
                      }
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
