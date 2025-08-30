// REACT
import { useSelector } from "react-redux";

//OTHERS
import { Post } from "../../components/Post";

export function Posts() {
  let { items } = useSelector((state) => state.posts);
  return (
    <>
      <Post items={items} />
    </>
  );
}
