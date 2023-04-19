import React from "react";
import { Typography, Grid, Stack } from "@mui/material";
import { useTranslation } from "react-i18next";
const Footer = () => {
  const { t } = useTranslation();
  return (
    <Grid container>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <Typography variant="h6">{t("customerSupport")} </Typography>
          <Typography variant="h6">{t("customerSupport")} </Typography>
          <Typography variant="h6">{t("customerSupport")} </Typography>
          <Typography variant="h6">{t("customerSupport")} </Typography>
        </Stack>
      </Grid>
      <Grid item xs={1}></Grid>
    </Grid>
  );
};

export default Footer;
