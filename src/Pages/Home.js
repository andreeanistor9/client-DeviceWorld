import React from "react";

import "bootstrap/dist/css/bootstrap.css";
import Carousel from "react-bootstrap/Carousel";
import { Grid, Link, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

function Home() {
  // eslint-disable-next-line
  const { t } = useTranslation();
  // const [authenticated, setAuthenticated] = useState(null)
  // useEffect(()=>{
  //   const loggedInUser = localStorage.getItem("user");
  //   if(loggedInUser){
  //     setAuthenticated(loggedInUser);
  //   }
  // }, []);
  // if(!authenticated){
  //   return <Navigate replace to="/login"/>
  // }
  return (
    <Grid container>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <Grid item xs={12}>
          <Carousel>
            <Carousel.Item>
              <Link
                target="_blank"
                href="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png"
              >
                <img
                  className="d-block w-100"
                  src="/images/carousel/carousel1.jpg"
                  alt="One"
                />
              </Link>
            </Carousel.Item>
            <Carousel.Item>
              <Link target="_blank" href="https://www.google.com">
                <img
                  className="d-block w-100"
                  src="/images/carousel/carousel2.jpg"
                  alt="Two"
                />
              </Link>
            </Carousel.Item>
            <Carousel.Item>
              <Link target="_blank" href="https://www.google.com">
                <img
                  className="d-block w-100"
                  src="/images/carousel/carousel3.jpg"
                  alt="Three"
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
              <Link
                target="_blank"
                href="https://media.geeksforgeeks.org/wp-content/uploads/20210425122739/2-300x115.png"
              >
                <img
                  className="d-block w-100"
                  src="/images/carousel/carousel1.jpg"
                  alt="One"
                  style={{ height: "400px" }}
                />
              </Link>
            </Carousel.Item>
            <Carousel.Item>
              <Link target="_blank" href="https://www.google.com">
                <img
                  className="d-block w-100"
                  src="/images/carousel/carousel2.jpg"
                  alt="Two"
                  style={{ height: "400px" }}
                />
              </Link>
            </Carousel.Item>
            <Carousel.Item>
              <Link target="_blank" href="https://www.google.com">
                <img
                  className="d-block w-100"
                  src="/images/carousel/carousel3.jpg"
                  alt="Three"
                  style={{ height: "400px" }}
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
