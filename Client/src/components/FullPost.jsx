import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import BarChartIcon from "@mui/icons-material/BarChart";
import Avatar from "@mui/material/Avatar";
import { Comment } from "./Post";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { timeAgo } from "calculate-time-date";
import VerifiedIcon from "@mui/icons-material/Verified";
import { useNavigate } from "react-router-dom";

function FullPost() {
  const user = useSelector((state) => state.users.user);
  const { tweet_id } = useParams();
  const [tweet, setTweet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [liked, setLiked] = useState(user?.likes?.includes(tweet_id)); //base on this we show coloe of icon
  const [likeLength, setLikeLength] = useState(0);
  const [replies, setReplies] = useState([]);
  const timeDate = timeAgo(tweet?.createdAt);
  // const createAtReplies = timeAgo(replies?.createdAt);
  const navigate = useNavigate();
  // Fetch the post on mount
  useEffect(() => {
    const fetchTweet = async () => {
      try {
        const response = await axios.get(`/api/tweets/${tweet_id}`);
        const tweetData = response.data.data;
        setTweet(tweetData);
        setReplies(tweetData.comments || []);
        setLiked(user?.likes?.includes(tweet_id));
        setLikeLength(tweetData.likes?.length || 0);
      } catch (err) {
        console.error("Failed to fetch tweet:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTweet();
  }, [tweet_id, user?.likes]);

  // Perform like/dislike action
  const likeDislike = useCallback(async () => {
    try {
      const res = await axios.patch(`/api/tweets/${tweet_id}/like`);
      if (res.data.success) {
        toast.success(res.data.message);
        // setLiked(!liked);
        setLikeLength(res.data.newLength);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  }, [tweet_id]);

  // Render loading or error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong...</p>;
  if (!tweet) return <p>No tweet found.</p>;

  return (
    <div className="p-4 sm:border-x border-gray-600 text-white shadow-lg max-w-xl mx-auto">
      {/* Header: User Info */}
      <div
        onClick={() => navigate(`/profile/${tweet.author?.username}`)}
        className="flex items-center mb-4"
      >
        <Avatar
          alt={tweet.author?.name}
          src={tweet.author?.profileImage} // Assuming profileImage field exists
          sx={{ width: 50, height: 50 }}
        />
        <div className="ml-3">
          <p className="font-semibold text-lg">{tweet.author?.name}</p>
          <p className="text-gray-400">@{tweet.author?.username}</p>
          <p className="text-gray-400 text-xs">{timeDate}</p>
        </div>
      </div>

      {/* Tweet Content */}
      <p className="text-gray-200 mb-4">{tweet.content}</p>

      {/* Tweet Metrics */}
      <div className="flex flex-row justify-between items-center text-gray-500 mb-4">
        <span className="flex items-center hover:cursor-pointer">
          <ChatBubbleOutlineIcon sx={{ fontSize: 20 }} />
          <span className="ml-1">{tweet.comments?.length || 0}</span>
        </span>
        <span
          onClick={() => {
            likeDislike(), setLiked(!liked);
          }}
          className={
            liked
              ? "text-red-600 flex items-center hover:cursor-pointer"
              : "flex items-center hover:cursor-pointer"
          }
        >
          <FavoriteBorderIcon sx={{ fontSize: 20 }} />
          <span className="ml-1">{likeLength}</span>
        </span>
        <span className="flex items-center hover:cursor-pointer">
          <ShareIcon sx={{ fontSize: 20 }} />
          <span className="ml-1">{tweet.share?.length || 0}</span>
        </span>
        <span className="flex items-center hover:cursor-pointer">
          <BarChartIcon sx={{ fontSize: 20 }} /> {tweet.reach || 0}
        </span>
      </div>

      {/* Comment Section */}
      <Comment tweet_id={tweet._id} />

      {/* Replies */}
      <div className="mt-4">
        {replies.length > 0 ? (
          replies.map((reply, index) => (
            <div key={index} className="my-6">
              <div className="flex items-start mb-4">
                {/* Avatar */}
                <Avatar
                  alt={reply.author?.name}
                  src={reply.author?.profileImage}
                  sx={{ width: 40, height: 40 }}
                />

                {/* Reply Content */}
                <div className="ml-3">
                  {/* Author Info */}
                  <p
                    onClick={() =>
                      navigate(`/profile/${reply.author?.username}`)
                    }
                    className="font-semibold text-gray-300 flex items-center "
                  >
                    <span className="flex items-center">
                      {" "}
                      {reply.author?.name}
                      {reply.author?.isVerified && (
                        <VerifiedIcon
                          sx={{ fontSize: 16, color: "#3480eb" }}
                          aria-label="Verified account"
                        />
                      )}
                    </span>
                    <span className="ml-1 text-gray-400 text-sm">
                      @{reply.author?.username}
                    </span>
                  </p>

                  {/* Timestamp */}
                  <span className="text-xs text-gray-400">
                    {timeAgo(reply?.createdAt)}
                  </span>

                  {/* Reply Text */}
                  <p className="text-gray-300 mt-2">{reply.content}</p>
                </div>
              </div>

              {/* Divider */}
              <hr className="border-gray-700 mt-4" />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No replies yet.</p>
        )}
      </div>
    </div>
  );
}

export default FullPost;
