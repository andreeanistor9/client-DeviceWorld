import React, { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Attach the scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
    <IconButton
      sx={{
        backgroundColor: "#0e5fd9",
        opacity: 0.5,
        color: "white",

        position: "fixed",
        bottom: 0,
        left: 15,
        "&:hover": {
          backgroundColor: "#0e5fd9",
          opacity: 0.8,
        },
        flexGrow: 1,
        display: { xs: "none", md: "flex" },
      }}
      className={`scroll-to-top ${isVisible ? "visible" : ""}`}
      onClick={scrollToTop}
    >
      <ArrowUpwardIcon fontSize="large" />
    </IconButton>
    <IconButton
    sx={{
      backgroundColor: "#0e5fd9",
      opacity: 0.2,
      color: "white",

      position: "fixed",
      bottom: 0,
      right: 15,
      "&:hover": {
        backgroundColor: "#0e5fd9",
        opacity: 0.3,
      },
      flexGrow: 1,
      display: { xs: "flex", md: "none" },
    }}
    className={`scroll-to-top ${isVisible ? "visible" : ""}`}
    onClick={scrollToTop}
  >
    <ArrowUpwardIcon fontSize="normal" />
  </IconButton>
  </>
  );
}
export default ScrollToTopButton;
