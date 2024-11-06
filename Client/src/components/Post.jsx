import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import BarChartIcon from "@mui/icons-material/BarChart";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { timeAgo } from "calculate-time-date";
import { useNavigate } from "react-router-dom";
import VerifiedIcon from "@mui/icons-material/Verified";
import defaultProfilePic from "../assets/defaultProfilePic.png";

const Post = ({ tweet, replies = null }) => {
  const user = useSelector((state) => state.users.user);
  const navigate = useNavigate();
  const [liked, setLiked] = useState(user?.likes?.includes(tweet._id));
  // console.log(liked);
  const [likeLength, setLikeLength] = useState(tweet.likes.length);
  const [showReplyModal, setShowReplyModal] = useState(false);
  // console.log(tweet);
  const timeDate = timeAgo(tweet?.createdAt);
  const createAtReplies = timeAgo(replies?.createdAt);
  // console.log(replies);
  const toggleReplyModal = () => {
    setShowReplyModal(!showReplyModal);
  };

  const likeDislike = async () => {
    try {
      const res = await axios.patch(`/api/tweets/${tweet._id}/like`);
      if (res.data.success) {
        toast.success(res.data.message);
        // setLiked(!liked);
        setLikeLength(res.data.newLength); // Update the like count from the response
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  return (
    <div className="flex flex-col mb-4 p-4 bg-gray-900 rounded-lg w-full">
      <div className="flex ">
        {/*  ---------
        --- display post ------
        --------  */}
        <div className="flex flex-col items-center flex-shrink-0">
          <img
            src={tweet?.author?.profilePicture || defaultProfilePic}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          {replies != null && (
            <div className="w-px h-full bg-gray-300 mt-2"></div>
          )}
        </div>
        <div className="flex flex-col ml-4 flex-grow ">
          <div className="flex items-center space-x-3 mb-2">
            <div>
              <p
                onClick={() => navigate(`/profile/${tweet.author.username}`)}
                className="font-semibold text-white hover:cursor-pointer"
              >
                <span>{tweet.author.name}</span>
                {tweet?.author?.isVerified && (
                  <span className="mt-px mx-1">
                    <VerifiedIcon sx={{ fontSize: 16, color: "#3480eb" }} />
                  </span>
                )}
              </p>

              <p className="text-sm text-gray-500">
                @{tweet.author.username} • {timeDate}
              </p>
            </div>
          </div>
          <p
            onClick={() => navigate(`/tweet/${tweet._id}`)}
            className="text-gray-300 mb-2"
          >
            {tweet.content}
          </p>

          <div className="flex flex-row w-full justify-between items-center text-gray-500">
            {/* ------
----------Toggle reply field-------
---------- */}
            <span
              onClick={() => toggleReplyModal()}
              className="hover:cursor-pointer hover:shadow-lg  transition-all duration-300"
            >
              <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} />
              {tweet.comments.length}
            </span>
            <span
              onClick={() => {
                likeDislike(), setLiked(!liked);
              }}
              // onClick={}
              className={
                liked
                  ? "text-red-600  hover:cursor-pointer "
                  : "hover:cursor-pointer "
              }
            >
              <FavoriteBorderIcon sx={{ fontSize: 18 }} />
              {likeLength}
            </span>
            <span className="hover:cursor-pointer">
              <ShareIcon sx={{ fontSize: 18 }} />
              {tweet?.share?.length}
            </span>
            <span className="hover:cursor-pointer">
              <BarChartIcon sx={{ fontSize: 18 }} />
              {tweet?.reach}
            </span>
          </div>
        </div>
      </div>

      {/* Display replies */}
      {replies != null && (
        <div className="flex pt-4">
          <div className="flex flex-col items-center flex-shrink-0">
            <img
              src="https://via.placeholder.com/40"
              alt="profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
          <div className="flex flex-col ml-4 flex-grow ">
            <div className="flex items-center space-x-3 mb-2">
              <div>
                <p className="font-semibold text-white">
                  <span>{replies?.author?.name}</span>
                  {replies?.author?.isVerified && (
                    <span className="mt-px mx-1">
                      <VerifiedIcon sx={{ fontSize: 16, color: "#3480eb" }} />
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-500">
                  @{replies?.author?.username} • {createAtReplies}
                </p>
              </div>
            </div>
            <p className="text-gray-300 mb-2">{replies?.content}</p>
          </div>
        </div>
      )}

      {/*  Reply model popup window */}
      {/* inset-0 means top bottom left right=0 */}
      {showReplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-70">
          <div className="bg-black p-6 rounded-lg w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white">Reply to @{tweet.author.username}</h2>
              <button
                onClick={toggleReplyModal}
                className="text-gray-400 hover:text-gray-100"
              >
                &times;
              </button>
            </div>
            <p className="text-gray-400 mb-4">{tweet.content}</p>
            <Comment tweet_id={tweet._id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;

export const Comment = ({ tweet_id }) => {
  // console.log(tweet_id);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      let res = await axios.post(`/api/tweets/${tweet_id}/comment`, data);
      console.log(res.data);
      if (res.data.success) {
        toast.success(res.data.message);
        reset();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border-b border-gray-700 mb-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea
          {...register("content", { required: true })}
          className="w-full outline-none bg-black text-white border border-gray-600 p-2 rounded resize-none"
          placeholder="What is happening?!"
        />
        {errors.content && (
          <span className="text-red-500 text-xs">*This field is required.</span>
        )}
        <div className="flex justify-end my-2">
          <button
            disabled={loading}
            type="submit"
            className="bg-blue-500 text-white py-1 px-4 rounded-full"
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </form>
    </div>
  );
};

// export default CreatePost;
