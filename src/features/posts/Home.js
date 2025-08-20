// MATERIAL UI
import { Container } from "@mui/material";

// REACT
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "./PostSlice";

// COMPONENTS
import { Loader } from "../../components/Loader";
import { Post } from "./Posts";

export function Home() {
  let { status } = useSelector((state) => state.posts);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return status === "succeeded" ? (
    <Container maxWidth="md" sx={{ borderRadius: "8px", margin: "30px auto" }}>
      <Post />
    </Container>
  ) : (
    <Loader />
  );
}
