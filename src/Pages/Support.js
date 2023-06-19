import React from "react";
import { Grid, Typography, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
function Support() {
  const { t } = useTranslation();
  return (
    <Grid container sx={{ mt: 2 }}>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <Typography variant="h6">{t("support")}</Typography>
        <Typography variant="body1">
          {" "}
          {t("email")}:
          <Link
            href="mailto: deviceworld@support.com?subject=SendMail&body=Description"
            underline="none"
            color="inherit"
          >
            deviceworld@support.com
          </Link>
        </Typography>
        <Typography variant="body1">
          {t("phone")}:{" "}
          <Link href="tel: +4072541278" underline="none" color="inherit">
            0725-412-78
          </Link>
        </Typography>
        <img
          src="images/things/customer-support.jpg"
          alt="support"
          width="100%"
        />
      </Grid>
    </Grid>
  );
}

export default Support;
