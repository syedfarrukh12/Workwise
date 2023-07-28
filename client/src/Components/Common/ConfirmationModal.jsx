import { Backdrop } from "@mui/material";
import React from "react";

function ConfirmationModal({ title, handleFunction, setShowConfrimation }) {
  const theme = localStorage.getItem("theme");
  return (
    <>
      <div>
        <Backdrop
          onClick={(e) => {
            e.stopPropagation();
          }}
          open={true}
          style={{ zIndex: 31 }}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={`p-5 rounded-lg w-96 min-h-[150px] flex flex-col justify-between ${
              theme === "dark" ? "bg-[#212f41]" : "bg-[#c9d3dc]"
            }`}
          >
            <div className="text-lg">{title}</div>
            <div className="ml-auto space-x-2">
              <button
                onClick={() => {
                  setShowConfrimation(false);
                }}
                className="px-4 py-2 rounded-full bg-[#c61a1a]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleFunction();
                }}
                className="px-4 py-2 rounded-full bg-[#3d6eae]"
              >
                Confirm
              </button>
            </div>
          </div>
        </Backdrop>
      </div>
    </>
  );
}

export default ConfirmationModal;
