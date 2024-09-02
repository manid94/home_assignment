import { useState, useEffect } from "react";
import "./styles.css";
import SelectionContainer from "./components/selectionContainer";
import BarChart from "./components/chartBar";
import {
  Box,
  AppBar,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";

const getAvailableCategory = async (setAvailableCategory) => {
  const categories = [];

  await fetch("https://dummyjson.com/products/categories")
    .then((res) => res.json())
    .then((obj) => {
      obj.map((data) => {
        categories.push({
          name: data.name || "",
          value: data.slug || "",
        });
      });
      setAvailableCategory(categories);
      console.log(categories);
    });
};

export default function App() {
  let [availableCategory, setAvailableCategory] = useState([]);
  let [selectedCategoryProducts, setSelectedCategoryProducts] = useState({});
  useEffect(() => {
    getAvailableCategory(setAvailableCategory);
  }, []);

  return (
    <Box
      sx={{
        width: 1,
        border: 1,
        borderRadius: 1,
        flexGrow: 1,
      }}
    >
      <Grid container spacing={2}>
        <Grid size={12} container spacing={2}>
          <AppBar
            position="static"
            sx={{
              backgroundColor: "black",
              height: 30,
            }}
          >
            <div className="top-bar">
              <Typography>Products Dashboard</Typography>
            </div>
          </AppBar>
        </Grid>
        <SelectionContainer
          availableCategory={availableCategory}
          setSelectedCategoryProducts={setSelectedCategoryProducts}
        />
        <Grid size={9} container spacing={2}>
          {selectedCategoryProducts && selectedCategoryProducts.length && (
            <BarChart selectedCategoryProducts={selectedCategoryProducts} />
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
