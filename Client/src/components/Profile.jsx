import React, { useState } from "react";
import Post from "./Post";
import axios from "axios";
import { FaMapMarkerAlt, FaUserFriends, FaCalendarAlt } from "react-icons/fa";
import getUserDetails from "../hooks/getUserDetails";
import { useParams, useNavigate } from "react-router-dom";
import Replies from "./Replies";
import { useSelector } from "react-redux";
import VerifiedIcon from "@mui/icons-material/Verified";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";
import defaultCoverImg from "../assets/defaultCoverImg.jpg";
import defaultProfilePic from "../assets/defaultProfilePic.png";
//
const Profile = () => {
  const userDetails = useSelector((state) => state.users.user);
  const [feature, setFeature] = useState("posts");
  const { username } = useParams();
  const navigate = useNavigate();
  const { user, loading, error } = getUserDetails(username);
  const [followingStatus, setFollowingStatus] = useState(
    userDetails.following.includes(user?._id)
  );
  // console.log(followingStatus);
  const handleFollowUnfollow = async () => {
    try {
      const apiEndpoint = `/api/users/${user._id}/${
        followingStatus ? "unfollow" : "follow"
      }`;
      const response = await axios.post(apiEndpoint);
      const result = response.data;

      if (result.success) {
        toast.success(result.message);
        setFollowingStatus(!followingStatus); // Toggle follow state
      } else {
        throw new Error("Internal server error");
      }
    } catch (err) {
      // setError(err.message || "Internal server error");
      toast.error(err.message || "Internal server error");
    }
  };
  if (loading) {
    return (
      <div className="w-full flex justify-center">
        <CircularProgress />
      </div>
    );
  }
  if (error)
    return (
      <p className="text-gray-400">Something went wrong. Try reloading.</p>
    );

  return (
    <div className="w-full overflow-y-scroll text-white">
      {/* Banner Section */}
      <div className="relative">
        <img
          src={user?.coverPicture || defaultCoverImg}
          className="w-full h-48 object-cover "
        />
        <div className="absolute -bottom-10 left-4">
          <img
            src={user?.profilePicture || defaultProfilePic}
            className="w-20 h-20 object-cover rounded-full border-4 border-black"
          />
        </div>
      </div>
      {/* Profile Info */}
      <div className="pt-14 px-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-1  mt-2">
              <h1 className="text-xl font-bold">{user?.name}</h1>
              {user?.isVerified && (
                <span className="mt-px ">
                  <VerifiedIcon sx={{ fontSize: 22, color: "#3480eb" }} />
                </span>
              )}
            </div>
            <p className="text-gray-500">@{user?.username}</p>
          </div>
          {userDetails._id === user._id ? (
            <button
              onClick={() => navigate("edit")}
              className="bg-black border border-gray-500 text-sm px-4 py-1 rounded-full hover:bg-gray-800"
            >
              Edit Profile
            </button>
          ) : followingStatus ? ( // Check if userDetails.followers includes user._id
            <button
              onClick={() => handleFollowUnfollow()}
              className="border border-gray-500 text-sm px-4 py-1 rounded-full"
            >
              Unfollow
            </button>
          ) : (
            <button
              onClick={() => handleFollowUnfollow()}
              className="bg-blue-800 border text-sm px-4 py-1 rounded-full"
            >
              Follow
            </button>
          )}
        </div>

        <div className="mt-3 text-gray-400 space-y-1">
          <p>{user?.bio}</p>
          <div className="flex flex-wrap">
            {user?.profession && (
              <span className="flex items-center mr-3 last:mr-0 mb-2 space-x-1">
                <FaUserFriends aria-label="Profession Icon" />
                <p>{user?.profession}</p>
              </span>
            )}
            {user?.location && (
              <span className="flex items-center mr-3 last:mr-0 mb-2 space-x-1">
                <FaMapMarkerAlt aria-label="Location Icon" />
                <p>{user?.location}</p>
              </span>
            )}
            {user?.createdAt && (
              <span className="flex items-center mr-3 last:mr-0 mb-2 space-x-1">
                <FaCalendarAlt aria-label="Calendar Icon" />
                <p>Joined: {new Date(user?.createdAt).toLocaleDateString()}</p>
                {/* Formats date */}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <p
            className="hover:cursor-pointer"
            onClick={() => navigate(`/${user?.username}/following`)}
          >
            <span className="font-bold text-white">
              {user?.following?.length}
            </span>
            Following
          </p>
          <p
            className="hover:cursor-pointer"
            onClick={() => navigate(`/${user?.username}/followers`)}
          >
            <span className="font-bold text-white">
              {user?.followers?.length}
            </span>
            Followers
          </p>
        </div>
      </div>
      {/* Tabs Section */}
      <div className="mt-2 border-b border-gray-700 px-4 mb-4">
        <nav className="flex space-x-6 text-gray-500">
          {["posts", "replies", "likes"].map((tab) => (
            <button
              key={tab}
              onClick={() => setFeature(tab)}
              className={
                feature === tab
                  ? "py-2 text-white border-b-2 border-blue-500"
                  : "py-2 hover:text-white"
              }
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </div>

      {/* Content Section */}
      {feature === "posts" &&
        user?.tweets?.map((tweet, index) => <Post key={index} tweet={tweet} />)}
      {feature === "replies" &&
        user?.comments?.map((replies, index) => (
          <Replies key={index} replies={replies} />
        ))}
      {feature === "likes" && (
        <div className="text-center text-gray-400 mt-4">
          <p>No liked posts to display.</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
