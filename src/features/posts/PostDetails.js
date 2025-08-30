// REACT
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// MATERIAL UI
import { Typography, Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

// OTHERS
import { fetchPostDetails } from "./PostSlice";
import { addComment } from "./PostSlice";
import { Post } from "../../components/Post";
import { Loader } from "../../components/Loader";
import fallbackImage from "../../assets/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg";

export function PostDetails() {
  const { id } = useParams(); // Extracts the Author ID from URL
  const { postDetails } = useSelector((state) => state.posts);
  const { isLoading, isLoggedIn } = useSelector((state) => state.ui);
  const { commentsOfPost } = useSelector((state) => state.posts);
  const [addCommentToPost, setAddCommentToPost] = useState("");

  const navigate = useNavigate();

  const data = {
    id: id,
    body: addCommentToPost,
  };

  //   Handlers
  const handleAddComment = () => {
    dispatch(addComment(data));
    setAddCommentToPost("");
  };

  const commentsList = commentsOfPost.map((comment, index) => {
    return (
      <Stack
        key={index}
        style={{
          backgroundColor: "#b8bdc4",
          marginBottom: "10px",
          padding: "10px",
          borderRadius: "10px",
        }}
      >
        {/* Header */}
        <Stack
          direction="row"
          style={{ alignItems: "center", gap: "5px", cursor: "pointer" }}
          onClick={() => navigate(`/userprofile/${comment?.author?.id}`)}
        >
          <img
            src={
              typeof comment?.author?.profile_image === "string" &&
              comment.author.profile_image.trim() !== ""
                ? comment.author.profile_image
                : fallbackImage
            }
            alt="author_image"
            width={40}
            height={40}
            style={{ borderRadius: "50%" }}
          />
          {comment?.author?.username}
        </Stack>
        {/* End Header */}
        <p>{comment?.body}</p>
      </Stack>
    );
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPostDetails(id));
  }, []);

  return isLoading ? (
    <Loader isLoading={isLoading} />
  ) : (
    <>
      <Typography
        variant="h4"
        sx={{
          margin: "20px auto",
          textTransform: "capitalize",
          fontWeight: "bold",
        }}
      >
        {postDetails[0]?.author.username}'s Post
      </Typography>
      <Post items={postDetails}>
        {/* Comments */}
        <Stack style={{ justifyContent: "flex-start" }}>{commentsList}</Stack>
        {/* End Comments */}

        {/* Add Comment */}
        {isLoggedIn && (
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={1} // instead of gap for MUI Stack
            sx={{ marginTop: 2, marginBottom: 2 }}
          >
            <TextField
              id="outlined-basic"
              label="Add Comment"
              variant="outlined"
              value={addCommentToPost}
              onChange={(e) => setAddCommentToPost(e.target.value)}
              fullWidth
            />
            <Button
              variant="outlined"
              sx={{ padding: "16.5px 14px" }}
              onClick={handleAddComment}
            >
              Add
            </Button>
          </Stack>
        )}
        {/* End Add Comment */}
      </Post>
    </>
  );
}
