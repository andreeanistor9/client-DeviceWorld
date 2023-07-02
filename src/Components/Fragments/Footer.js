import React from "react";
import { Typography, Grid, Stack, Box, Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import { FacebookOutlined, Instagram, LinkedIn } from "@mui/icons-material";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
      <Grid
        container
        sx={{
          display: { xs: "none", md: "flex" },
          marginTop: "auto",
          width: "100%",
          backgroundColor: "#86a4d6",
        }}
      >
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>
          <Stack
            direction="row"
            spacing={5}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              sx={{ padding: 2, backgroundColor: "rgba(151, 177, 220, 0.5)" }}
            >
              <Typography variant="h6">{t("customerSupport")}</Typography>

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
            </Box>
            <Box
              sx={{ padding: 2, backgroundColor: "rgba(151, 177, 220, 0.5)" }}
            >
              <Typography variant="h6">{t("contact")}</Typography>
              <Typography variant="body1">
                {" "}
                {t("email")}:
                <Link
                  href="mailto: deviceworld@contact.com?subject=SendMail&body=Description"
                  underline="none"
                  color="inherit"
                >
                  deviceworld@contact.com
                </Link>
              </Typography>
              <Typography variant="body1">
                {t("phone")}:{" "}
                <Link href="tel: 0219901" underline="none" color="inherit">
                  021 / 9901
                </Link>
              </Typography>
            </Box>
            <Box
              sx={{ padding: 2, backgroundColor: "rgba(151, 177, 220, 0.5)" }}
            >
              <Typography variant="h6">{t("communication")}</Typography>
              <Typography variant="body1">
                {" "}
                <Link href="/newsletter" underline="none" color="inherit">
                  {" "}
                  {t("newsletter")}
                </Link>
              </Typography>
              <Typography variant="body1">
                <Link
                  variant="body1"
                  href="/terms_conditions"
                  underline="none"
                  color="inherit"
                >
                  {" "}
                  {t("terms")}
                </Link>
              </Typography>
              <Typography variant="body1">
                <Link
                  variant="body1"
                  href="/privacy_policy"
                  underline="none"
                  color="inherit"
                >
                  {" "}
                  {t("privacyPolicy")}
                </Link>
              </Typography>
            </Box>
            <Box
              sx={{ padding: 2, backgroundColor: "rgba(151, 177, 220, 0.5)" }}
            >
              <Typography variant="h6">{t("follow")}</Typography>
              <Link
                target="_blank"
                href="https://www.facebook.com/deviceworld009"
              >
                <FacebookOutlined fontSize="large" />
              </Link>
              <Link
                target="_blank"
                href="https://www.instagram.com/deviceworld009"
              >
                <Instagram fontSize="large" />
              </Link>
              <Link
                target="_blank"
                href="https://www.linkedin.com/deviceworld009"
              >
                <LinkedIn fontSize="large" />
              </Link>
            </Box>
          </Stack>
        </Grid>
        <Grid item xs={1}></Grid>
      </Grid>
      <Stack direction="column" sx={{ display: { xs: "flex", md: "none" } }}>
        <Box sx={{ padding: 2, backgroundColor: "rgba(151, 177, 220, 0.5)" }}>
          <Typography variant="h6">{t("customerSupport")}</Typography>
          <Link
            variant="body1"
            href="/return_products"
            underline="none"
            color="inherit"
          >
            {" "}
            {t("productReturn")}
          </Link>

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
        </Box>
        <Box sx={{ padding: 2, backgroundColor: "rgba(151, 177, 220, 0.5)" }}>
          <Typography variant="h6">{t("contact")}</Typography>
          <Typography variant="body1">
            {" "}
            {t("email")}:
            <Link
              href="mailto: deviceworld@contact.com?subject=SendMail&body=Description"
              underline="none"
              color="inherit"
            >
              deviceworld@contact.com
            </Link>
          </Typography>
          <Typography variant="body1">
            {t("phone")}:{" "}
            <Link href="tel: 0219901" underline="none" color="inherit">
              021 / 9901
            </Link>
          </Typography>
        </Box>
        <Box sx={{ padding: 2, backgroundColor: "rgba(151, 177, 220, 0.5)" }}>
          <Typography variant="h6">{t("communication")}</Typography>
          <Typography variant="body1">
            {" "}
            <Link href="/newsletter" underline="none" color="inherit">
              {" "}
              {t("newsletter")}
            </Link>
          </Typography>
          <Typography variant="body1">
            <Link
              variant="body1"
              href="/terms_conditions"
              underline="none"
              color="inherit"
            >
              {" "}
              {t("terms")}
            </Link>
          </Typography>
          <Typography variant="body1">
            <Link
              variant="body1"
              href="/privacy_policy"
              underline="none"
              color="inherit"
            >
              {" "}
              {t("privacyPolicy")}
            </Link>
          </Typography>
        </Box>
        <Box sx={{ padding: 2, backgroundColor: "rgba(151, 177, 220, 0.5)" }}>
          <Typography variant="h6">{t("follow")}</Typography>
          <Link href="https://www.facebook.com/deviceworld009">
            <FacebookOutlined fontSize="large" />
          </Link>
          <Link href="https://www.instagram.com/deviceworld009">
            <Instagram fontSize="large" />
          </Link>
          <Link href="https://www.linkedin.com/deviceworld009">
            <LinkedIn fontSize="large" />
          </Link>
        </Box>
      </Stack>
    </>
  );
};

export default Footer;
