import React from 'react'
import { Grid, Typography  } from '@mui/material'
function Promotions() {
  return (
    <Grid container sx={{m:2}}>

      <Grid item xs={1}></Grid>
      <Grid item xs={10} >
        <Typography variant="h6">Promotions</Typography>
         </Grid>
      </Grid>
     
  )
}

export default Promotions