// MATERIAL UI
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { SnackbarContent } from "@mui/material";

export default function MySnackbar({ open, handleClose, message }) {
  const action = (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <SnackbarContent
        sx={{ backgroundColor: "#ff0d0de2", color: "white" }}
        message={message}
        action={action}
      />
    </Snackbar>
  );
}
