import React from "react";
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
import { DataGrid } from "@mui/x-data-grid";

import { Header } from "../../components";
import { useGetCustomersQuery } from "../../app/api";

function Customers() {
  const theme = useTheme();
  const { data: customers, isLoading } = useGetCustomersQuery();

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.5 },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params: any) => {
        return params.value.replace(/(\d{3})(\d{3})(\d{4})/, "($1) $2-$3");
      },
    },
    { field: "country", headerName: "Country", flex: 0.4 },
    { field: "occupation", headerName: "Occupation", flex: 1 },
    { field: "role", headerName: "Role", flex: 0.5 },
  ];

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CUSTOMERS" subtitle="List of customers" />
      <Box
        mt="40px"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottomColor: theme.palette.secondary.contrastText,
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: theme.palette.background.paper,
            borderBottom: "none",
            color: theme.palette.secondary.contrastText,
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.paper,
            borderBottom: "none",
            color: theme.palette.secondary.contrastText,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-Text": {
            color: `${theme.palette.secondary.light} !important`,
          },
        }}
      >
        <DataGrid
          rows={customers!}
          columns={columns}
          loading={isLoading}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
}

export default Customers;
