import axios from "axios";
import { useEffect, useState } from "react";

const getFullPost = ({ tweet_id }) => {
  const [tweet, setTweet] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // console.log(tweet_id);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/tweets/${tweet_id}`);
        setTweet(response.data.data);
        // console.log(user.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [tweet_id]);
  return { tweet, loading, error };
};
export default getFullPost;
