// MATERIAL UI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";

// REACT
import { useState } from "react";

// REACT ROUTER
import { Outlet } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {
  const [showLogOutButton, setShowLogOutButton] = useState(false);
  const [anchorElNav, setAnchorElNav] = useState(null);

  // Handlers
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  function ShowButtons({ loggedIn, setLoggedIn }) {
    return loggedIn ? (
      <Button
        color="error"
        variant="outlined"
        onClick={() => setLoggedIn(false)}
      >
        Log out
      </Button>
    ) : (
      <>
        <Button
          color="success"
          variant="outlined"
          onClick={() => setLoggedIn(true)}
        >
          Register
        </Button>
        <Button
          color="success"
          variant="outlined"
          onClick={() => setLoggedIn(true)}
        >
          Login
        </Button>
      </>
    );
  }

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
            <Link
              component={RouterLink}
              to="/about"
              underline="none"
              color="inherit"
              sx={{ fontWeight: 400 }}
            >
              About
            </Link>
          </Stack>
          {/* End Nav List */}

          {/* User Buttons */}
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
          >
            <Box
              sx={{
                display: { xs: "none", md: "flex", justifyContent: "flex-end" },
              }}
            >
              <Stack spacing={1} direction={"row"}>
                {
                  <ShowButtons
                    loggedIn={showLogOutButton}
                    setLoggedIn={setShowLogOutButton}
                  />
                }
              </Stack>
            </Box>
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
                sx={{
                  display: {
                    xs: "block",
                    md: "none",
                  },
                }}
              >
                <Stack spacing={1} sx={{ padding: 1 }}>
                  {
                    <ShowButtons
                      loggedIn={showLogOutButton}
                      setLoggedIn={setShowLogOutButton}
                    />
                  }
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
