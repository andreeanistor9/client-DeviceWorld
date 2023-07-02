import React, { useEffect, useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
function Account() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  useEffect(() => {
    getUsers();
  }, []);
  const getUsers = async () => {
    try {
      const response = await fetch("/users");
      const jsonData = await response.json();
      setUser(jsonData.current_user);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Grid container sx={{ m: 2 }}>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <Typography variant="h6">{t("account")}</Typography>
        {user && (
          <Stack key={user.id}>
            <Typography variant="body1">
              {user.first_name} {user.last_name}
            </Typography>
            <Typography variant="body1">{user.username}</Typography>
            <Typography variant="body1">{user.email}</Typography>
          </Stack>
        )}
      </Grid>
    </Grid>
  );
}

export default Account;
