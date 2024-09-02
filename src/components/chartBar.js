import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";
import Grid from "@mui/material/Grid2";

const formatproductData = (products) => {
  let finaldata = [];
  products.map((obj) => {
    finaldata.push({
      product_name: obj.title,
      value: obj.price,
    });
  });
  return finaldata;
};

const chartSetting = {
  yAxis: [
    {
      label: "rainfall (mm)",
    },
  ],
  height: 500,
  sx: {
    [`.${axisClasses.left} .${axisClasses.label}`]: {
      transform: "translate(-20px, 0)",
    },
  },
};

const valueFormatter = (value: number | null) => `${value}mm`;

export default function BarChartData(props) {
  const { selectedCategoryProducts } = props;
  const dataset = formatproductData(selectedCategoryProducts);
  return (
    <>
      <Grid size={12} container spacing={3}>
        <h2>Product in Selected Category</h2>
      </Grid>
      <Grid size={12} container spacing={3}>
        <BarChart
          dataset={dataset}
          xAxis={[{ scaleType: "band", dataKey: "product_name" }]}
          series={[{ dataKey: "value", valueFormatter }]}
          {...chartSetting}
        ></BarChart>
      </Grid>
    </>
  );
}
