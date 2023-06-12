import React, { useEffect, useState } from "react";
import { Grid, Typography, Button, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
function Wishlist() {
  const { t } = useTranslation();
  const [wishlistItems, setWishlistItems] = useState([]);
  useEffect(() => {
    fetchWishlist();
  }, []);
  const fetchWishlist = async () => {
    try {
      const response = await fetch("/wishlist");
      const jsonData = await response.json();
      setWishlistItems(jsonData.wishlistItems || []);
    } catch (error) {
      console.error("Error fetching wishlist: ", error);
    }
  };
  const removeFromWishlist = async (productId) => {
    try {
      const response = await fetch(`/wishlist/remove/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        fetchWishlist();
      } else {
        console.error("Error removing product from wishlist:", response.status);
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  };
  return (
    <Grid container sx={{ m: 2 }}>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <Typography variant="h6">{t("wishlist")}</Typography>
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => (
            <Grid container key={item.productId} sx={{ ml: 5 }}>
              <Grid item xs={2}>
                {console.log(item.photo)}
                <img
                  src={`/images/products/${item.photo}`}
                  width="70%"
                  alt={item.productId}
                />
              </Grid>
              <Grid item xs={2} sx={{ mt: 3 }}>
                <Link href={`/product/${item.productId}`}>
                  <Typography sx={{ padding: 1 }}>{item.name}</Typography>
                </Link>
              </Grid>
              <Grid item xs={2} sx={{ mt: 3 }}>
                <Typography sx={{ padding: 1 }}>{item.price}RON </Typography>
              </Grid>

              <Grid item xs={6} sx={{ mt: 3 }}>
                <Button
                  variant="outlined"
                  onClick={() => removeFromWishlist(item.productId)}
                  size="small"
                >
                  {t("remove")}
                </Button>
              </Grid>
            </Grid>
          ))
        ) : (
          <p>no items</p>
        )}
      </Grid>
    </Grid>
  );
}

export default Wishlist;
