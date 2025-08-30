// REACT
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// OTHERS
import { fetchPostOfUser } from "../features/posts/PostSlice";
import { Post } from "../components/Post";
import { ProfileBox } from "../components/ProfileBox";
import { fetchUserInfo } from "../features/users/UserSlice";
import { Loader } from "../components/Loader";

export function OthersProfile() {
  const { id } = useParams(); // Extracts the Author ID from URL
  const { itemsOfUser, stateOfFetchingUsersPost } = useSelector(
    (state) => state.posts
  );
  const { accountDetails } = useSelector((state) => state.posts);
  const { userInfo, state } = useSelector((state) => state.user);
  const posts_count = userInfo !== null ? userInfo.posts_count : 0;
  const comments_count = userInfo !== null ? userInfo.comments_count : 0;
  // Restructuring the userData to Make it Compatible With ProfileBox Component
  const userData = {
    ...accountDetails,
    posts_count,
    comments_count,
  };

  // A Special Case of Loader Since the 2 Requests Have to be Succeeded!
  const isSucceeded =
    stateOfFetchingUsersPost === "succeeded" && state === "succeeded";

  const dispatch = useDispatch();
  useEffect(() => {
    if (id !== null) {
      dispatch(fetchPostOfUser(id));
      dispatch(fetchUserInfo(id));
    }
  }, []);
  return isSucceeded ? (
    <>
      <ProfileBox userData={userData} />
      <Post items={[...itemsOfUser].reverse()} />
    </>
  ) : (
    <Loader isLoading={!isSucceeded} />
  );
}
