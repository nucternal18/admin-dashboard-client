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
import { Product } from "../features/global/globalSlice";

type ProductProps = {
  product: Product;
};

function ProductComponent({ product }: ProductProps) {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card 
    sx={{
      backgroundImage: "none",
      backgroundColor: theme.palette.background.paper,
      borderRadius: "0.55rem"
    }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary.dark} gutterBottom>
          {product.category}
        </Typography>
        <Typography variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color={theme.palette.secondary.main}>
          {Number(product.price).toFixed(2)}
        </Typography>
        <Rating name="read-only" value={product.rating} readOnly />
      </CardContent>
      <CardActions>
        <Button variant="text" size="small" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "Hide" : "Show"} Details
        </Button>
      </CardActions>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit sx={{ color: theme.palette.info.light }}>
        <CardContent>
          <Typography variant="body2">id: {product._id}</Typography>
          <Typography variant="body2">Supply Left: {product.supply}</Typography>
          <Typography variant="body2">Yearly Sales This Year: {product.stats.yearlySalesTotal}</Typography>
          <Typography variant="body2">Yearly Units Sold This Year: {product.stats.yearlyTotalSoldUnits}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default ProductComponent;
