import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Grid } from "@mui/material";
import Slider from "../Components/Fragments/Slider";
function Home() {
  const products = [
    {
      id: "1",
      image: "prod1.png",
    },
    {
      id: "2",
      image: "macbookpro.png",
    },
    {
      id: "3",
      image: "airpodsmax.png",
    },
    {
      id: "4",
      image: "samsungtv.png",
    },
  ];
  return (
    <Grid container sx={{ paddingBottom: 6 }}>
      <Grid item xs={12}>
        <Slider items={products} cart={false} />
      </Grid>
    </Grid>
  );
}
export default Home;
