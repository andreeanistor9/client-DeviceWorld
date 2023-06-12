import React, { useState, useRef } from "react";
import { Button, Typography, List, ListItem, Stack } from "@mui/material";
import { styled } from "@mui/system";
import { useTranslation } from "react-i18next";

const StyledList = styled("List")({
  listStyle: "none",
  display: "flex",
  overflowX: "hidden",
  scrollBehavior: "smooth",
  padding: 1,
  margin: 0,
  backgroundColor: "#edf2f9",
});

const StyledListItem = styled("ListItem")({
  flex: "0 0 33%",
  textAlign: "center",
});

const Slider = ({ items, cart }) => {
  const { t } = useTranslation();
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);
  const handleScrollRight = () => {
    const scrollContainer = scrollContainerRef.current;
    const scrollWidth = scrollContainer.scrollWidth;
    const containerWidth = scrollContainer.offsetWidth;
    const maxScrollPosition = scrollWidth - containerWidth;
    const newScrollPosition = Math.min(
      scrollPosition + containerWidth,
      maxScrollPosition
    );
    setScrollPosition(newScrollPosition);
    scrollContainer.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });
  };

  const handleScrollLeft = () => {
    const scrollContainer = scrollContainerRef.current;
    const containerWidth = scrollContainer.offsetWidth;
    const newScrollPosition = Math.max(scrollPosition - containerWidth, 0);
    setScrollPosition(newScrollPosition);
    scrollContainer.scrollTo({
      left: newScrollPosition,
      behavior: "smooth",
    });
  };

  return (
    <>
      {items.length > 0 && cart && (
        <Typography variant="h6" sx={{ ml: 5, mt: 2 }}>
          {t("suggestions")}
        </Typography>
      )}
      {cart ? (
        items.length > 3 ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button onClick={handleScrollLeft}>&lt;</Button>
            <StyledList ref={scrollContainerRef}>
              {items.map((item, i) => (
                <StyledListItem key={item.id}>
                  <Button href={`/product/${item.id}`}>
                    <img
                      src={`/images/products/${item.image}`}
                      width="70%"
                      alt={`product${i + 1}`}
                    />
                  </Button>
                  <Typography>{item.name}</Typography>
                  <Typography>{item.price} RON</Typography>
                </StyledListItem>
              ))}
            </StyledList>
            <Button onClick={handleScrollRight}>&gt;</Button>
          </div>
        ) : (
          // <div style={{ display: "flex", alignItems: "center" }}>
          <StyledList>
            {items.length > 0 &&
              items.map((item, i) => (
                <StyledListItem key={item.id}>
                  <Button href={`/product/${item.id}`}>
                    <img
                      src={`/images/products/${item.image}`}
                      width="50%"
                      alt={`product${i + 1}`}
                    />
                  </Button>
                  <Typography>{item.name}</Typography>
                  <Typography>{item.price} RON</Typography>
                </StyledListItem>
              ))}
          </StyledList>
          // </div>
        )
      ) : (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button onClick={handleScrollLeft}>&lt;</Button>
          <StyledList ref={scrollContainerRef}>
            {items.map((item, i) => (
              <StyledListItem key={item.id}>
                <img
                  src={`/images/products/${item.image}`}
                  width="80%"
                  alt={`product${i + 1}`}
                />
              </StyledListItem>
            ))}
          </StyledList>
          <Button onClick={handleScrollRight}>&gt;</Button>
        </div>
      )}
    </>
  );
};

export default Slider;
