import React from 'react'
import { Grid, Typography  } from '@mui/material'
import { useTranslation } from 'react-i18next';
function Cart() {
  const {t} = useTranslation();
  return (
    <Grid container sx={{m:2}}>

    <Grid item xs={1}></Grid>
    <Grid item xs={10} >
      <Typography variant="h6">{t("cart")}</Typography>
       </Grid>
    </Grid>
  )
}

export default Cart