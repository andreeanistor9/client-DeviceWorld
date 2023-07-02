import React, { useState, useEffect } from "react";
import {
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  IconButton,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoneIcon from "@mui/icons-material/Done";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddNewProduct from "./AddNewProduct";
function AdminProducts() {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [editableRows, setEditableRows] = useState({});
  const [showAddNewProduct, setShowAddNewProduct] = useState(false);
  const handleAddNewProduct = () => {
    setShowAddNewProduct(true);
  };
  const addNewProduct = async () => {
    await getProducts();
    setShowAddNewProduct(false);
  };
  const getProducts = async () => {
    try {
      const response = await fetch("/products");
      const jsonData = await response.json();
      setProducts(jsonData.products);
    } catch (err) {
      console.error(err.message);
    }
  };

  const toggleEdit = (productId) => {
    setEditableRows((prevEditableRows) => ({
      ...prevEditableRows,
      [productId]: !prevEditableRows[productId],
    }));
  };

  const saveChanges = async (productId) => {
    const product = products.find((product) => product.id === productId);
    const updatedProduct = {
      id: product.id,
      name: document.getElementById(`name-${productId}`).value,
      description: document.getElementById(`description-${productId}`).value,
      old_price: document.getElementById(`old_price-${productId}`).value,
      price: document.getElementById(`price-${productId}`).value,
      brand: document.getElementById(`brand-${productId}`).value,
      product_type: document.getElementById(`product_type-${productId}`).value,
      color: document.getElementById(`color-${productId}`).value,
      quantity: document.getElementById(`quantity-${productId}`).value,
    };

    try {
      const response = await fetch(`/manageProducts/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (response.ok) {
        const updatedProductData = await response.json();
        const updatedProducts = products.map((product) =>
          product.id === productId ? updatedProductData : product
        );
        setProducts(updatedProducts);
        toggleEdit(productId);
        console.log("Product updated successfully");
      } else {
        console.error("Product update failed");
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleteProduct = async (productId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        const response = await fetch(`/manageProducts/remove/${productId}`, {
          method: "DELETE",
        });

        if (response.ok) {
          const updatedProducts = products.filter(
            (product) => product.id !== productId
          );
          setProducts(updatedProducts);
          console.log("Product deleted successfully");
        } else {
          console.error("Product delete failed");
        }
      } catch (err) {
        console.error(err.message);
      }
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Grid container>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <Button variant="outlined" onClick={handleAddNewProduct} sx={{ m: 2 }}>
          <AddCircleOutlineIcon sx={{ mr: 1 }} />
          {t("addNewProduct")}
        </Button>
        {showAddNewProduct && (
          <AddNewProduct
            setShowAddNewProduct={setShowAddNewProduct}
            addNewProduct={addNewProduct}
          />
        )}
        {typeof products === "undefined" ? (
          <p>{t("loading")}...</p>
        ) : (
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell style={{ fontWeight: "bold" }}>
                  {t("name")}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  {t("description")}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  {t("old_price")}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  {t("price")}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  {t("brand")}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  {t("type")}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  {t("color")}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  {t("quantity")}
                </TableCell>
                <TableCell style={{ fontWeight: "bold" }}>
                  {t("specifications")}
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products
                .sort((a, b) => a.id - b.id)
                .map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      {editableRows[product.id] ? (
                        <TextField
                          defaultValue={product.name}
                          inputProps={{ id: `name-${product.id}` }}
                        />
                      ) : (
                        product.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editableRows[product.id] ? (
                        <TextField
                          defaultValue={product.description}
                          inputProps={{ id: `description-${product.id}` }}
                        />
                      ) : (
                        product.description
                      )}
                    </TableCell>
                    <TableCell>
                      {editableRows[product.id] ? (
                        <TextField
                          defaultValue={product.old_price}
                          inputProps={{ id: `old_price-${product.id}` }}
                        />
                      ) : product.old_price ? (
                        product.old_price + "RON"
                      ) : (
                        product.price + "RON"
                      )}
                    </TableCell>
                    <TableCell>
                      {editableRows[product.id] ? (
                        <TextField
                          defaultValue={product.price}
                          inputProps={{ id: `price-${product.id}` }}
                        />
                      ) : (
                        product.price + "RON"
                      )}
                    </TableCell>
                    <TableCell>
                      {editableRows[product.id] ? (
                        <TextField
                          defaultValue={product.brand}
                          inputProps={{ id: `brand-${product.id}` }}
                        />
                      ) : (
                        product.brand
                      )}
                    </TableCell>
                    <TableCell>
                      {editableRows[product.id] ? (
                        <TextField
                          defaultValue={product.product_type}
                          inputProps={{ id: `product_type-${product.id}` }}
                        />
                      ) : (
                        product.product_type
                      )}
                    </TableCell>
                    <TableCell>
                      {editableRows[product.id] ? (
                        <TextField
                          defaultValue={product.color}
                          inputProps={{ id: `color-${product.id}` }}
                        />
                      ) : (
                        product.color
                      )}
                    </TableCell>
                    <TableCell>
                      {editableRows[product.id] ? (
                        <TextField
                          defaultValue={product.quantity}
                          inputProps={{ id: `quantity-${product.id}` }}
                        />
                      ) : (
                        product.quantity
                      )}
                    </TableCell>
                    <TableCell>
                      {product.specifications &&
                        product.specifications.map((item) => <p>{item}</p>)}
                    </TableCell>
                    <TableCell>
                      {editableRows[product.id] ? (
                        <IconButton onClick={() => saveChanges(product.id)}>
                          <DoneIcon />
                        </IconButton>
                      ) : (
                        <IconButton onClick={() => toggleEdit(product.id)}>
                          <EditIcon />
                        </IconButton>
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => deleteProduct(product.id)}>
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

export default AdminProducts;
