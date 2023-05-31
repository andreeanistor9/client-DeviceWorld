import React, { useState, useEffect } from "react";
import { Grid, Typography, Box, ListItem, List } from "@mui/material";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import { useTranslation } from "react-i18next";

function OrderHistory() {
  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/orders");
      const jsonData = await response.json();
      setOrders(jsonData.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <Grid container sx={{ m: 2 }}>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <Typography variant="h5">
          <HistoryOutlinedIcon fontSize="large" sx={{ color: "grey" }} />{" "}
          {t("orderHistory")}
        </Typography>

        {orders.map((order) => (
          <List key={order.id} sx={{ml:10}}>
            <Typography sx={{ textTransform: "uppercase" }} variant="h6">
              {t("orderId")}: {order.id}
            </Typography>
            <Typography variant="h6">
              {t("totalPrice")}: {order.total_price}
            </Typography>
            <Typography sx={{ textTransform: "capitalize" }}>
              {t("address")}: {order.address}
            </Typography>

            {order.order_items.map((orderItem) => (
              <ListItem key={orderItem.id} >
                <Typography >
                  {t("product")}: {orderItem.name}: {orderItem.price} RON
                </Typography>
              </ListItem>
            ))}
          </List>
        ))}
      </Grid>
    </Grid>
  );
}

export default OrderHistory;
