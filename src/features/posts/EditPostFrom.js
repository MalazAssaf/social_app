// MATERIAL UI
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Divider } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

// REACT
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// OTHERS
import { editPost } from "./PostSlice";
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

export function EditPostForm({ open, setOpen, postId }) {
  // Select the Current Post
  const { itemsOfUser } = useSelector((state) => state.posts);
  const currentPost = itemsOfUser.find((post) => post.id === postId);
  const [editPostData, setEditPostData] = useState({
    title: currentPost?.title,
    body: currentPost?.body,
    image: null,
    postId: postId,
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  // Handlers
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(editPost(editPostData))
      .unwrap()
      .catch((err) => {
        setMessage(err || "Login Failed ❌");
        setOpenSnackbar(true);
      });
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: 900, width: "500px" }}>
          Edit Post
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="title"
              type="text"
              fullWidth
              variant="standard"
              value={editPostData.title || ""}
              onChange={(e) => {
                setEditPostData({
                  ...editPostData,
                  title: e.target.value,
                });
              }}
            />
            <TextField
              label="Body"
              variant="outlined"
              fullWidth
              multiline
              rows={4}
              sx={{ marginTop: 2 }}
              value={editPostData.body || ""}
              onChange={(e) => {
                setEditPostData({
                  ...editPostData,
                  body: e.target.value,
                });
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
              Upload Image
              <VisuallyHiddenInput
                type="file"
                onChange={(e) =>
                  setEditPostData({
                    ...editPostData,
                    image: e.target.files[0],
                  })
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
            Update
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
