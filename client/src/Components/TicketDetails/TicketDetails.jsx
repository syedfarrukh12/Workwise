import { Backdrop, Divider, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowTask, setShowTicket } from "../../redux/nonPersistant";
import {
  TaskPriority,
  camelCaseToSentenceCase,
  formatDate,
  getInitials,
} from "../utils";
import EditIcon from "@mui/icons-material/Edit";
import CommentCard from "../Comment/CommentCard";
import axios from "axios";
import { API_URL } from "../Common/apiConfig";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg"; // Import Editor from react-draft-wysiwyg
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

function TicketDetails() {
  const theme = localStorage.getItem("theme");
  const dispatch = useDispatch();
  const selectedTask = useSelector((state) => state.nonPersistant.selectedTask);
  const currentUser = useSelector((state) => state.user.value);
  const [comments, setComments] = useState([]);
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );
  const [addComment, setAddComment] = useState(false);

  const getTextFromEditor = () => {
    const contentState = editorState.getCurrentContent();
    const rawContentState = convertToRaw(contentState);
    const text = rawContentState.blocks.map((block) => block.text).join("\n");
    return text;
  };

  const editor = React.useRef(null);
  useEffect(() => {
    axios
      .get(`${API_URL}/comments/${selectedTask._id}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    //eslint-disable-next-line
  }, []);

  const handleComment = () => {
    setEditorState(EditorState.createEmpty());
    setAddComment(false);
    const comment = {
      text: getTextFromEditor(),
      author: currentUser.id,
      task: selectedTask._id,
    };
    axios
      .post(`${API_URL}/comment`, comment)
      .then((res) => {
        setComments((prev) => [...prev, res.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Backdrop
        onClick={() => {
          dispatch(setShowTask(false));
        }}
        open={true}
        style={{ zIndex: 30 }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`w-full lg:w-[70%] max-h-full lg:max-h-[80vh] p-3 rounded-lg shadow-lg overflow-auto ${
            theme === "dark" ? "bg-[#27374D]" : "bg-[#DDE6ED]"
          }`}
        >
          <div
            onClick={() => {
              dispatch(setShowTask(false));
            }}
            className="p-1 cursor-pointer hover:bg-black/10 w-fit rounded-full ml-auto"
          >
            <CloseIcon className="!h-5 !w-5" />
          </div>
          <div className={`flex flex-col lg:flex-row`}>
            <div
              className="flex flex-col w-full lg:w-[70%] h-72 pr-4"
              name="main"
            >
              {selectedTask.assignee.map((item) => (
                <div className="w-fit">
                  <Tooltip title={item.name}>
                    <span className=" p-2 rounded-full bg-red-400 cursor-default">
                      {getInitials(item.name)}
                    </span>
                  </Tooltip>
                </div>
              ))}

              <div className="flex justify-between !mt-5 bg-black/20 p-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div>
                    {selectedTask.visible ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </div>
                  <div>
                    <div
                      className={`rounded-full px-2 border-2 ${
                        selectedTask.priority === TaskPriority.Low
                          ? "text-[#388E3C] border-[#388E3C]"
                          : selectedTask.priority === TaskPriority.Medium
                          ? "text-[#FFEB3B] border-[#FFEB3B]"
                          : selectedTask.priority === TaskPriority.High
                          ? "text-[#FF9800] border-[#FF9800]"
                          : "text-[#F44336] border-[#F44336]"
                      }`}
                    >
                      {camelCaseToSentenceCase(selectedTask.priority)}
                    </div>
                  </div>
                </div>
                <div className="font-semibold">
                  {camelCaseToSentenceCase(selectedTask.status)}
                </div>
              </div>

              <div className=" flex justify-between !mt-5">
                <div className="text-xl font-semibold">{selectedTask.name}</div>
                <div
                  onClick={() => {
                    dispatch(setShowTask(false));
                    dispatch(setShowTicket({ value: true, type: "edit" }));
                  }}
                  className="p-1 cursor-pointer hover:bg-black/10 h-fit w-fit
                  rounded-full"
                >
                  <EditIcon className="!h-5 !w-5" />
                </div>
              </div>
              <div className="my-3">{selectedTask.description}</div>
              <Divider />
              <div>
                <div className="font-semibold">Attachments</div>
              </div>
            </div>
            <Divider orientation="vertical" flexItem />
            <div className={`w-full lg:w-[30%] px-2`} name="comment">
              <div className="font-semibold text-center">Comments</div>
              <div className="overflow-y-auto overflow-x-hidden max-h-[45vh] lg:max-h-[53vh]">
                {comments.map((comment) => (
                  <CommentCard
                    comment={comment.text}
                    author={comment.author.name}
                    createdAt={formatDate(comment.createdAt)}
                  />
                ))}
              </div>
              {addComment ? (
                <div>
                  <div
                    style={{
                      border: "1px solid black",
                      minHeight: "6em",
                      cursor: "text",
                      borderRadius: "6px",
                      padding: "4px",
                      marginTop: "8px",
                      maxHeight: "10em",
                      overflow: "auto",
                    }}
                  >
                    <Editor
                      ref={editor}
                      editorState={editorState}
                      onEditorStateChange={setEditorState}
                      placeholder="Write something!"
                      wrapperClassName="wrapper-class"
                      editorClassName="editor-class"
                      toolbarClassName="bg-black"
                      toolbar={{
                        options: ["inline"],
                        inline: {
                          options: ["bold", "italic", "underline"],
                        },
                      }}
                    />
                  </div>
                  <button
                    className={`w-full rounded-full mt-2 p-2 ${
                      theme === "dark"
                        ? "bg-[#1e2d44] hover:bg-[#192b46]"
                        : "bg-[#c1cdd7] hover:bg-[#a0adb7]"
                    }`}
                    onClick={handleComment}
                  >
                    Comment
                  </button>
                </div>
              ) : (
                <button
                  className={`p-2 text-xs ml-auto rounded-md mt-2 ${
                    theme === "dark" ? "bg-[#1e2d44]" : "bg-[#c1cdd7]"
                  }`}
                  onClick={() => setAddComment(true)}
                >
                  Add Comment
                </button>
              )}
            </div>
          </div>
        </div>
      </Backdrop>
    </>
  );
}

export default TicketDetails;
