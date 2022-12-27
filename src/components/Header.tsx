import React from "react";
import { Typography, Box, useTheme } from "@mui/material";

type Props = {
  title: string;
  subtitle: string;
};

function Header({ title, subtitle }: Props) {
  const theme = useTheme();
  return (
    <Box>
      <Typography
        variant="h2"
        color={theme.palette.secondary.contrastText}
        fontWeight="bold"
        sx={{ mb: "5px" }}
      >
        {title}
      </Typography>
      <Typography variant="h5" color={theme.palette.secondary.main}>
        {subtitle}
      </Typography>
    </Box>
  );
}

export default Header;
