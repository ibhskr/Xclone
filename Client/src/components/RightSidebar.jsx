import { useState } from "react";
import getUsers from "../hooks/getUsers";

import { useSelector, useDispatch } from "react-redux";
import UserCard from "./UserCard";
const RightSidebar = () => {
  // const refresh = useSelector((state) => state.refresh);
  const user = useSelector((state) => state.users.user);
  const { usersList, loading, error } = getUsers(); // Get the list of users

  return (
    <div className="flex flex-col  space-y-6 bg-black text-gray-300 overflow-y-scroll">
      {/* Trending/What's happening section */}
      <div className="hidden sm:block bg-gray-900 rounded-lg p-4 shadow">
        <h3 className="text-lg font-semibold mb-4">What's happening</h3>
        <div className="flex items-center mb-3">
          <img
            src="https://via.placeholder.com/40"
            alt="event"
            className="w-10 h-10 rounded-full mr-3"
          />
          <p className="text-sm text-gray-400">The Offseason - Event • LIVE</p>
        </div>
        <p className="text-gray-300">#gxrworld</p>
        <p className="text-gray-300">Barca</p>
        <p className="text-gray-300">#Samsung</p>
        <p className="text-gray-300">Iran</p>
        <button className="text-blue-400 mt-3">Show more</button>
      </div>

      {/* Who to follow section */}
      <div className="bg-gray-900 rounded-lg p-4 shadow">
        <h2 className="text-white text-xl mb-4">Who to follow</h2>
        {/* Display only 5 users */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          Array.isArray(usersList) &&
          user && // Check if user is defined
          usersList
            .filter((otherUser) => otherUser._id !== user._id) // Avoid comparing array with includes on _id
            .filter((otherUser) => !user.following.includes(otherUser._id))
            .slice(0, 5)
            .map((otherUser) => (
              <UserCard key={otherUser._id} otherUser={otherUser} />
            ))
        )}

        {error && <p>Error: {error.message}</p>}
      </div>
    </div>
  );
};

export default RightSidebar;
