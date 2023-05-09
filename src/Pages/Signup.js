import React, { useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  IconButton,
  Grid,
  Typography,
  Stack,
  Button,
  Checkbox,
  FormControlLabel,
  Input,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
function Signup() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // const handleMouseDownPassword = (event) => {
  //   event.preventDefault();
  // };
  const validationButton = () => {
    if (
      username === "" ||
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      password !== confirmPassword
    ) {
      return false;
    }
    return true;
  };

  const submitSignup = async (e) => {
    e.preventDefault();
    try {
      const body = {username, firstName, lastName, email, password};
      if(password === confirmPassword){
      const response = await fetch("/signup", {
        method:"POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })
      const data = await response.json();
      if(data.loggedIn){
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("username", data.user.username);
        navigate("/");
        window.location.reload(false);
      }else{
        alert(data.status);
      }
    }
    else {
      alert("parolele nu coincid")
    }
    } catch (err) {
      console.error(err.message); 
    }
  };

  return (
    <Grid container>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <Typography variant="h2" sx={{ textAlign: "center", padding: 5 }}>
          {t("createAccount")}
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
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="username">{t("username")}</InputLabel>
              <OutlinedInput
                name="username"
                type="username"
                label={t("username")}
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="firstName">{t("firstName")}</InputLabel>
              <OutlinedInput
                name="firstName"
                type="firstName"
                label={t("firstName")}
                autoComplete="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="lastName">{t("lastName")}</InputLabel>
              <OutlinedInput
                name="lastName"
                type="lastName"
                label={t("lastName")}
                autoComplete="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="email">{t("email")}</InputLabel>
              <OutlinedInput
                name="email"
                type="email"
                label={t("email")}
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="password">{t("password")}</InputLabel>
              <OutlinedInput
                name="password"
                autoComplete="password"
                value={password}
                label={t("password")}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  showPassword ? (
                    <InputAdornment position="end">
                      <VisibilityOff
                        fontsize="default"
                        onClick={handleClickShowPassword}
                      />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <Visibility
                        fontsize="default"
                        onClick={handleClickShowPassword}
                      />
                    </InputAdornment>
                  )
                }
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="confirmPassword">
                {t("confirmPassword")}
              </InputLabel>
              <OutlinedInput
                name="confirmPassword"
                autoComplete="confirmPassword"
                value={confirmPassword}
                label={t("confirmPassword")}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                endAdornment={
                  showPassword ? (
                    <InputAdornment position="end">
                      <VisibilityOff
                        fontsize="default"
                        onClick={handleClickShowPassword}
                      />
                    </InputAdornment>
                  ) : (
                    <InputAdornment position="end">
                      <Visibility
                        fontsize="default"
                        onClick={handleClickShowPassword}
                      />
                    </InputAdornment>
                  )
                }
              />
            </FormControl>
            <Button
              disabled={!validationButton()}
              disableRipple
              fullWidth
              type="submit"
              variant="contained"
              sx={{ width: "70%" }}
              onClick={submitSignup}
            >
              {t("signup")}
            </Button>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
}

export default Signup;
