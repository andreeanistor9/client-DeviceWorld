import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Grid, Typography } from "@mui/material";
import Slider from "../Components/Fragments/Slider";
import { useTranslation } from "react-i18next";
function Home() {
  const { t } = useTranslation();
  const products = [
    {
      id: "1",
      image: "prod1.png",
    },
    {
      id: "2",
      image: "sales.png",
    },
    {
      id: "3",
      image: "macbookpro.png",
    },
    {
      id: "4",
      image: "airpodsmax.png",
    },
    {
      id: "5",
      image: "sales.png",
    },
    {
      id: "6",
      image: "samsungtv.png",
    },
  ];
  return (
    <Grid container sx={{ paddingBottom: 6 }}>
      <Grid item xs={12}>
        <Slider items={products} cart={false} />
        <Typography variant="h3" sx={{ textAlign: "center", padding: 5 }}>
          {t("welcome_message")}
        </Typography>
        <Typography
          variant="h6"
          sx={{ textAlign: "center", paddingInline: 10 }}
        >
          {t("home_description")}
        </Typography>
      </Grid>
    </Grid>
  );
}
export default Home;
