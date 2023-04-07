import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import { Grid, Typography, Link, Box, Button } from "@mui/material";
function Home() {
  return (
    <Grid container>
      

      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <Grid item xs={12}>
      
          <Carousel>
            <Carousel.Item>
              <Link target="_blank" href="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png"   >
                <img
                  className="d-block w-100"
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png"
                  alt="One"
                />
              </Link>
            </Carousel.Item>
            <Carousel.Item>
              <Link target="_blank" href="https://www.google.com"   >
                <img
                  className="d-block w-100"
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122716/1-300x115.png"
                  alt="Two"
                  />
              </Link>
            </Carousel.Item>
          </Carousel>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <Grid xs={1}></Grid>
        <Grid xs={10}>
          <Carousel>
            <Carousel.Item>
              <Link target="_blank" href="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png">
                <img
                  className="d-block w-100"
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png"
                  alt="One"
                />{" "}
              </Link>
            </Carousel.Item>
            <Carousel.Item>
              <Link target="_blank" href="https://www.google.com">
                <img
                  className="d-block w-100"
                  src="https://media.geeksforgeeks.org/wp-content/uploads/20210425122716/1-300x115.png"
                  alt="Two"
                />
              </Link>
            </Carousel.Item>
          </Carousel>
        </Grid>
        <Grid item xs={1}></Grid>
        
      </Box>
   
    </Grid>
  );
}
export default Home;
