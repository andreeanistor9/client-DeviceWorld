import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Stack,
  FormControl,
  Button,
  Link,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const loginUser = async (e) => {
    try {
      e.preventDefault();
      const body = { username, password };
      const response = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await response.json();

      if (data.loggedIn) {
        console.log("login succcessful");
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("username", username);
        localStorage.setItem("first_name", data.user.first_name);
        localStorage.setItem("last_name", data.user.last_name);
        localStorage.setItem("role", data.user.role);
        navigate("/");
        window.location.reload();
      } else {
        // login failed, display error message
        console.log("Login failed");
        alert(data.status);
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Grid container sx={{ paddingBottom: "1.5%" }}>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <Typography variant="h2" sx={{ textAlign: "center", padding: 5 }}>
          {t("login")}
        </Typography>
        <Box
          component="form"
          autoComplete="off"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack
            spacing={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            id="login"
            method="post"
            action="/login"
          >
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="username">{t("username")}</InputLabel>
              <OutlinedInput
                name="username"
                type="username"
                label={t("username")}
                autoComplete="username"
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="password">{t("password")}</InputLabel>
              <OutlinedInput
                name="password"
                autoComplete="password"
                value={password}
                label={t("password")}
                required
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  showPassword ? (
                    <InputAdornment position="end">
                      <VisibilityOff
                        fontSize="default"
                        onClick={handleClickShowPassword}
                      />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <Visibility
                        fontSize="default"
                        onClick={handleClickShowPassword}
                      />
                    </InputAdornment>
                  )
                }
              />
            </FormControl>
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "70%", m: 5 }}
              onClick={loginUser}
            >
              {t("login")}
            </Button>
            <Typography>
              {t("noAccount")} <ArrowRightAltOutlinedIcon />{" "}
              <Link href="/signup">{t("signup")}</Link>
            </Typography>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
}

export default Login;
