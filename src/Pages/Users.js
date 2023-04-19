import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
function Users() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([{}]);
  const getUsers = async () => {
    try {
      const response = await fetch("/users");
      const jsonData = await response.json();

      setUsers(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Grid container sx={{ m: 2 }}>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <Typography variant="h6">{t("users")}</Typography>

        {typeof users === "undefined" ? (
          <p>{t("loading")}...</p>
        ) : (
          users.map((user) => (
            <p>
              {user.first_name} {user.last_name}
            </p>
          ))
        )}
      </Grid>
    </Grid>
  );
}

export default Users;
