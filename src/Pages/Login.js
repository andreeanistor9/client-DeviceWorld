import React from "react";
import { Box, TextField, Grid, Typography, Stack, FormControl, IconButton, Button } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
function Login() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
  return (
    <Grid container>
      <Grid xs={1}></Grid>
      <Grid xs={10}>
        <Typography variant="h2" sx={{ textAlign: "center", padding: 5 }}>
          Log in 
        </Typography>
        <Box
          component="form"
          autoComplete="off"
          sx={{ display: "flex", justifyContent: "center", alignItems:"center" }}
        >
          <Stack spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems:"center" }}>
            <TextField
              sx={{width:"100%"}}
              required
              id="username"
              label="Username"
            />

            <FormControl  variant="outlined">
              <InputLabel sx={{width:"100%"}} htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
            </FormControl>
            <Button type="submit" variant="contained" sx={{width:"50%"}}>
                Log in
            </Button>
          </Stack>
        </Box>
      </Grid>
      <Grid xs={1}></Grid>
    </Grid>
  );
}

export default Login;
