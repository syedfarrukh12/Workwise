import { Divider, Tooltip } from "@mui/material";
import React from "react";
import {
  TaskPriority,
  camelCaseToSentenceCase,
  formatDate,
  getInitials,
  lightColors,
} from "../utils";
import { setShowTask, setShowTicket } from "../../redux/nonPersistant";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch } from "react-redux";

function TicketInfo({ selectedTask }) {
  const dispatch = useDispatch();
  return (
    <>
      <div className="flex flex-col w-full h-72 pr-4" name="main">
        <div className="flex">
          {selectedTask.assignee.length > 0 &&
            selectedTask.assignee.map((item, index) => (
              <div className="w-fit" key={index}>
                <Tooltip title={item.name}>
                  <span
                    style={{
                      borderRadius: "500px",
                      backgroundColor: lightColors[index],
                    }}
                    className={`p-2 rounded-ful text-gray-800 cursor-default ${
                      index > 0 ? "-ml-2" : ""
                    }`}
                  >
                    {getInitials(item.name)}
                  </span>
                </Tooltip>
              </div>
            ))}
        </div>

        {selectedTask.dueDate && (
          <div className="mt-3 ">
            <span className="font-semibold">Due Date:</span>{" "}
            <span>{formatDate(selectedTask.dueDate)}</span>
          </div>
        )}

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
                className={`rounded-full px-2 border-2 font-semibold ${
                  selectedTask.priority === TaskPriority.Low
                    ? " border-[#388E3C]"
                    : selectedTask.priority === TaskPriority.Medium
                    ? " border-[#FFEB3B]"
                    : selectedTask.priority === TaskPriority.High
                    ? " border-[#ff8c00]"
                    : " border-[#F44336]"
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
    </>
  );
}

export default TicketInfo;
