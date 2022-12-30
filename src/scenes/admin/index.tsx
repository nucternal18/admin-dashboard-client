import React from 'react'
import {
  Box,
  useTheme,
} from "@mui/material";

import { Header } from "../../components";


function Admin() {
  const theme = useTheme()
  return (
    <Box m="1.5rem 2.5rem">
      <Header title="ADMIN" subtitle="" />
      <Box
        mt="40px"
        height="75vh"
        border={`1px solid ${theme.palette.secondary.light}`}
      >
      </Box>
    </Box>
  );
}

export default Admin