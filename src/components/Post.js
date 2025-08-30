// MATERIAL UI
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Container, Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import CreateIcon from "@mui/icons-material/Create";

// REACT
import { useSelector } from "react-redux";

// OTHERS
import fallbackImage from "../assets/pexels-souvenirpixels-417074.jpg";
import { PostModification } from "../features/posts/PostModification";
import { Link } from "react-router-dom";

export function Post({ items, children }) {
  const { userData } = useSelector((state) => state.auth);
  let userId = userData !== null ? userData.id : null;

  if (!items || !Array.isArray(items)) {
    return <p>No posts available</p>;
  }

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          borderRadius: "8px",
          margin: "30px auto",
          padding: "0 !important",
        }}
      >
        {items.map((post) => (
          <Card key={post.id} sx={{ margin: "50px 0", padding: "0px 1rem" }}>
            <Stack
              direction="row"
              sx={{ alignItems: "center", justifyContent: "space-between" }}
            >
              {/* Head of Post */}
              <Link
                to={`/userprofile/${post.author.id}`}
                style={{
                  textDecoration: "none",
                }}
              >
                <Stack
                  direction={"row"}
                  sx={{
                    alignItems: "center",
                    textTransform: "capitalize",
                  }}
                >
                  <CardHeader
                    sx={{ padding: "10px 0" }}
                    avatar={
                      <Avatar
                        sx={{ bgcolor: red[500] }}
                        aria-label="recipe"
                        src={post.author.profile_image}
                      />
                    }
                    title={post.author.name}
                    slotProps={{
                      title: {
                        sx: { fontWeight: 900, color: "black", fontSize: 20 },
                      },
                    }}
                  />
                </Stack>
              </Link>
              {/* EndHead of Post */}

              {/* Show Edit and Delete Buttons if the User Created Them */}
              {userId === post.author.id && (
                <PostModification postId={post.id} />
              )}
            </Stack>

            <Divider sx={{ margin: "5px 0" }} />
            <Link
              to={`/postdetails/${post.id}`}
              style={{
                textDecoration: "none",
                color: "black",
              }}
            >
              <Stack sx={{ textAlign: "left" }}>
                <img
                  src={
                    typeof post.image === "string" && post.image.trim() !== ""
                      ? post.image
                      : fallbackImage
                  }
                  alt="Post-image"
                  style={{ maxWidth: "100%", height: "300px" }}
                />
                <p style={{ color: "rgba(0, 0, 0, .5)" }}>{post.created_at}</p>
                <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
                  {post.title}
                </Typography>
                <p style={{ fontSize: "16px", fontWeight: "400" }}>
                  {post.body}
                </p>
                <Divider />
                <Stack
                  direction="row"
                  sx={{ alignItems: "center", margin: "10px 0" }}
                  spacing={1}
                >
                  <CreateIcon />
                  <p>{post.comments_count} Comments</p>
                </Stack>
                <Stack>{children}</Stack>
              </Stack>
            </Link>
          </Card>
        ))}
      </Container>
    </>
  );
}
