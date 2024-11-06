import axios from "axios";
import { useEffect, useState } from "react";

const useConnectedUser = (username, query) => {
  const [users, setUsers] = useState(null); // Setting initial state to null
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // useing useEffect call apis base on query => followers/ following
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/users/${username}/${query}`);
        setUsers(response.data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [username, query]);
  // console.log(users);
  return { users, loading, error };
};

export default useConnectedUser;
