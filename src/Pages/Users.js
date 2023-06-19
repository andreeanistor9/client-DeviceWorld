import React, { useState, useEffect } from "react";
import {
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";

function Users() {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [editableRows, setEditableRows] = useState({});

  const getUsers = async () => {
    try {
      const response = await fetch("/users");
      const jsonData = await response.json();
      setUsers(jsonData.allUsers);
    } catch (err) {
      console.error(err.message);
    }
  };

  const toggleEdit = (userId) => {
    setEditableRows((prevEditableRows) => ({
      ...prevEditableRows,
      [userId]: !prevEditableRows[userId],
    }));
  };

  const saveChanges = async (userId) => {
    const user = users.find((user) => user.id === userId);
    const updatedUser = {
      id: user.id,
      firstName: document.getElementById(`firstName-${userId}`).value,
      lastName: document.getElementById(`lastName-${userId}`).value,
      username: document.getElementById(`username-${userId}`).value,
      email: document.getElementById(`email-${userId}`).value,
      role: document.getElementById(`role-${userId}`).value,
    };

    try {
      const response = await fetch(`/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        const updatedUsers = users.map((user) =>
          user.id === userId ? updatedUserData : user
        );
        setUsers(updatedUsers);
        toggleEdit(userId);
        console.log("User updated successfully");
      } else {
        console.error("User update failed");
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  const deleteUser = async (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`/users/remove/${userId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setUsers((prevUsers) =>
            prevUsers.filter((user) => user.id !== userId)
          );
          console.log("User deleted successfully");
        } else {
          console.error("User delete failed");
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Grid container sx={{ m: 2 }}>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        {typeof users === "undefined" ? (
          <p>{t("loading")}...</p>
        ) : (
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>{t("firstName")}</TableCell>
                <TableCell>{t("lastName")}</TableCell>
                <TableCell>{t("username")}</TableCell>
                <TableCell>{t("email")}</TableCell>
                <TableCell>{t("role")}</TableCell>
                <TableCell>{t("wishlist")}</TableCell>
                <TableCell>{t("cart")}</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .sort((a, b) => a.id - b.id)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      {editableRows[user.id] ? (
                        <TextField
                          defaultValue={user.first_name}
                          inputProps={{ id: `firstName-${user.id}` }}
                        />
                      ) : (
                        user.first_name
                      )}
                    </TableCell>
                    <TableCell>
                      {editableRows[user.id] ? (
                        <TextField
                          defaultValue={user.last_name}
                          inputProps={{ id: `lastName-${user.id}` }}
                        />
                      ) : (
                        user.last_name
                      )}
                    </TableCell>
                    <TableCell>
                      {editableRows[user.id] ? (
                        <TextField
                          defaultValue={user.username}
                          inputProps={{ id: `username-${user.id}` }}
                        />
                      ) : (
                        user.username
                      )}
                    </TableCell>
                    <TableCell>
                      {editableRows[user.id] ? (
                        <TextField
                          defaultValue={user.email}
                          inputProps={{ id: `email-${user.id}` }}
                        />
                      ) : (
                        user.email
                      )}
                    </TableCell>
                    <TableCell>
                      {editableRows[user.id] ? (
                        <TextField
                          defaultValue={user.role}
                          inputProps={{ id: `role-${user.id}` }}
                        />
                      ) : (
                        user.role
                      )}
                    </TableCell>
                    <TableCell>
                      {user.wishlist &&
                        user.wishlist.map((item) => <p>{item.name}</p>)}
                    </TableCell>
                    <TableCell>
                      {user.cart && user.cart.map((item) => <p>{item.name}</p>)}
                    </TableCell>
                    <TableCell>
                      {editableRows[user.id] ? (
                        <IconButton onClick={() => saveChanges(user.id)}>
                          <DoneIcon />
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => toggleEdit(user.id)}>
                          <EditIcon />
                        </IconButton>
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => deleteUser(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </Grid>
    </Grid>
  );
}

export default Users;
