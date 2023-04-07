import React from 'react'
import {Box, TextField, FormControl, IconButton, Grid, Typography, Stack, Button,Checkbox, FormControlLabel} from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
function Signup() {
 const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Grid container>
    <Grid xs={1}></Grid>
    <Grid xs={10}>
    <Typography variant="h2" sx={{textAlign:"center", padding:5}}>Create account</Typography>
    <Box
          component="form"
          autoComplete="off"
          sx={{ display: "flex", justifyContent: "center", alignItems:"center" }}
        >
          <Stack spacing={2} sx={{ display: "flex", justifyContent: "center", alignItems:"center" }}>

        <TextField  sx={{width:"100%"}}required id="username" label="Username"/>
        <TextField sx={{width:"100%"}}required id="firstName" label="First Name" />
        <TextField  sx={{width:"100%"}}required id="lastName" label="Last Name" />
        <TextField  sx={{width:"100%"}}required id="email" label="Email"/>
        <TextField  sx={{width:"100%"}}required id="phone" label="Phone Number"/>
        <FormControl sx={{width:"100%"}} variant="outlined">
          <InputLabel  htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
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
        <FormControl sx={{width:"100%"}} variant="outlined">
          <InputLabel  htmlFor="outlined-adornment-password">Confirm password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
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
            label="Confirm Password"
          />
           </FormControl>
          <FormControlLabel control={<Checkbox disableRipple/>} label="Do you have eyes problems?"></FormControlLabel>
        <Button type="submit" variant="contained" sx={{width:"50%"}}>
                Sign up
          </Button>
       
      
        </Stack>
    </Box>
    </Grid>
    <Grid xs={1}></Grid>
    </Grid>
  )
}

export default Signup