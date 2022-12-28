import React from 'react'
import {
  Box,
  useTheme,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import { Header, DataGridCustomToolbar } from "../../components";
import { useGetTransactionsQuery } from '../../app/api';

function Transactions() {
  const theme = useTheme();

  // values to be sent to the server
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(20);
  const [sort, setSort] = React.useState({})
  const [search, setSearch] = React.useState('')
  const [searchInput, setSearchInput] = React.useState('')
  const { data: transactions, isLoading } = useGetTransactionsQuery({ page, pageSize, sort: JSON.stringify(sort), search }, { skip: false });
 

  const columns = [
    { field: "_id", headerName: "ID", flex: 1 },
    { field: "userId", headerName: "User ID", flex: 1 },
    { field: "createdAt", headerName: "Created At", flex: 1 },
    { field: "products", headerName: "# of Products", flex: 0.5, sortable: false, renderCell: (params: any) => params.value.length },
    { field: "cost", headerName: "Cost", flex: 1, renderCell: (params: any) => `$${Number(params.value).toFixed(2)}` },
  ];

  if(isLoading) return <div>Loading...</div>
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="TRANSACTIONS" subtitle="List of transactions" />
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
          rows={transactions!.transactions}
          columns={columns}
          loading={isLoading}
          getRowId={(row) => row._id}
          rowCount={transactions!.total}
          rowsPerPageOptions={[20, 50, 100]}
          pagination
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode='server'
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(newSortModel)}
          components={{
            Toolbar: DataGridCustomToolbar
          }}
          componentsProps={{ toolbar: { searchInput, setSearchInput, setSearch }}}
        />
        </Box>
    </Box>
  );
}

export default Transactions