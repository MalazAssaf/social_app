// MATERIAL UI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/material";

// REACT
import { useState } from "react";
import { useDispatch } from "react-redux";

// OTHERS
import { logInUser } from "./AuthSlice";
import MySnackbar from "../../components/MySnackbar";

export function LogInForm({ open, setOpen }) {
  const [logInData, setLogInData] = useState({});
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");

  // Handlers
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(logInUser(logInData))
      .unwrap()
      .then(() => {
        setMessage("Logged In!");
        setOpen(false);
      })
      .catch((err) => {
        setMessage(err || "Login Failed ❌");
        setOpenSnackbar(true);
      });
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: 900 }}>Login</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="username"
              name="username"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
              value={logInData.username || ""}
              onChange={(e) =>
                setLogInData({ ...logInData, username: e.target.value })
              }
            />
            <TextField
              required
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              value={logInData.password || ""}
              onChange={(e) =>
                setLogInData({ ...logInData, password: e.target.value })
              }
            />
          </form>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            onClick={handleClose}
            variant="contained"
            sx={{
              backgroundColor: "gray",
              "&:hover": { backgroundColor: "darkgray" },
            }}
          >
            Cancel
          </Button>
          <Button type="submit" form="subscription-form" variant="contained">
            Login
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar always rendered */}
      <MySnackbar
        open={openSnackbar}
        handleClose={handleCloseSnackbar}
        message={message}
      />
    </div>
  );
}
