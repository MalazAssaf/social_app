// MATERIAL UI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

// REACT
import { useState } from "react";
import { useDispatch } from "react-redux";

// OTHERS
import { registerUser } from "./AuthSlice";
import MySnackbar from "../../components/MySnackbar";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
  background: "red",
});

export default function RegisterForm({ open, setOpen }) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    email: "",
    image: null,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(formData))
      .unwrap()
      .then(() => {
        setOpen(false);
      })
      .catch((err) => {
        setMessage(err || "Register Failed ❌");
        setOpenSnackbar(true);
      });
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: 900 }}>Register New User</DialogTitle>
        <Divider />
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
              value={formData.username || ""}
              onChange={(e) => {
                setFormData({ ...formData, username: e.target.value });
              }}
            />
            <TextField
              autoFocus
              required
              margin="dense"
              id="password"
              name="password"
              label="Password"
              type="password"
              fullWidth
              variant="standard"
              value={formData.password || ""}
              onChange={(e) => {
                setFormData({ ...formData, password: e.target.value });
              }}
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="name"
              label="Name"
              type="text"
              fullWidth
              variant="standard"
              value={formData.name || ""}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
            />

            <TextField
              autoFocus
              required
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              value={formData.email || ""}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
            />
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              sx={{ marginTop: 2 }}
            >
              Upload Profile Image
              <VisuallyHiddenInput
                type="file"
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.files[0] })
                }
                multiple
              />
            </Button>
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
            Register
          </Button>
        </DialogActions>
      </Dialog>
      <MySnackbar
        open={openSnackbar}
        handleClose={handleCloseSnackbar}
        message={message}
      />
    </>
  );
}
