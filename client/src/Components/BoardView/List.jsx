import React from "react";
import Card from "./Card";
import { camelCaseToSentenceCase } from "../utils";
import { animated, useSpring } from "@react-spring/web";
import CardSkeleton from "./CardSkeleton";

function BoardList({ status, tasks, loading }) {
  const theme = localStorage.getItem("theme");
  const groupedTasks = {};
  tasks.forEach((task) => {
    const { status } = task;
    if (!groupedTasks[status]) {
      groupedTasks[status] = [];
    }
    groupedTasks[status].push(task);
  });

  const styles = useSpring({
    from: {
      opacity: 0,
      transform: "translateY(-10px)",
    },
    to: {
      opacity: 1,
      transform: "translateY(0)",
    },
    config: {
      duration: 500,
      delay: 100,
    },
  });

  return (
    <animated.div
      style={styles}
      className={`flex flex-col p-3 w-[216px] justify-start overflow-auto h-screen mt-2 rounded-md ${
        theme === "dark" ? "bg-[#223145]" : "bg-[#eaf2f8]"
      }`}
    >
      <div className="font-semibold text-center">
        {camelCaseToSentenceCase(status)}
      </div>

      {loading ? (
        <CardSkeleton />
      ) : (
        <div className="flex flex-col flex-grow overflow-auto mt-2">
          {groupedTasks[status]?.length > 0 ? (
            groupedTasks[status].map((task) => (
              <div key={task._id}>
                <Card task={task} />
              </div>
            ))
          ) : (
            <div className="text-sm text-center mt-5">
              No tasks in this section
            </div>
          )}
        </div>
      )}
    </animated.div>
  );
}

export default BoardList;
