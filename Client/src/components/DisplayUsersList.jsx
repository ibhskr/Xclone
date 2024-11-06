import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useConnectedUser from "../hooks/getConnectedUsers";
import UserCard from "./UserCard";
import { useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
function DisplayUsersList() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.user);
  const { username, query } = useParams();
  const [usersList, setUserList] = useState(null);
  const { users, loading, error } = useConnectedUser(username, query);

  // console.log(usersList);

  useEffect(() => {
    if (users) {
      if (query === "following") {
        setUserList(users.following.following);
      } else if (query === "followers") {
        setUserList(users.followers.followers);
      }
    }
  }, [users, query]);

  if (error) return <p>Something went wrong...</p>;

  return (
    <div>
      <div className="flex items-center ">
        <button
          onClick={() => navigate(-1)}
          className="hover:bg-gray-800 rounded-full hover:cursor-pointer"
        >
          <ArrowBackIcon />
        </button>

        <h1 className="py-4 text-xl font-bold mx-4">{query}</h1>
      </div>
      <hr />
      <div className="mt-4">
        {loading ? (
          <div className="w-full flex justify-center">
            <CircularProgress />
          </div>
        ) : (
          usersList?.map((users, index) => (
            <UserCard key={index} otherUser={users} user={user} />
          ))
        )}
      </div>
    </div>
  );
}

export default DisplayUsersList;
