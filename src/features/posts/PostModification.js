// MATERIAL UI
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

// OTHERS
import { DeletePostForm } from "./DeletePostFrom";
import { useState } from "react";
import { EditPostForm } from "./EditPostFrom";

export function PostModification({ postId }) {
  const [openEditPost, setOpenEditPost] = useState(false);
  const [openDeletePost, setOpenDeletePost] = useState(false);

  const handleEditForm = () => {
    setOpenEditPost(true);
  };

  return (
    <Stack direction="row" spacing={1}>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "gray",
          "&:hover": { backgroundColor: "darkgray" },
        }}
        onClick={handleEditForm}
      >
        Edit
      </Button>
      {openEditPost && (
        <EditPostForm
          open={openEditPost}
          setOpen={setOpenEditPost}
          postId={postId}
        />
      )}
      <Button
        variant="contained"
        color="error"
        onClick={() => setOpenDeletePost(true)}
      >
        Delete
      </Button>
      {openDeletePost && (
        <DeletePostForm
          open={openDeletePost}
          setOpen={setOpenDeletePost}
          postId={postId}
        />
      )}
    </Stack>
  );
}
