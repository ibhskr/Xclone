import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import defaultProfilePic from "../assets/defaultProfilePic.png";

const UserCard = ({ otherUser, user }) => {
  // otherUser => here we have array of name, username, and _id
  // user => here we have logged-in user details

  const [following, setFollowing] = useState(
    user?.following?.includes(otherUser._id)
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFollowUnfollow = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiEndpoint = `/api/users/${otherUser._id}/${
        following ? "unfollow" : "follow"
      }`;
      const response = await axios.post(apiEndpoint);
      const result = response.data;

      if (result.success) {
        toast.success(result.message);
        setFollowing(!following); // Toggle follow state
      } else {
        throw new Error("Internal server error");
      }
    } catch (err) {
      setError(err.message || "Internal server error");
      toast.error(err.message || "Internal server error");
    } finally {
      setLoading(false);
    }
  };
  if (error) {
    toast.error("Something went wrong");
    toast.success("We will redirect you to the home page");
    navigate("/");
  }

  return (
    <div className="flex items-center justify-between mb-4">
      <div
        onClick={() => navigate(`/profile/${otherUser?.username}`)}
        className="flex items-center hover:cursor-pointer"
      >
        <img
          src={otherUser?.profilePicture || defaultProfilePic}
          alt={`${otherUser?.name}'s avatar`}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <p className="text-white font-semibold">
            <span>{otherUser?.name}</span>
            {otherUser?.isVerified && (
              <span className="mt-px mx-1 ">
                <VerifiedIcon sx={{ fontSize: 16, color: "#3480eb" }} />
              </span>
            )}
          </p>
          <p className="text-gray-400">@{otherUser?.username}</p>
        </div>
      </div>
      <button
        disabled={loading}
        onClick={handleFollowUnfollow}
        className={` px-4 py-1 rounded-full ${
          following ? "bg-gray-400 text-black" : "bg-blue-500 text-white"
        } transition`}
      >
        {loading ? "Processing..." : following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default UserCard;
