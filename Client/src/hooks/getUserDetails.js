import axios from "axios";
import { useEffect, useState } from "react";

const getUserDetails = (username) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const user = await axios.get(`/api/users/${username}`);
        setUser(user.data.user);
        // console.log(user.data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [username]);
  return { user, loading, error };
};
export default getUserDetails;
