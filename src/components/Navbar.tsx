import React from "react";
import {
  LightModeOutlined,
  DarkModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  IconButton,
  InputBase,
  Toolbar,
  useTheme,
  Box,
  Button,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import profileImg from "../assets/profileImg.png";

// components
import FlexBetween from "./FlexBetween";

// redux
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setMode, User } from "../features/global/globalSlice";

type NavbarProps = {
  user: User;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function Navbar({ user, isSidebarOpen, setIsSidebarOpen }: NavbarProps) {
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isOpen = Boolean(anchorEl);
  const handleOpen = (event: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundColor: "none", boxShadow: "none" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          {/* LEFT SIDE */}
          <FlexBetween>
            <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <MenuIcon />
            </IconButton>
            <FlexBetween
              sx={{ backgroundColor: theme.palette.background.paper }}
              borderRadius="9px"
              gap="3rem"
              p="0.1rem 1.5rem"
            >
              <InputBase placeholder="...Search" />
              <IconButton>
                <Search />
              </IconButton>
            </FlexBetween>
          </FlexBetween>

          {/* RIGHT SIDE */}
          <FlexBetween gap="1.5rem">
            <IconButton
              onClick={() =>
                dispatch(
                  setMode(theme.palette.mode === "dark" ? "light" : "dark")
                )
              }
            >
              {theme.palette.mode === "dark" ? (
                <DarkModeOutlined sx={{ fontSize: "25px" }} />
              ) : (
                <LightModeOutlined sx={{ fontSize: "25px" }} />
              )}
            </IconButton>
            <IconButton>
              <SettingsOutlined sx={{ fontSize: "25px" }} />
            </IconButton>

            <FlexBetween>
              <Button
                onClick={handleOpen}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  textTransform: "none",
                  gap: "1rem",
                }}
              >
                <Box
                  component="img"
                  alt="profile"
                  src={profileImg}
                  height="32px"
                  width="32px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                />
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.85rem"
                    sx={{ color: theme.palette.secondary.contrastText }}
                  >
                    {user.name}
                  </Typography>
                  <Typography
                    fontSize="0.75rem"
                    sx={{ color: theme.palette.secondary.contrastText }}
                  >
                    {user.occupation}
                  </Typography>
                </Box>
                <ArrowDropDownOutlined
                  sx={{ color: theme.palette.secondary.main, fontSize: "25px" }}
                />
              </Button>
              <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose} anchorOrigin={{ vertical: "bottom", horizontal: "center"}}>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            </FlexBetween>
          </FlexBetween>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Navbar;
