// MATERIAL UI
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";

// REACT
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// OTHERS
import RegisterForm from "./RegisterForm";
import { LogInForm } from "./LogInForm";
import { logOutUser } from "./AuthSlice";
import { UserInfo } from "./UserInfo";

export function AuthButtons() {
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogIn, setOpenLogIn] = useState(false);
  const { isLoggedIn } = useSelector((state) => state.ui);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      {isLoggedIn ? (
        <Stack direction={"row"} spacing={1} sx={{ alignItems: "center" }}>
          {/* User Information => Username & Profile Image */}
          <UserInfo />
          <Button
            color="error"
            variant="outlined"
            onClick={() => {
              dispatch(logOutUser());
              navigate("/");
            }}
          >
            Log out
          </Button>
        </Stack>
      ) : (
        <>
          <Button
            color="success"
            variant="outlined"
            onClick={() => setOpenRegister(true)}
          >
            Register
          </Button>

          {/* Show Register Modal */}
          {openRegister && (
            <RegisterForm open={openRegister} setOpen={setOpenRegister} />
          )}

          <Button
            color="success"
            variant="outlined"
            sx={{ ml: 2 }}
            onClick={() => setOpenLogIn(true)}
          >
            Login
          </Button>
          {/* Show Login Modal */}
          <LogInForm open={openLogIn} setOpen={setOpenLogIn} />
        </>
      )}
    </>
  );
}
