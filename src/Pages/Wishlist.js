import React from 'react'
import { Grid, Typography  } from '@mui/material'
function Wishlist() {
  return (
    <Grid container sx={{m:2}}>

    <Grid item xs={1}></Grid>
    <Grid item xs={10} >
      <Typography variant="h6">Wishlist</Typography>
       </Grid>
    </Grid>
  )
}

export default Wishlist