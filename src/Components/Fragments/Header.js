import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Button,
  Menu,
  MenuItem,
  Link,
  Box,
  TextField,
  InputAdornment,
  Grid,
} from "@mui/material";
import DevicesIcon from "@mui/icons-material/Devices";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { StyledIconButton, Navbar, StyledLink } from "../StyledComponents";
import { useState } from "react";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [accountEl, setAccountEl] = useState(null);
  const [searchedEl, setSearchedEl] = useState("");

  const open = Boolean(anchorEl);
  const openNav = Boolean(anchorElNav);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickNav = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleClickAccount = (event) => {
    setAccountEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseNav = () => {
    setAnchorElNav(null);
  };
  const handleCloseAcc = () => {
    setAccountEl(null);
  };
  const handleSearch = (event) => {
    setSearchedEl(event.currentTarget.value);
  };


  return (
    <Navbar position="static">
      <Toolbar sx={{ backgroundColor: "#ffffff", color: "black" }}>
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <Grid container spacing={1}>
            <Grid xs={8}>
              <StyledIconButton
              disableRipple
                size="large"
                onClick={handleClickNav}
                color="inherit"
              >
                <MenuIcon />
              </StyledIconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={openNav}
                onClose={handleCloseNav}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                <Stack direction="column" spacing={1}>
                  <Button
                    color="inherit"
                    id="products-button"
                    onClick={handleClick}
                    // aria-control={open ? "products-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    endIcon={<KeyboardArrowRightIcon />}
                  >
                    <Link href="/products" color="inherit" underline="none">
                      Products
                    </Link>
                  </Button>

                  <Button color="inherit">
                    <Link href="/brands" color="inherit" underline="none">
                      Brands
                    </Link>
                  </Button>
                  <Button color="inherit">
                    <Link href="/support" color="inherit" underline="none">
                      Support
                    </Link>
                  </Button>
                </Stack>
                <Menu
                  id="products-menu"
                  anchorEl={anchorEl}
                  open={open}
                  MenuListProps={{ "aria-labelledby": "products-button" }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  onClose={handleClose}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem onClick={handleClose}>
                    <Link
                      href="/products?type=phones"
                      color="inherit"
                      underline="none"
                    >
                      Phones
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link
                      href="/products?type=laptops"
                      color="inherit"
                      underline="none"
                    >
                      Laptops
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link
                      href="/products?type=tablets"
                      color="inherit"
                      underline="none"
                    >
                      Tablets
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link
                      href="/products?type=accessories"
                      color="inherit"
                      underline="none"
                    >
                      Accessories
                    </Link>
                  </MenuItem>
                </Menu>
              </Menu>

              <StyledIconButton disableRipple size="large" edge="start" aria-label="logo">
                <DevicesIcon fontSize="inherit" />
                <StyledLink href="/" underline="none">
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{
                      flexGrow: 1,
                      ml: 1,
                      fontFamily: "fantasy",
                      fontSize: "2rem",
                      color: "#22559c",
                    }}
                  >
                    ACN-Electronix
                  </Typography>
                </StyledLink>
              </StyledIconButton>
            </Grid>
            <Grid xs={4} container justifyContent="flex-end" spacing={1}>
              <StyledIconButton disableRipple size="large" edge="end" aria-label="logo">
                <StyledLink href="/wishlist" underline="none">
                  <FavoriteBorderIcon fontSize="inherit" />
                </StyledLink>
              </StyledIconButton>
              <StyledIconButton disableRipple size="large" edge="end" aria-label="cart">
                <StyledLink href="/cart" underline="none">
                  <ShoppingCartOutlinedIcon fontSize="inherit" />
                </StyledLink>
              </StyledIconButton>
              <StyledIconButton disableRipple size="large" edge="end" aria-label="account">
                <StyledLink href="/account" underline="none">
                  <AccountCircleOutlinedIcon fontSize="inherit" />
                </StyledLink>
              </StyledIconButton>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="search"
                type="search"
                label="Search"
                value={searchedEl}
                onChange={handleSearch}
                sx={{ width: "100%", mb: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10} sx={{ flexGrow: 1 }}>
              <Stack direction="row">
                <StyledIconButton disableRipple size="large" edge="start" aria-label="logo">
                  <DevicesIcon fontSize="inherit" />
                  <StyledLink href="/" underline="none">
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        flexGrow: 1,
                        m: 1,
                        fontFamily: "fantasy",
                        fontSize: "2rem",
                        color: "#22559c",
                      }}
                    >
                      ACN-Electronix
                    </Typography>
                  </StyledLink>
                </StyledIconButton>
                <TextField
                  id="search"
                  type="search"
                  label="Search"
                  value={searchedEl}
                  onChange={handleSearch}
                  sx={{ flexGrow: 1, width: "100%", m: 3 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                ></TextField>

                <StyledIconButton
                disableRipple
                  size="large"
                  aria-label="wishlist"
                  sx={{ flexGrow: 1 }}
                >
                  <FavoriteBorderIcon />
                  <StyledLink href="/wishlist" underline="none">
                    <Typography variant="body1"> Wishlist</Typography>
                  </StyledLink>
                </StyledIconButton>
                <StyledIconButton
                  disableRipple
                  size="large"
                  aria-label="cart"
                  sx={{ flexGrow: 1 }}
                >
                  <ShoppingCartOutlinedIcon fontSize="inherit" />
                  <StyledLink href="/cart" underline="none">
                    <Typography variant="body1"> Cart</Typography>
                  </StyledLink>
                </StyledIconButton>

                <StyledIconButton
                disableRipple
                  size="large"
                  aria-label="account"
                  sx={{ flexGrow: 1 }}
                >
                  <AccountCircleOutlinedIcon fontSize="inherit" />
                  <Button
                    
                    id="account-button"
                    onClick={handleClickAccount}
                    color="inherit"
                    
                    aria-haspopup="true"
                    aria-expanded={Boolean(accountEl) ? "true" : undefined}
                    endIcon={<KeyboardArrowDownIcon />}
                  >
                    <StyledLink href="/account" underline="none">
                      <Typography variant="body1"> Account</Typography>
                    </StyledLink>
                  </Button>
                  <Menu
                    id="account-menu"
                    anchorEl={accountEl}
                    open={Boolean(accountEl)}
                    MenuListProps={{ "aria-labelledby": "account-button" }}
                    onClose={handleCloseAcc}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    sx={{ display: { xs: "none", md: "flex" } }}
                  >
                    <MenuItem onClick={handleCloseAcc}>
                      <Link href="/login" color="inherit" underline="none">
                        Login
                      </Link>
                    </MenuItem>
                    <MenuItem onClick={handleCloseAcc}>
                      <Link href="/signup" color="inherit" underline="none">
                        Signup
                      </Link>
                    </MenuItem>
                  </Menu>
                </StyledIconButton>
              </Stack>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
        </Box>
      </Toolbar>

      <Toolbar disableGutters sx={{ display: { xs: "none", md: "flex" }}}>
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10}>
              <Button
                id="products-button"
                color="inherit"
                onClick={handleClick}
                //aria-control={open ? "products-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                endIcon={<KeyboardArrowDownIcon />}
              >
                <StyledLink href="/products" color="inherit" underline="none">
                  Products
                </StyledLink>
              </Button>

              <Button color="inherit">
                <StyledLink href="/brands" color="inherit" underline="none">
                  Brands
                </StyledLink>
              </Button>
              <Button color="inherit">
                <StyledLink href="/support" color="inherit" underline="none">
                  Support
                </StyledLink>
              </Button>
            </Grid>
            <Grid item xs={1}></Grid>
          </Grid>
          <Menu
            id="products-menu"
            anchorEl={anchorEl}
            open={open}
            MenuListProps={{ "aria-labelledby": "products-button" }}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <MenuItem onClick={handleClose}>
              <Link
                href="/products?type=phones"
                color="inherit"
                underline="none"
              >
                Phones
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                href="/products?type=laptops"
                color="inherit"
                underline="none"
              >
                Laptops
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                href="/products?type=tablets"
                color="inherit"
                underline="none"
              >
                Tablets
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                href="/products?type=accessories"
                color="inherit"
                underline="none"
              >
                Accessories
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </Navbar>
  );
};
export default Header;
