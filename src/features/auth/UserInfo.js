import { useSelector } from "react-redux";
import fallbackImage from "../../assets/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg";

export function UserInfo() {
  const { userData } = useSelector((state) => state.auth);
  if (!userData) {
    return null;
  }
  return (
    <>
      <img
        src={
          typeof userData.profile_image === "string" &&
          userData.profile_image !== ""
            ? userData.profile_image
            : fallbackImage
        }
        height={40}
        width={40}
        alt="profile_image"
        style={{ borderRadius: "50%" }}
      ></img>
      <p style={{ fontWeight: "bold" }}>{userData.username}</p>
    </>
  );
}
