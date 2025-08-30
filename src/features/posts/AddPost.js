// MATERIAL UI
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Stack } from "@mui/material";

// REACT
import { useState } from "react";
import { AddPostForm } from "./AddPostForm";

export function AddPost() {
  const [openCreatePost, setOpenCreatePost] = useState(false);

  return (
    <Stack
      style={{
        position: "fixed",
        right: "10%",
        top: "80%",
        zIndex: "9999",
      }}
    >
      <AddCircleIcon
        sx={{ fontSize: "80px", cursor: "pointer", color: "#3105d0ff" }}
        onClick={() => setOpenCreatePost(true)}
      />
      {openCreatePost && (
        <AddPostForm open={openCreatePost} setOpen={setOpenCreatePost} />
      )}
    </Stack>
  );
}
