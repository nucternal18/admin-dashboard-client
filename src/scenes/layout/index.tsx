import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar } from "../../components";

import { useAppSelector } from "../../app/hooks";
import { useGetUserQuery } from "../../app/api";

function Layout() {
  const isNonMobile = useMediaQuery("(min-width: 600px)");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const userId = useAppSelector((state) => state.global.userId);
  const { data: user, isLoading } = useGetUserQuery(userId);

  if (isLoading) return <div>Loading...</div>;

  return (
    <Box
      display={isNonMobile ? "flex" : "block"}
      width={"100%"}
      height={"100%"}
    >
      <Sidebar
        user={user!}
        isNonMobile={isNonMobile}
        drawerWidth="250px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box flexGrow={1} width={"100%"}>
        <Navbar
          user={user!}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
