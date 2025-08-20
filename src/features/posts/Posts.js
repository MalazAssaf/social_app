// MATERIAL UI
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import { Stack, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import CreateIcon from "@mui/icons-material/Create";
import { useSelector } from "react-redux";
import fallbackImage from "../../assets/pexels-souvenirpixels-417074.jpg";

export function Post() {
  let { items } = useSelector((state) => state.posts);
  return (
    <>
      {items.map((post) => (
        <Card key={post.id} sx={{ margin: "50px 0", padding: "0px 1rem" }}>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <CardHeader
              sx={{ padding: "10px 0" }}
              avatar={
                <Avatar
                  sx={{ bgcolor: red[500] }}
                  aria-label="recipe"
                  src={post.author.profile_image}
                />
              }
            />
            <p>{post.author.name}</p>
          </Stack>
          <Divider sx={{ margin: "5px 0" }} />
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
            <p style={{ fontSize: "16px", fontWeight: "400" }}>{post.body}</p>
            <Divider />
            <Stack
              direction="row"
              sx={{ alignItems: "center", margin: "10px 0" }}
              spacing={1}
            >
              <CreateIcon />
              <p>{post.comments_count} Comments</p>
            </Stack>
          </Stack>
        </Card>
      ))}
    </>
  );
}
