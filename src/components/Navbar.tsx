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
} from "@mui/material";
import profileImg from "../assets/profileImg.png";

// components
import FlexBetween from "./FlexBetween";

// redux
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setMode } from "../features/global/globalSlice";

type NavbarProps = {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Navbar({ isSidebarOpen, setIsSidebarOpen }: NavbarProps) {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: "none", boxShadow: "none" }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.paper}
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
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
