import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  IconButton,
  Button,
  Box,
  Stack,
  List,
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
function Products() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([{}]);
  const getProducts = async () => {
    try {
      const response = await fetch("/products");
      const jsonData = await response.json();

      setProducts(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Grid container sx={{ m: 2 , mt:10}}>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <Grid item xs={1}></Grid>
        <Grid item xs={2}>
          <Filters/>
        </Grid>
        <Grid item xs={8}>
        
          <Grid
            container
            rowSpacing={1}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            {typeof products === "undefined" ? (
              <p>{t("loading")}...</p>
            ) : (
              products.map((product, i) => (
                <Grid item xs={4}>
                  <StyledList>
                    <IconButton>
                      <FavoriteBorderIcon fontSize="medium" />
                    </IconButton>
                    <StyledListItem>
                      <Button href={`product`}>
                        <img
                          src={`/images/products/${product.image}`}
                          width="100%"
                          alt={`product${i + 1}`}
                        />
                      </Button>
                    </StyledListItem>
                    <StyledListItem>
                      <Typography>{product.name}</Typography>
                    </StyledListItem>
                    <StyledListItem>
                      <Typography>{product.price} RON</Typography>
                    </StyledListItem>

                    <StyledListItem>
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

          {typeof products === "undefined" ? (
            <p>{t("loading")}...</p>
          ) : (
            products.map((product, i) => (
              <List>
                <IconButton sx={{ color: "red" }}>
                  <FavoriteBorderIcon fontSize="medium" />
                </IconButton>
                <StyledListItem>
                  <Button href={`product`}>
                    <img
                      src={`/images/products/${product.image}`}
                      width="100%"
                      alt={`product${i + 1}`}
                    />
                  </Button>
                </StyledListItem>
                <StyledListItem>
                  <Typography>{product.name}</Typography>
                </StyledListItem>
                <StyledListItem>
                  <Typography>{product.price} RON</Typography>
                </StyledListItem>

                <StyledListItem>
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
