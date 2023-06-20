import React from "react";
import { Grid, Typography, List, ListItem, Link } from "@mui/material";
import { useTranslation } from "react-i18next";

function Brands() {
  const { t } = useTranslation();
  const brands = [
    {
      name: "apple",
      logo: "apple.png",
      link: "https://www.apple.com/ro/",
    },
    { name: "asus", logo: "asus.png", link: "https://www.asus.com/ro/" },
    {
      name: "dell",
      logo: "dell.png",
      link: "https://www.dell.com/ro-ro",
    },
    {
      name: "huawei",
      logo: "huawei.png",
      link: "https://consumer.huawei.com/ro/",
    },
    {
      name: "lenovo",
      logo: "lenovo.png",
      link: "https://www.lenovo.com/ro/ro/",
    },
    {
      name: "samsung",
      logo: "samsung.png",
      link: "https://www.samsung.com/ro/",
    },
    {
      name: "sony",
      logo: "sony.png",
      link: "https://www.sony.ro/",
    },
  ];
  return (
    <Grid container sx={{ m: 2 }}>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <Typography variant="h6">{t("brands")}</Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {brands.map((brand) => (
            <Grid item xs={3}>
              <Link href={brand.link} target="_blank">
                <img
                  src={`/images/logo/${brand.logo}`}
                  alt={`${brand.name}`}
                  width="80%"
                />
              </Link>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Brands;
