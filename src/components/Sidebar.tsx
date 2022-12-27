import React, { useEffect, useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import {
  SettingsOutlined,
  ChevronLeft,
  ChevronRightOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  Groups2Outlined,
  ReceiptLongOutlined,
  PublicOutlined,
  PointOfSaleOutlined,
  TodayOutlined,
  CalendarMonthOutlined,
  AdminPanelSettingsOutlined,
  TrendingUpOutlined,
  PieChartOutlined,
} from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

import FlexBetween from "./FlexBetween";
import profileImg from "../assets/profileImg.png";
import { User } from "../features/global/globalSlice";

type SidebarProps = {
  user: User;
  isNonMobile: boolean;
  drawerWidth: string;
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const NAV_ITEMS = [
  {
    text: "Dashboard",
    icon: <HomeOutlined />,
  },
  {
    text: "Client Facing",
    icon: null,
  },
  {
    text: "Products",
    icon: <ShoppingCartOutlined />,
  },
  {
    text: "Customers",
    icon: <Groups2Outlined />,
  },
  {
    text: "Transactions",
    icon: <ReceiptLongOutlined />,
  },
  {
    text: "Geography",
    icon: <PublicOutlined />,
  },
  {
    text: "Sales",
    icon: null,
  },
  {
    text: "Overview",
    icon: <PointOfSaleOutlined />,
  },
  {
    text: "Daily",
    icon: <TodayOutlined />,
  },
  {
    text: "Monthly",
    icon: <CalendarMonthOutlined />,
  },
  {
    text: "Breakdown",
    icon: <PieChartOutlined />,
  },
  {
    text: "Management",
    icon: null,
  },
  {
    text: "Admin",
    icon: <AdminPanelSettingsOutlined />,
  },
  {
    text: "Performance",
    icon: <TrendingUpOutlined />,
  },
];

function Sidebar({
  user,
  isNonMobile,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
}: SidebarProps) {
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  }, [pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary.light,
              backgroundColor: theme.palette.background.paper,
              boxSizing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem">
                  <Typography variant="h4" fontWeight="bold">
                    ECOMVISION
                  </Typography>
                </Box>
                {!isNonMobile ? (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                ) : null}
              </FlexBetween>
            </Box>
            <List>
              {NAV_ITEMS.map(({ text, icon }, index) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }

                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary.main
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary.dark
                            : theme.palette.secondary.light,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: " 2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary.dark
                              : theme.palette.secondary.light,
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText ? (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      ) : null}
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <Box position="absolute" bottom="2rem" width="100%">
            <Divider sx={{ width: "100%"}} />
            <FlexBetween textTransform="none" gap="0.5rem" m="1.5rem 2rem 0 3rem">
              <Box
                component="img"
                alt="profile"
                src={profileImg}
                height="40px"
                width="40px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Box textAlign="left">
                <Typography
                  fontWeight="bold"
                  fontSize="0.9rem"
                  sx={{ color: theme.palette.secondary.contrastText }}
                >
                  {user.name}
                </Typography>
                <Typography
                  fontSize="0.8rem"
                  sx={{ color: theme.palette.secondary.contrastText }}
                >
                  {user.occupation}
                </Typography>
              </Box>
              <SettingsOutlined sx={{ color: theme.palette.secondary.main, fontSize: "25px"}} />
            </FlexBetween>
          </Box>
        </Drawer>
      )}
    </Box>
  );
}

export default Sidebar;
