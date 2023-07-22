import React from "react";

function CommentCard({ comment, author, createdAt }) {
  const theme = localStorage.getItem("theme");
  return (
    <>
      <div className={`flex flex-col p-2 rounded-md mt-2 ${
        theme === "dark" ? "bg-[#1e2d44]" : "bg-[#c1cdd7]"
      }`}>
        <div className="flex justify-between">
          <div className="font-semibold">{author}</div>
          {/* <div>Edit</div> */}
        </div>
        <div>{comment}</div>
        <div className="text-[10px] ml-auto">{createdAt}</div>
      </div>
    </>
  );
}

export default CommentCard;
