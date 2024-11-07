import { useEffect, useState } from "react";
import Post from "./Post";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CreatePost from "./CreatePost";
import CircularProgress from "@mui/material/CircularProgress";

const Feed = () => {
  const [following, setFollowing] = useState(false);
  const [tweets, setTweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        setLoading(true);
        setError(false);
        const res = await axios.get(`/api/tweets?following=${following}`);
        setTweets(res.data.tweets);
      } catch (error) {
        console.error("Failed to fetch tweets:", error.message);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchTweets();
  }, [following]); // Re-fetch tweets when forYou changes

  if (error) {
    navigate("/register");
    // console.log(error);
  } else {
    return (
      <div className="flex flex-col w-full py-2 bg-black text-white overflow-y-scroll">
        <div className="flex items-center space-x-4 mb-4 border-b border-gray-700 pb-2">
          <button
            onClick={() => setFollowing(false)}
            className={`text-lg font-semibold ${
              !following ? "text-blue-400" : "text-gray-400"
            }`}
          >
            For You
          </button>
          <button
            onClick={() => setFollowing(true)}
            className={`text-lg font-semibold ${
              following ? "text-blue-400" : "text-gray-400"
            }`}
          >
            Following
          </button>
        </div>
        <CreatePost />

        {loading && (
          <div className="w-full flex justify-center">
            <CircularProgress />
          </div>
        )}
        {error && (
          <p className="text-red-500">
            Failed to load tweets. Please try again later.
          </p>
        )}
        {tweets.length == 0 && <p>No Tweet found !</p>}
        <div>
          {tweets.map((tweet) => (
            <Post key={tweet._id} tweet={tweet} />
          ))}
        </div>
      </div>
    );
  }
};

export default Feed;
