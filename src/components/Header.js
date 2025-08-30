// MATERIAL UI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

// REACT
import { useState } from "react";

// REACT ROUTER
import { Outlet } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { AuthButtons } from "../features/auth/AuthButtons";
import { useSelector } from "react-redux";

export default function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const showProfile = token === null ? false : true;
  // Handlers
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          boxShadow: "7px 3px 15px 10px #e3dff1",
          background: "white",
          borderRadius: "8px",
        }}
      >
        <Toolbar disableGutters>
          {/* Nav List */}
          <Stack
            spacing={2}
            direction={"row"}
            sx={{
              alignItems: "center",
            }}
          >
            <Link
              component={RouterLink}
              to="/"
              underline="none"
              color="inherit"
              sx={{ fontWeight: 700 }}
            >
              Tarmeez
            </Link>
            <Link
              component={RouterLink}
              to="/"
              underline="none"
              color="inherit"
              sx={{ fontWeight: 400 }}
            >
              Home
            </Link>
            {showProfile && (
              <Link
                component={RouterLink}
                to="/profile"
                underline="none"
                color="inherit"
                sx={{ fontWeight: 400 }}
              >
                profile
              </Link>
            )}
          </Stack>
          {/* End Nav List */}

          {/* User Buttons */}
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
          >
            {/* Desktop (md and up) */}
            <Box
              sx={{
                display: { xs: "none", md: "flex", justifyContent: "flex-end" },
              }}
            >
              <Stack spacing={1} direction={"row"}>
                <AuthButtons />
              </Stack>
            </Box>

            {/* Mobile (xs only) */}
            <Box
              sx={{
                display: { xs: "flex", md: "none", justifyContent: "flex-end" },
              }}
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
              >
                <Stack spacing={1} sx={{ padding: 1 }}>
                  <AuthButtons /> {/* ✅ same component reused */}
                </Stack>
              </Menu>
            </Box>
          </Box>
          {/*End User Buttons */}
        </Toolbar>
      </Container>
      <Outlet />
    </>
  );
}
