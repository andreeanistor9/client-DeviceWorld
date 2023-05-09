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
import Product from "./Product";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import SortOutlinedIcon from "@mui/icons-material/SortOutlined";
import Filters from "../Components/Filters";
import SearchIcon from "@mui/icons-material/Search";
function Products() {
  const { t } = useTranslation();

  const [searchedEl, setSearchedEl] = useState("");
  const [price, setPrice] = useState(0);
  const [checked, setChecked] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [products, setProducts] = useState([]);
  const [brandOptions, setBrandOptions] = useState([]);
  const currentType = new URLSearchParams(window.location.search).get("type");
  const getProducts = async (type, brand) => {
    try {
      let url = "/products";
      if (type) {
        url += `?type=${type}`;
        if (brand) {
          url += `&brand=${brand}`;
        }
      } 
      //console.log(url)
      const response = await fetch(url);
      const jsonData = await response.json();
      setProducts(jsonData.products);
      console.log(jsonData.products)
      if (!type) {
        if (brand) {
          url += `?brand=${brand}`;
          console.log(url)
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

  const handleSearchClick = async () => {
    const response = await fetch("/products");
    const jsonData = await response.json();

    if (currentType) {
      const filterByType = jsonData.products.filter((item) => {
        if (item.product_type.toLowerCase() === currentType.toLowerCase())
          return item;
      });
      if (searchedEl === "") {
        setProducts(filterByType);
        return;
      }
      const filterBySearch = jsonData.products.filter((item) => {
        if (
          item.name.toLowerCase().includes(searchedEl.toLowerCase()) &&
          item.product_type.toLowerCase() === currentType.toLowerCase()
        ) {
          return item;
        }
      });
      setProducts(filterBySearch);
    } else {
      if (searchedEl === "") {
        setProducts(jsonData);
        return;
      }
      const filterBySearch = jsonData.products.filter((item) => {
        if (item.name.toLowerCase().includes(searchedEl.toLowerCase())) {
          return item;
        }
      });
      setProducts(filterBySearch);
    }
  };
  const handleChangePrice = async (event) => {
    setChecked(event.target.checked);

    const response = await fetch("/products");
    const jsonData = await response.json();

    if (!event.target.checked && currentType) {
      const filterByType = jsonData.products.filter((item) => {
        return item.product_type.toLowerCase() === currentType.toLowerCase();
      });
      const filterByPrice = filterByType.filter((item) => {
        return item.price >= 0;
      });
      setProducts(filterByPrice);
    } else {
      const filterByPrice = jsonData.products.filter((item) => {
        if (currentType) {
          return (
            item.price >= price &&
            item.product_type.toLowerCase() === currentType.toLowerCase()
          );
        } else {
          return item.price >= price;
        }
      });
      setProducts(filterByPrice);
    }
  };
  const handleChangeBrand = (event) => {
    setSelectedBrand(event.target.value);
    if (event.target.value === "") {
      getProducts(currentType);
    } else {
      getProducts(currentType, event.target.value);
    }
  };
  return (
    <Grid container sx={{ m: 2, mt: 10 }}>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <Grid item xs={1}></Grid>
        <Grid item xs={2} sx={{ mr: 5 }}>
          <TextField
            id="search"
            type="search"
            label={t("search")}
            value={searchedEl}
            onChange={(e) => setSearchedEl(e.target.value)}
            sx={{ width: "100%" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <StyledIconButton onClick={handleSearchClick}>
                    <SearchIcon />
                  </StyledIconButton>
                </InputAdornment>
              ),
            }}
          ></TextField>
          
          <Typography variant="h6" sx={{mt:1}}>{t('price')}</Typography>
          <Stack direction="row" sx={{ m: 1 }}>
            <Slider
              aria-label={t("price")}
              value={price}
              valueLabelDisplay="auto"
              step={100}
              min={0}
              max={10000}
              onChange={(e) => setPrice(e.target.value)}
            ></Slider>
            <Checkbox
              checked={checked}
              onChange={handleChangePrice}
              inputProps={{ "aria-label": "controlled" }}
            />
          </Stack>
          <Typography variant="h6" >{t('brand')}</Typography>
          <FormControl sx={{m:1, width:"300px"}}>
            <select value={selectedBrand} onChange={handleChangeBrand}>
              <option value="">All Brands</option>
              <option value="apple">apple</option>
              <option value="asus">asus</option>
              <option value="dell">dell</option>
              <option value="huawei">huawei</option>
              <option value="lenovo">lenovo</option>
              <option value="samsung">samsung</option>
              <option value="sony">sony</option>
            </select>
          </FormControl>
          {/* <Filters/>  */}
        </Grid>
        <Grid item xs={8}>
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {typeof products === "undefined" || !Array.isArray(products) ? (
              <p>{t("loading")}...</p>
            ) : (
              products.map((product, i) => (
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
                      <AddCartButton
                        sx={{ backgroundColor: "#537ec5", color: "white" }}
                      >
                        <ShoppingCartOutlinedIcon fontSize="medium" />{" "}
                        {t("add_cart")}
                      </AddCartButton>
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
            <Button variant="outlined">
              <FilterAltOutlinedIcon fontSize="large" />
              <Typography>Filters</Typography>
            </Button>
            <Button variant="outlined">
              <SortOutlinedIcon fontSize="large" />
              <Typography>Order</Typography>
            </Button>
          </Stack>

          {typeof products === "undefined" || !Array.isArray(products) ? (
            <p>{t("loading")}...</p>
          ) : (
            products.map((product, i) => (
              <List>
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
                  <AddCartButton
                    sx={{ backgroundColor: "#537ec5", color: "white" }}
                  >
                    <ShoppingCartOutlinedIcon fontSize="medium" />{" "}
                    {t("add_cart")}
                  </AddCartButton>
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
