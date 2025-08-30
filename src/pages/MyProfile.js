// REACT
import { useDispatch, useSelector } from "react-redux";

// OTHERS
import { useEffect } from "react";
import { fetchPostOfUser } from "../features/posts/PostSlice";
import { Post } from "../components/Post";
import { Loader } from "../components/Loader";
import { ErrorPage } from "../../components/ErrorPage";
import { ProfileBox } from "../components/ProfileBox";

export function MyProfile() {
  const { userData } = useSelector((state) => state.auth);
  // Restructuring the userData to Make it Compatible With ProfileBox Component
  const userDataNewObj = {
    author: { ...userData },
    posts_count: userData?.posts_count,
    comments_count: userData?.comments_count,
  };
  const { itemsOfUser } = useSelector((state) => state.posts);
  const { isLoading, isLoggedIn } = useSelector((state) => state.ui);

  const dispatch = useDispatch();
  useEffect(() => {
    if (userData !== null) {
      dispatch(fetchPostOfUser(userData.id));
    }
  }, []);

  return isLoggedIn ? (
    !isLoading ? (
      <>
        <ProfileBox userData={userDataNewObj} />
        {/* Get Posts From Newer to Older */}
        <Post items={[...itemsOfUser].reverse()} />
      </>
    ) : (
      <Loader isLoading={isLoading} />
    )
  ) : (
    <ErrorPage />
  );
}
