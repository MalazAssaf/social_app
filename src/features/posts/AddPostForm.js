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
import { useDispatch } from "react-redux";

// OTHERS
import { createPost } from "./PostSlice";
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

export function AddPostForm({ open, setOpen }) {
  const [createPostData, setCreatePostData] = useState({
    title: "",
    body: "",
    image: null,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  // Handlers
  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseSnackbar = () => setOpenSnackbar(false);

  const handleSubmit = async (event) => {
    event.preventDefault(); // prevent form from auto-submitting

    try {
      // Wait for the async action (e.g., API call or dispatch)
      const result = await dispatch(createPost(createPostData)).unwrap();

      // Show success snackbar
      setMessage("Post created successfully ✅");
      setOpenSnackbar(true);

      // Optionally close the dialog
      setOpen(false);

      // Clear form if needed
      setCreatePostData({ title: "", body: "", image: null });
    } catch (err) {
      // Show error snackbar
      setMessage(err || "Failed to create post ❌");
      setOpenSnackbar(true);

      // Keep the dialog open so user can correct input
    }
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle sx={{ fontWeight: 900, width: "500px" }}>
          Create A New Post
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
              value={createPostData.title || ""}
              onChange={(e) => {
                setCreatePostData({
                  ...createPostData,
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
              value={createPostData.body || ""}
              onChange={(e) => {
                setCreatePostData({
                  ...createPostData,
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
                  setCreatePostData({
                    ...createPostData,
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
            Create
          </Button>
        </DialogActions>
      </Dialog>
      <MySnackbar
        open={openSnackbar}
        handleClose={handleCloseSnackbar}
        message={message}
      />
    </div>
  );
}
