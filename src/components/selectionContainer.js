import { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  Button,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const fetchProduct = async (...params) => {
  const [selectedCategory, setAvailableproducts] = params;
  const categories = [];

  await fetch(`https://dummyjson.com/products/category/${selectedCategory}`)
    .then((res) => res.json())
    .then((obj) => {
      obj &&
        obj.products &&
        obj.products.length &&
        setAvailableproducts(obj.products);
      console.log(obj);
    });
};

const renderCategorys = (
  availableCategory,
  selectedCategory,
  handleCategory
) => {
  return (
    <FormControl sx={{ m: 1, width: 0.9 }} size="medium">
      <InputLabel id="category-select-label">Select Category</InputLabel>
      <Select
        labelId="category-select-label"
        id="category-select"
        value={selectedCategory}
        label="Select category"
        onChange={handleCategory}
      >
        {availableCategory.length &&
          availableCategory.map((data) => {
            return <MenuItem value={data.value}>{data.name}</MenuItem>;
          })}
      </Select>
    </FormControl>
  );
};

const renderProducts = (
  selectedProducts,
  availableProducts,
  handleProductChange
) => {
  return (
    <FormControl
      sx={{ m: 1, width: 0.9 }}
      disabled={!availableProducts.length}
      size="medium"
    >
      <InputLabel id="product-select-label">Select Product</InputLabel>
      <Select
        labelId="product-select-label"
        id="product-select"
        multiple
        value={selectedProducts}
        renderValue={(selected) => selected.join(", ")}
        label="Select Product"
        onChange={handleProductChange}
      >
        {availableProducts.length &&
          availableProducts.map((data) => (
            <MenuItem key={data.title} value={data.title}>
              <Checkbox checked={selectedProducts.indexOf(data.title) > -1} />
              <ListItemText primary={data.title} />
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );
};

export default function SelectionContainer(props) {
  const { availableCategory, setSelectedCategoryProducts } = props;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [availableProducts, setAvailableproducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    selectedCategory && fetchProduct(selectedCategory, setAvailableproducts);
  }, [selectedCategory]);

  const handleCategory = (event) => {
    setSelectedCategory(event.target.value);
  };
  const handleProductChange = (event) => {
    const selectedProducts = event.target.value;
    setSelectedProducts(selectedProducts);
  };
  const handleRunReport = () => {
    setSelectedCategoryProducts(availableProducts);
  };

  const handleClear = () => {
    setAvailableproducts([]);
    setSelectedCategoryProducts([]);
  };
  return (
    <Grid container className="left-menu" size={3} spacing={3}>
      <Grid size={8} className="center" container spacing={3}>
        <h2 className={"filter"}>Filters</h2>
      </Grid>
      <Grid size={4} container spacing={3}>
        <div className={"clear-filter"} onClick={handleClear}>
          clear
        </div>
      </Grid>
      <Grid size={12} container>
        {renderCategorys(availableCategory, selectedCategory, handleCategory)}
      </Grid>
      <Grid size={12} container>
        {renderProducts(
          selectedProducts,
          availableProducts,
          handleProductChange
        )}
      </Grid>
      <Grid size={12} container>
        <Button
          variant="contained"
          disabled={!availableProducts.length}
          sx={{ m: 1, width: 0.9 }}
          onClick={handleRunReport}
        >
          Run Report
        </Button>
      </Grid>
    </Grid>
  );
}
