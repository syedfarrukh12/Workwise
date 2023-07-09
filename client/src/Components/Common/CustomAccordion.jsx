import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TicketCard from "../TicketCard/TicketCard";
import { TaskStatus, camelCaseToSentenceCase } from "../utils";

function CustomAccordion({ tasks }) {
  const groupedTasks = {};
  const theme = localStorage.getItem("theme");

  tasks.forEach((task) => {
    const { status } = task;
    if (!groupedTasks[status]) {
      groupedTasks[status] = [];
    }
    groupedTasks[status].push(task);
  });

  return (
    <div>
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
            {groupedTasks[status] &&
              groupedTasks[status].map((task) => (
                <div key={task._id}>
                  <TicketCard task={task} />
                </div>
              ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

export default CustomAccordion;
