// MATERIAL UI
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export function Loader({ isLoading }) {
  return (
    <Backdrop
      sx={(theme) => ({
        color: "rgb(229 224 242)",
        zIndex: theme.zIndex.drawer + 1,
      })}
      open={isLoading}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
