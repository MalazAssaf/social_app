import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container } from "@mui/material";

import { Loader } from "./Loader";
import { Posts } from "../features/posts/Posts";
import { AddPost } from "../features/posts/AddPost";
import { fetchPosts, fetchPostOfUser } from "../features/posts/PostSlice";

export function Home() {
  const dispatch = useDispatch();
  const { isLoading, isLoggedIn } = useSelector((state) => state.ui);
  const { items, page, totalPages, status } = useSelector(
    (state) => state.posts
  );
  const { userData } = useSelector((state) => state.auth);
  // Load first page of posts on mount
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchPosts({ page: 1, limit: 5 }));
    }
  }, [dispatch]);

  // Load logged-in user's posts
  useEffect(() => {
    if (userData?.id) {
      dispatch(fetchPostOfUser(userData.id));
    }
  }, [dispatch, userData]);

  // Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop + 100 >=
          document.documentElement.scrollHeight &&
        status !== "loading" &&
        page < totalPages
      ) {
        // Load More Posts
        dispatch(fetchPosts({ page: page + 1, limit: 5 }));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, totalPages, status, dispatch]);

  return (
    <Container
      maxWidth="md"
      sx={{ borderRadius: "8px", margin: "30px auto", padding: "0 !important" }}
    >
      {isLoggedIn && <AddPost />}
      <Posts />
      {/* Show Loader */}
      {status === "loading" && <Loader isLoading={isLoading} />}
    </Container>
  );
}
