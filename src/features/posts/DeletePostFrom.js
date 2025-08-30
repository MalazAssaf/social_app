// MATERIAL UI
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";

// REACT
import { useDispatch } from "react-redux";
import { Divider } from "@mui/material";
// OTHERS
import { deletePost } from "./PostSlice";

export function DeletePostForm({ open, setOpen, postId }) {
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(deletePost(postId));
    handleClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete The Post"}</DialogTitle>
      <Divider />
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete the post?{" "}
        </DialogContentText>
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
        <Button
          onClick={handleSubmit}
          autoFocus
          variant="contained"
          color="error"
        >
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
}
