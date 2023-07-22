import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatDate } from "../utils";
import { useSelector } from "react-redux";

function CommentCard({ comment, handleDelete }) {
  const theme = localStorage.getItem("theme");
  const currentUser = useSelector((state) => state.user.value);

  return (
    <>
      <div
        className={`flex flex-col p-2 rounded-md mt-2 ${
          theme === "dark" ? "bg-[#1e2d44]" : "bg-[#c1cdd7]"
        }`}
      >
        <div className="flex justify-between">
          <div className="font-semibold">{comment.author.name}</div>
          {comment.author._id === currentUser.id && (
            <div
              className="hover:bg-white/40 cursor-pointer rounded-md px-1"
              onClick={() => handleDelete(comment._id)}
            >
              <DeleteIcon className="!w-4 !h-4" />
            </div>
          )}
        </div>
        <div>{comment.text}</div>
        <div className="text-[10px] ml-auto">
          {formatDate(comment.createdAt)}
        </div>
      </div>
    </>
  );
}

export default CommentCard;
