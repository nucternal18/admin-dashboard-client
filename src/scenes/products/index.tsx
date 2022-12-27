import React, { useState } from "react";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import { useGetProductsQuery } from "../../app/api";
import { Header, ProductComponent } from "../../components";

function Products() {
  const { data: products, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 600px)");

  if (isLoading) return <div>Loading...</div>;
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="PRODUCTS" subtitle="See your list of products" />
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        justifyContent="space-between"
        rowGap="20px"
        columnGap="1.33%"
        sx={{ "& > div": { gridColumn: isNonMobile ? undefined : "span 4" } }}
      >
        {products?.map((product) => (
            <ProductComponent key={`${product._id}-${product.name}`} product={product} />
        ))}
      </Box>
    </Box>
  );
}

export default Products;
