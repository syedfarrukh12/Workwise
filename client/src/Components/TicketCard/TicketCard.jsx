import { Checkbox, IconButton, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function TicketCard({ task }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const theme = localStorage.getItem('theme')
  const [visible, setVisible] = useState(true)
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div>
        <div className={`rounded-lg w-full h-14 p-3 flex cursor-pointer items-center space-y-2 mt-2 shadow-md ${ theme === 'dark' ? 'bg-[#526D82]' : 'bg-[#c1ced6]'}`}>
          <div className="flex items-center w-full">
            <div className="flex items-center h-5">
              {visible ? <VisibilityIcon /> : <VisibilityOffIcon />}
              <Checkbox defaultChecked onChange={()=>{setVisible(!visible)}}/>
            </div>
            <div className="font-bold">{task.name}</div>
            
            <div className="ml-auto">
              <div>
                <IconButton
                  aria-label="more"
                  id="long-button"
                  aria-controls={open ? "long-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  MenuListProps={{
                    "aria-labelledby": "long-button",
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <EditIcon /> Edit
                  </MenuItem>
                  <MenuItem onClick={handleClose}>
                    <DeleteIcon /> Delete
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TicketCard;
