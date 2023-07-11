import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TicketCard from "../TicketCard/TicketCard";
import { TaskStatus, camelCaseToSentenceCase } from "../utils";
import { animated, useSpring } from "@react-spring/web";
import TicketCardSkeleton from "../TicketCard/TicketCardSkeleton";

function CustomAccordion({ tasks, loading }) {
  const groupedTasks = {};
  const theme = localStorage.getItem("theme");

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
    <animated.div style={styles} className="px-3">
      {Object.values(TaskStatus).map((status) => (
        <Accordion
          style={{
            backgroundColor: theme === "dark" ? "#27374D" : "#eaf2f8",
            border: "none",
            boxShadow: "none",
            borderRadius: "10px",
            marginTop: "5px",
          }}
          key={status}
          defaultExpanded
          TransitionProps={{ unmountOnExit: true }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`${status}-content`}
            id={`${status}-header`}
          >
            <Typography>{camelCaseToSentenceCase(status)}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {loading ? (
              <TicketCardSkeleton />
            ) : (
              <>
                {groupedTasks[status]?.length > 0 ? (
                  groupedTasks[status].map((task) => (
                    <div key={task._id}>
                      <TicketCard task={task} />
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-center">
                    No tasks in this section
                  </div>
                )}
              </>
            )}
          </AccordionDetails>
        </Accordion>
      ))}
    </animated.div>
  );
}

export default CustomAccordion;
