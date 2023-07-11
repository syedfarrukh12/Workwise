import React from "react";
import BoardList from "./List";
import { TaskStatus } from "../utils";

function BoardView({ tasks, loading }) {
  return (
    <>
      <div className="flex overflow-x-auto">
        {Object.values(TaskStatus).map((status) => (
          <div key={status} className="ml-2">
            <BoardList status={status} tasks={tasks} loading={loading} />
          </div>
        ))}
      </div>
    </>
  );
}

export default BoardView;
