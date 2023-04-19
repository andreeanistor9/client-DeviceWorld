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
function Signup() {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const matchPassword = () => password === confirmPassword;
  const validationButton = () => {
    if (username == "") {
      return false;
    }
    return true;
  };

  const collectData = (e) => {
    console.log(username, firstName, lastName, email, phone, password);
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
                disableUnderline={true}
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
                disableUnderline={true}
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
                disableUnderline={true}
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
                disableUnderline={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="phone">{t("phone")}</InputLabel>
              <OutlinedInput
                name="phone"
                type="phone"
                label={t("phone")}
                autoComplete="phone"
                value={phone}
                disableUnderline={true}
                onChange={(e) => setPhone(e.target.value)}
              />
            </FormControl>
            <FormControl required fullWidth margin="normal">
              <InputLabel htmlFor="password">{t("password")}</InputLabel>
              <OutlinedInput
                name="password"
                autoComplete="password"
                value={password}
                label={t("password")}
                disableUnderline={true}
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
                disableUnderline={true}
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
              onClick={collectData}
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
