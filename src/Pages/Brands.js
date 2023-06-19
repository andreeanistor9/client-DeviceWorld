import React from "react";
import { Grid, Typography, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

function Brands() {
  const { t } = useTranslation();
  const brands = [
    {
      name: "apple",
      logo: "apple.png",
    },
    { name: "asus", logo: "asus.png" },
    {
      name: "dell",
      logo: "dell.png",
    },
    {
      name: "huawei",
      logo: "huawei.png",
    },
    {
      name: "lenovo",
      logo: "lenovo.png",
    },
    {
      name: "samsung",
      logo: "samsung.png",
    },
    {
      name: "sony",
      logo: "sony.png",
    },
  ];
  return (
    <Grid container sx={{ m: 2 }}>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <Typography variant="h6">{t("brands")}</Typography>
        <Box>
          {brands.map((brand) => (
            <>
              <Typography sx={{ textTransform: "capitalize" }}>
                {brand.name}
              </Typography>
              <img
                src={`/images/logo/${brand.logo}`}
                alt={`${brand.name}`}
                width="10%"
              />
            </>
          ))}
        </Box>
      </Grid>
    </Grid>
  );
}

export default Brands;
