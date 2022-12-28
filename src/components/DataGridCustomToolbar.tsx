import React from "react";
import { Search } from "@mui/icons-material";
import { Box, Button, InputAdornment, TextField, IconButton } from "@mui/material";
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid";

import FlexBetween from "./FlexBetween";

type DataGridCustomToolbarProps = {
    searchInput: string;
    setSearchInput: React.Dispatch<React.SetStateAction<string>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
}

function DataGridCustomToolbar({ searchInput, setSearchInput, setSearch }: DataGridCustomToolbarProps) {
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween>
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <TextField
          label="Search"
          sx={{ mb: "0.5rem", width: "15rem" }}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          inputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton onClick={() => {
                        setSearch(searchInput);
                        setSearchInput('');
                    }}>
                        <Search />
                    </IconButton>
                </InputAdornment>
            )
          }}
        />
      </FlexBetween>
    </GridToolbarContainer>
  );
}

export default DataGridCustomToolbar;
