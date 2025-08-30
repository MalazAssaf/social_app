// MATERIAL UI
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Stack, Typography } from "@mui/material";

// OTHERS
import fallbackImage from "../assets/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg";

export function ProfileBox({ userData }) {
  if (!userData) {
    return null; // Do Not Render Anything If No Data
  }

  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          boxShadow: "7px 3px 15px 10px #e3dff1",
          background: "white",
          borderRadius: "8px",
          padding: "10px",
          marginTop: "20px",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {/* Profile Image */}
            <Grid size={{ xs: 12, md: 4 }} className="center-grid">
              <img
                src={
                  typeof userData.author?.profile_image === "string" &&
                  userData.author.profile_image.trim() !== ""
                    ? userData.author.profile_image
                    : fallbackImage
                }
                style={{ borderRadius: "50%" }}
                alt="profile_image"
                width={100}
                height={100}
              />
            </Grid>

            {/* User Info */}
            <Grid size={{ xs: 12, md: 4 }} className="center-grid">
              <Stack
                alignItems={"flex-start"}
                justifyContent={"center"}
                spacing={1}
                height={"100%"}
              >
                <Typography>
                  {userData.author?.email !== null
                    ? userData.author?.email
                    : "No Email"}
                </Typography>
                <Typography>{userData.author?.name}</Typography>
                <Typography>{userData.author?.username}</Typography>
              </Stack>
            </Grid>

            {/* Posts and Comments Count */}
            <Grid size={{ xs: 12, md: 4 }} className="center-grid">
              <Stack height={"100%"} justifyContent={"center"}>
                <Stack direction={"row"} sx={{ alignItems: "center" }}>
                  <Typography
                    variant="h4"
                    display={"inline"}
                    fontWeight={"bold"}
                  >
                    {userData?.posts_count}
                  </Typography>
                  <Stack height={"60%"} justifyContent={"flex-end"}>
                    <span style={{ color: "#cdcdcd", fontSize: "12px" }}>
                      Posts
                    </span>
                  </Stack>
                </Stack>
                <Stack direction={"row"} sx={{ alignItems: "center" }}>
                  <Typography
                    variant="h4"
                    display={"inline"}
                    fontWeight={"bold"}
                  >
                    {userData?.comments_count}
                  </Typography>
                  <Stack height={"60%"} justifyContent={"flex-end"}>
                    <span style={{ color: "#cdcdcd", fontSize: "12px" }}>
                      Comments
                    </span>
                  </Stack>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Responsive Username Title */}
      <Typography
        variant="h4"
        fontWeight={"bold"}
        sx={{
          margin: { xs: "20px 0", sm: "30px 0", md: "50px 0" },
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
        }}
      >
        {userData.posts_count > 0
          ? `${userData.author?.username}'s posts`
          : "The User Has Not Posted Yet!"}
      </Typography>
    </>
  );
}
