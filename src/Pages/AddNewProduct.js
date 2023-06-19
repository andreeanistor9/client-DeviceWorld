import React, { useState, useRef } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const AddNewProduct = ({ setShowAddNewProduct, addNewProduct }) => {
  const { t } = useTranslation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [product_type, setType] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState("");
  const [specifications, setSpecifications] = useState([]);
  const [imageName, setImageName] = useState("");
  const fileInputRef = useRef(null);
  const types = ["phone", "laptop", "tablet", "tv", "accessories"];
  const brands = [
    "apple",
    "asus",
    "dell",
    "huawei",
    "lenovo",
    "samsung",
    "sony",
  ];
  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageName(file.name);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the product data
    const newProduct = {
      name,
      description,
      price,
      brand,
      product_type,
      color,
      quantity,
      specifications,
      image: imageName,
    };

    try {
      const response = await fetch("/addNewProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      if (data.added) {
        // Reset the form
        addNewProduct(newProduct);
        setName("");
        setDescription("");
        setPrice("");
        setBrand("");
        setType("");
        setColor("");
        setQuantity("");
        setSpecifications([]);
        setImageName("");
      }
    } catch (error) {
      // An error occurred during the request
      // Handle the error, display an error message, or perform any other necessary actions
    }
  };
  const handleClose = () => {
    setShowAddNewProduct(false);
  };
  const handleAddSpecification = () => {
    if (specifications.length >= 5) {
      return; // Limiting to 5 specifications
    }

    setSpecifications([...specifications, ""]);
  };

  const handleSpecificationChange = (index, value) => {
    const updatedSpecifications = [...specifications];
    updatedSpecifications[index] = value;
    setSpecifications(updatedSpecifications);
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>{t("addNewProduct")}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleFormSubmit}>
          <Grid container>
            <Grid item xs={5}>
              <TextField
                required
                label={t("name")}
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                required
                label={t("description")}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                required
                label={t("price")}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                fullWidth
                margin="normal"
              />
              <FormControl required fullWidth margin="normal">
                <InputLabel htmlFor="brand">{t("brand")}</InputLabel>
                <Select
                  id="brand"
                  value={brand}
                  label={t("brand")}
                  onChange={(e) => setBrand(e.target.value)}
                >
                  {brands.map((brand) => (
                    <MenuItem
                      sx={{ textTransform: "capitalize" }}
                      value={brand}
                    >
                      {brand}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange} // Update the event handler
                style={{ display: "none" }}
              />
              <Button
                variant="outlined"
                onClick={handleChooseFile}
                sx={{ m: 2 }}
              >
                <FileUploadIcon />
                {t("chooseImage")}
              </Button>
              {imageName && <Typography>{imageName}</Typography>}
            </Grid>
            <Grid item xs={1}></Grid>
            <Grid item xs={6}>
              <FormControl required fullWidth margin="normal">
                <InputLabel htmlFor={t("type")}>{t("type")}</InputLabel>
                <Select
                  id={t("type")}
                  value={product_type}
                  label={t("type")}
                  onChange={(e) => setType(e.target.value)}
                >
                  {types.map((type) => (
                    <MenuItem sx={{ textTransform: "capitalize" }} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                required
                label={t("color")}
                value={color}
                onChange={(e) => setColor(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                required
                label={t("quantity")}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                fullWidth
                margin="normal"
              />

              <Button
                variant="outlined"
                onClick={handleAddSpecification}
                disabled={specifications.length >= 5}
                sx={{ m: 2 }}
              >
                {t("addSpecification")}
              </Button>

              <FormControl fullWidth margin="normal">
                {specifications.map((specification, index) => (
                  <TextField
                    label={t("specification")}
                    key={index}
                    value={specification}
                    onChange={(e) =>
                      handleSpecificationChange(index, e.target.value)
                    }
                    fullWidth
                    margin="normal"
                  />
                ))}
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleFormSubmit}
          type="submit"
          variant="contained"
          color="primary"
        >
          {t("add")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddNewProduct;
