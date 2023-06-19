import React, { useState, useEffect } from "react";
import { Grid, Typography, ListItem, List, Stack, Button } from "@mui/material";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useTranslation } from "react-i18next";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: 200,
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 10,
  },
  user: {
    fontSize: 14,
    left: "60%",
    marginBottom: 10,
  },
  total: {
    fontSize: 14,
    left: "70%",
  },
});

const OrderPDFDocument = ({ order }) => {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.user}>
          Customer:{" "}
          {localStorage.getItem("last_name") +
            " " +
            localStorage.getItem("first_name")}
        </Text>
        <Text style={styles.title}>Order ID: {order.id}</Text>
        <Text style={styles.text}>Total Price: {order.total_price} RON</Text>
        <Text style={styles.text}>Adress: {order.address}</Text>
        {order.order_items.map((orderItem) => (
          <>
            <Text key={orderItem.id} style={styles.text}>
              {orderItem.name}
            </Text>
            <Text key={orderItem.id} style={styles.text}>
              {orderItem.price + " RON"}
            </Text>
            <Text key={orderItem.id} style={styles.text}>
              {orderItem.quantity + " pieces"}
            </Text>
            <Image
              src={`/images/products/${orderItem.photo}`}
              style={styles.image}
            />
          </>
        ))}
        <Text style={styles.total}>Total: {order.total_price}RON</Text>
      </Page>
    </Document>
  );
};
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

        {Array.isArray(orders) > 0 &&
          orders.map((order) => (
            <List key={order.id} sx={{ ml: 10 }}>
              <Stack direction="row" spacing={15}>
                <Typography sx={{ textTransform: "uppercase" }} variant="h6">
                  {t("orderId")}: {order.id}
                </Typography>
                <PDFDownloadLink
                  document={<OrderPDFDocument order={order} />}
                  fileName={`order_${order.id}.pdf`}
                >
                  {({ loading }) =>
                    loading ? (
                      "Loading..."
                    ) : (
                      <Button variant="outlined">
                        {t("receipt")}
                        <FileDownloadIcon />
                      </Button>
                    )
                  }
                </PDFDownloadLink>
              </Stack>
              <Typography variant="h6">
                {t("totalPrice")}: {order.total_price}
              </Typography>
              <Typography sx={{ textTransform: "capitalize" }}>
                {t("address")}: {order.address}
              </Typography>

              {order.order_items.map((orderItem) => (
                <ListItem key={orderItem.id}>
                  <img
                    src={`/images/products/${orderItem.photo}`}
                    width="40%"
                    alt={orderItem.id}
                  />
                  <Stack>
                    <Typography>
                      {t("product")}: {orderItem.name}
                    </Typography>
                    <Typography>{orderItem.price} RON</Typography>
                    <Typography>
                      {orderItem.quantity} {t("quantity")}
                      {console.log(orderItem.quantity)}
                    </Typography>
                  </Stack>
                </ListItem>
              ))}
            </List>
          ))}
      </Grid>
    </Grid>
  );
}

export default OrderHistory;
