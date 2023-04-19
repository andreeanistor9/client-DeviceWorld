import React, { useState } from "react";
import {
  Box,
  TextField,
  Grid,
  Typography,
  Stack,
  FormControl,
  IconButton,
  Button,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import { useTranslation } from "react-i18next";
function Login() {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const loginUser = () => {
    console.log(username, password);
  };
  return (
    <Grid container>
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
            <Button
              type="submit"
              variant="contained"
              sx={{ width: "70%" }}
              onClick={loginUser}
            >
              {t("login")}
            </Button>
          </Stack>
        </Box>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
}

export default Login;
