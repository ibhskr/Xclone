import React from "react";
import Post from "./Post";

function Replies({ replies }) {
  console.log(replies);
  return (
    <div>
      <Post tweet={replies.tweet} replies={replies} />
      {/* <p>{replies.content}</p> */}
    </div>
  );
}

export default Replies;
