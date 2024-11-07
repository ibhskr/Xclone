import axios from "axios";
import { useEffect, useState } from "react";
const getUsers = (name = "random") => {
  const [usersList, setUsersList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/users/?name=${name}`);
        setUsersList(response.data.users);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [name]);

  return { usersList, loading, error };
};

export default getUsers;
