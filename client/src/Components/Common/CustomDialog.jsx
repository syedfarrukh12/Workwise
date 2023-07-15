import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { setSelectedProject } from "../../redux/project";

function CustomDialog({ open, setOpen, projects }) {
  const dispatch = useDispatch();
  function handleClose() {
    setOpen(false);
  }
  return (
    <>
      <div>
        <Dialog onClose={handleClose} open={open}>
          <DialogTitle>Select Project to start work</DialogTitle>
          <List sx={{ pt: 0 }}>
            {projects?.map((project) => (
              <ListItem disableGutters disablePadding key={project._id}>
                <ListItemButton
                  onClick={() => {
                    dispatch(setSelectedProject(project));
                    setOpen(false);
                  }}
                  key={project}
                >
                  <ListItemText primary={project.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Dialog>
      </div>
    </>
  );
}

export default CustomDialog;
