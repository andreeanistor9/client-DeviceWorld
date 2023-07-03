import React, { useState } from "react";
import {
  Box,
  FormControl,
  Grid,
  Typography,
  Stack,
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
  const [usernameError, setUsernameError] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const firstNameRegex = /^[A-Za-z\s-]+$/;
  const lastNameRegex = /^[A-Za-z\s-]+$/;
  const usernameRegex = /^[A-Za-z0-9_.]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()])[a-zA-Z\d!@#$%^&*()]+$/;

  const validationButton = () => {
    if (
      !firstName.match(firstNameRegex) ||
      !lastName.match(lastNameRegex) ||
      !username.match(usernameRegex) ||
      !email.match(emailRegex) ||
      !password.match(passwordRegex) ||
      password !== confirmPassword
    ) {
      return false;
    }
    return true;
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setUsernameError(!e.target.value.match(usernameRegex));
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setFirstNameError(!e.target.value.match(firstNameRegex));
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setLastNameError(!e.target.value.match(lastNameRegex));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError(!e.target.value.match(emailRegex));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError(!e.target.value.match(passwordRegex));
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(e.target.value !== password);
  };
  const submitSignup = async (e) => {
    e.preventDefault();
    try {
      const user = { username, firstName, lastName, email, password };
      if (password === confirmPassword) {
        const response = await fetch("/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });
        const data = await response.json();

        if (data.loggedIn) {
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("username", data.user.username);
          localStorage.setItem("first_name", data.user.first_name);
          localStorage.setItem("last_name", data.user.last_name);
          localStorage.setItem("role", data.user.role);
          navigate("/");
          window.location.reload(false);
        } else {
          alert(data.status);
        }
      } else {
        alert("Different passwords");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Grid container>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <Typography variant="h3" sx={{ textAlign: "center", padding: 3 }}>
          {t("createAccount")}
        </Typography>
        <Typography sx={{ textAlign: "center" }}>
          {t("haveAccount")} <ArrowRightAltOutlinedIcon />{" "}
          <Link href="/login">{t("login")}</Link>
        </Typography>
        <Box
          component="form"
          autoComplete="off"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 2,
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
                onChange={handleUsernameChange}
                error={usernameError}
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
                onChange={handleFirstNameChange}
                error={firstNameError}
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
                onChange={handleLastNameChange}
                error={lastNameError}
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
                onChange={handleEmailChange}
                error={emailError}
              />
            </FormControl>

            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="password">{t("password")}</InputLabel>
              <OutlinedInput
                name="password"
                autoComplete="password"
                value={password}
                label={t("password")}
                onChange={handlePasswordChange}
                error={passwordError}
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
                onChange={handleConfirmPasswordChange}
                error={confirmPasswordError}
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
            <Typography sx={{ fontSize: "12px", mb: 2 }}>
              {t("password_style")}
            </Typography>
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
