import React, { useState } from "react";
import {
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
  Badge,
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
import LanguageSelector from "../LanguageSelector";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Header = ({ searchedEl, setSearchedEl, handleSearchSubmit, badgeNr }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [accountEl, setAccountEl] = useState(null);
  //const [searchedEl, setSearchedEl] = useState("");

  const open = Boolean(anchorEl);
  const openNav = Boolean(anchorElNav);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickNav = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleClickAccount = (event) => {
    setAccountEl(event.currentTarget);
  };
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
  const handleSearchSubmitHeader = () => {
    handleSearchSubmit(searchedEl);
  };
  const handleLogout = async () => {
    //alert("ne delogam")
    const response = await fetch("/logout");
    if (response.ok) {
      localStorage.clear();
      navigate("/");
      window.location.reload();
    } else {
      alert("Logout failed");
    }
  };

  return (
    <Navbar position="static">
      <Toolbar sx={{ backgroundColor: "#ffffff", color: "black" }}>
        {/* ecran mic */}
        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
          <Grid container spacing={1}>
            <Grid item xs={7}>
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
                  <MenuItem>
                    <Link
                      underline="none"
                      color="inherit"
                      id="products-Link"
                      onClick={handleClick}
                      aria-controls={open ? "products-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      {" "}
                      {t("products")}
                      <KeyboardArrowRightIcon sx={{ ml: 10 }} />
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="/brands" color="inherit" underline="none">
                      {t("brands")}
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link href="/support" color="inherit" underline="none">
                      {t("support")}
                    </Link>
                  </MenuItem>
                  {localStorage.getItem("role") === "admin" ? (
                    <>
                      <MenuItem>
                        <Link href="/users" color="inherit" underline="none">
                          {t("users")}
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          href="/adminProducts"
                          color="inherit"
                          underline="none"
                        >
                          {t("manageProducts")}
                        </Link>
                      </MenuItem>
                    </>
                  ) : (
                    <></>
                  )}
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
                    <Link href="/products" color="inherit" underline="none">
                      {t("all")}
                    </Link>
                  </MenuItem>

                  <MenuItem onClick={handleClose}>
                    <Link
                      href="/products?type=phone"
                      color="inherit"
                      underline="none"
                    >
                      {t("phones")}
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link
                      href="/products?type=laptop"
                      color="inherit"
                      underline="none"
                    >
                      {t("laptops")}
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link
                      href="/products?type=tablet"
                      color="inherit"
                      underline="none"
                    >
                      {t("tablets")}
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link
                      href="/products?type=tv"
                      color="inherit"
                      underline="none"
                    >
                      {t("tv")}
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <Link
                      href="/products?type=accessories"
                      color="inherit"
                      underline="none"
                    >
                      {t("accessories")}
                    </Link>
                  </MenuItem>
                </Menu>
              </Menu>

              <StyledIconButton
                disableRipple
                size="large"
                edge="start"
                aria-label="logo"
              >
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
                    DeviceWorld
                  </Typography>
                </StyledLink>
              </StyledIconButton>
            </Grid>

            <Grid item xs={5} container justifyContent="flex-end" spacing={1}>
              <StyledIconButton
                disableRipple
                size="large"
                edge="end"
                aria-label="wishlist"
              >
                <StyledLink href="/wishlist" underline="none">
                  <FavoriteBorderIcon fontSize="inherit" />
                </StyledLink>
              </StyledIconButton>
              <StyledIconButton
                disableRipple
                size="large"
                edge="end"
                aria-label="cart"
              >
                <StyledLink href="/cart" underline="none">
                  <Badge badgeContent={badgeNr} color="primary">
                    <ShoppingCartOutlinedIcon fontSize="inherit" />
                  </Badge>
                </StyledLink>
              </StyledIconButton>

              <StyledIconButton
                disableRipple
                size="large"
                edge="end"
                aria-label="account"
                onClick={handleClickAccount}
                aria-haspopup="true"
                aria-expanded={Boolean(accountEl) ? "true" : undefined}
                sx={{ mt: 1 }}
              >
                <AccountCircleOutlinedIcon fontSize="inherit" />

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
                  sx={{ display: { xs: "flex", md: "none" } }}
                >
                  {!localStorage.getItem("user") ? (
                    <Box>
                      <MenuItem>
                        <Link href="/login" color="inherit" underline="none">
                          {t("login")}
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link href="/signup" color="inherit" underline="none">
                          {t("signup")}
                        </Link>
                      </MenuItem>
                    </Box>
                  ) : (
                    <Box>
                      <MenuItem>
                        <Link
                          href="/account"
                          color="inherit"
                          underline="none"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {t("account")}
                        </Link>
                      </MenuItem>
                      <MenuItem>
                        <Link
                          href="/orders"
                          color="inherit"
                          underline="none"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {t("orderHistory")}
                        </Link>
                      </MenuItem>

                      <MenuItem>
                        <Link
                          onClick={handleLogout}
                          color="inherit"
                          underline="none"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {t("logout")}
                        </Link>
                      </MenuItem>
                    </Box>
                  )}
                </Menu>
              </StyledIconButton>

              <StyledIconButton
                disableRipple
                size="large"
                edge="end"
                aria-label="account"
              >
                <LanguageSelector />
              </StyledIconButton>
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="search"
                type="search"
                label={t("search")}
                value={searchedEl}
                onChange={handleSearch}
                sx={{ width: "100%", mb: 1 }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon onClick={handleSearchSubmitHeader} />
                    </InputAdornment>
                  ),
                }}
              ></TextField>
            </Grid>
          </Grid>
        </Box>
        {/* ecran mare */}
        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
          <Grid container>
            <Grid item xs={1}></Grid>
            <Grid item xs={10} sx={{ flexGrow: 1 }}>
              <Stack direction="row">
                <StyledIconButton
                  disableRipple
                  size="large"
                  edge="start"
                  aria-label="logo"
                >
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
                      DeviceWorld
                    </Typography>
                  </StyledLink>
                </StyledIconButton>
                <TextField
                  id="search"
                  type="search"
                  label={t("search")}
                  value={searchedEl}
                  onChange={handleSearch}
                  onKeyPress={(event) => {
                    if (event.key === "Enter") {
                      handleSearchSubmitHeader();
                    }
                  }}
                  sx={{ flexGrow: 1, width: "100%", m: 3 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon onClick={handleSearchSubmitHeader} />
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
                    <Typography variant="body1"> {t("wishlist")}</Typography>
                  </StyledLink>
                </StyledIconButton>
                <StyledIconButton
                  disableRipple
                  size="large"
                  aria-label="cart"
                  sx={{ flexGrow: 1 }}
                >
                  <Badge badgeContent={badgeNr} color="primary">
                    <ShoppingCartOutlinedIcon fontSize="inherit" />
                  </Badge>
                  <StyledLink href="/cart" underline="none">
                    <Typography variant="body1"> {t("cart")}</Typography>
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
                    <StyledLink underline="none">
                      {localStorage.getItem("user") ? (
                        <Typography
                          variant="body1"
                          sx={{ textTransform: "lowercase" }}
                        >
                          {localStorage.getItem("username")}
                        </Typography>
                      ) : (
                        <Typography
                          variant="body1"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {t("account")}
                        </Typography>
                      )}
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
                    {!localStorage.getItem("user") ? (
                      <Box>
                        <MenuItem>
                          <Link href="/login" color="inherit" underline="none">
                            {t("login")}
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link href="/signup" color="inherit" underline="none">
                            {t("signup")}
                          </Link>
                        </MenuItem>
                      </Box>
                    ) : (
                      <Box>
                        <MenuItem>
                          <Link
                            href="/account"
                            color="inherit"
                            underline="none"
                            sx={{ textTransform: "capitalize" }}
                          >
                            {t("account")}
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link
                            href="/orders"
                            color="inherit"
                            underline="none"
                            sx={{ textTransform: "capitalize" }}
                          >
                            {t("orderHistory")}
                          </Link>
                        </MenuItem>

                        <MenuItem>
                          <Link
                            onClick={handleLogout}
                            color="inherit"
                            underline="none"
                            sx={{ textTransform: "capitalize" }}
                          >
                            {t("logout")}
                          </Link>
                        </MenuItem>
                      </Box>
                    )}
                  </Menu>
                </StyledIconButton>
              </Stack>
            </Grid>
            <Grid item xs={1} sx={{ flexGrow: 1, mt: 3 }}>
              <LanguageSelector />
            </Grid>
          </Grid>
        </Box>
      </Toolbar>

      <Toolbar disableGutters sx={{ display: { xs: "none", md: "flex" } }}>
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
                {t("products")}
              </Button>
              <Button color="inherit">
                <StyledLink href="/brands" color="inherit" underline="none">
                  {t("brands")}
                </StyledLink>
              </Button>
              <Button color="inherit">
                <StyledLink href="/support" color="inherit" underline="none">
                  {t("support")}
                </StyledLink>
              </Button>
              {localStorage.getItem("role") === "admin" ? (
                <>
                  <Button color="inherit">
                    <Link href="/users" color="inherit" underline="none">
                      {t("users")}
                    </Link>
                  </Button>
                  <Button color="inherit">
                    <Link
                      href="/adminProducts"
                      color="inherit"
                      underline="none"
                    >
                      {t("manageProducts")}
                    </Link>
                  </Button>
                </>
              ) : (
                <></>
              )}
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
              <StyledLink href="/products" color="inherit" underline="none">
                {t("all")}
              </StyledLink>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                href="/products?type=phone"
                color="inherit"
                underline="none"
              >
                {t("phones")}
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                href="/products?type=laptop"
                color="inherit"
                underline="none"
              >
                {t("laptops")}
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                href="/products?type=tablet"
                color="inherit"
                underline="none"
              >
                {t("tablets")}
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link href="/products?type=tv" color="inherit" underline="none">
                {t("tv")}
              </Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link
                href="/products?type=accessories"
                color="inherit"
                underline="none"
              >
                {t("accessories")}
              </Link>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </Navbar>
  );
};
export default Header;
