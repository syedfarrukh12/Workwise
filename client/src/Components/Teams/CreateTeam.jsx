import { Autocomplete, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

function CreateTeam({
  setCreateTeam,
  setTeam,
  projects,
  memberFields,
  setMemberCount,
  memberCount,
}) {
  const theme = localStorage.getItem("theme");
  return (
    <>
      <div
        className={`p-3 m-3 rounded-xl space-y-3 ${
          theme === "dark" ? "bg-[#212f42]" : "bg-[#c6ced4]"
        }`}
      >
        <div className="flex justify-end">
          <CloseIcon
            onClick={() => {
              setCreateTeam(false);
            }}
            className="!w-5 !h-5 cursor-pointer"
          />
        </div>

        <div>
          <span>Team Name</span>
          <TextField
            id="outlined-basic"
            className="w-full"
            size="small"
            variant="outlined"
            name="teamname"
            onChange={(e) => {
              setTeam((prev) => ({
                ...prev,
                teamName: e.target.value,
              }));
            }}
            placeholder="Add a name for team"
          />
        </div>
        <div>
          <span>Project</span>
          <Autocomplete
            disablePortal
            className="w-full"
            multiple
            name="projects"
            size="small"
            id="combo-box-demo"
            onChange={(event, newValue) =>
              setTeam((prev) => ({
                ...prev,
                assignedProjects: newValue.map((project) => project._id),
              }))
            }
            options={projects}
            getOptionLabel={(user) => user.name}
            renderInput={(params) => <TextField {...params} />}
          />
        </div>

        {memberFields}

        <button
          className="font-medium rounded-full py-1 px-2 cursor-pointer flex items-center"
          onClick={() => {
            setMemberCount(memberCount + 1);
          }}
        >
          <AddOutlinedIcon className="!w-5 !h-5" />
          <div>Add another member</div>
        </button>
      </div>
    </>
  );
}

export default CreateTeam;
