import { Backdrop, Divider, TextField, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setOpenAlert, setShowProfile } from "../../redux/nonPersistant";
import CloseIcon from "@mui/icons-material/Close";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useState } from "react";
import { API_URL } from "../Common/apiConfig";
import axios from "axios";
import { login } from "../../redux/user";

function UserProfile() {
  const dispatch = useDispatch();
  const theme = localStorage.getItem("theme");

  const currentUser = useSelector((state) => state.user.value);
  const [user, setUser] = useState(currentUser);
  const [showPassword, setShowPassword] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPasswordState, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [aboutState, setAboutState] = useState(user.about);

  const handleClose = () => {
    dispatch(setShowProfile(false));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevProject) => ({
      ...prevProject,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (showPassword) {
      if (newPasswordState !== confirmPassword) {
        return dispatch(
          setOpenAlert({
            value: true,
            message: "Passwords you entered do not Match",
            type: "error",
          })
        );
      } else {
        setUser((prev) => ({
          ...prev,
          password: oldPassword,
        }));
      }
    }

    const { name, username, email, role } = user;
    const updateData = {
      name,
      username,
      email,
      role,
      about: aboutState,
    };

    if (showPassword) {
      updateData.password = oldPassword;
      updateData.newPassword = newPasswordState;
    }

    axios
      .put(`${API_URL}/user`, updateData)
      .then((response) => {
        dispatch(login(response.data));
        dispatch(setShowProfile(false));
        dispatch(
          setOpenAlert({
            value: true,
            message: "Your profile has be updated",
            type: "success",
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <Backdrop
          open={true}
          onClick={() => dispatch(setShowProfile(false))}
          style={{ zIndex: 30 }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`w-full lg:w-[50%] md:w-[80%] rounded-lg flex flex-col ${
              theme === "dark" ? "bg-[#27374D]" : "bg-[#DDE6ED]"
            }`}
          >
            <div className="flex justify-between p-3 items-center">
              <div>Update Profile</div>
              <div
                onClick={handleClose}
                className="cursor-pointer rounded-full hover:bg-black/20 p-1"
              >
                <CloseIcon className="!w-5 !h-5" />
              </div>
            </div>
            <Divider />
            <div>
              <div className="flex p-5 flex-col max-h-[70vh] space-y-3 overflow-auto">
                <div className="flex flex-col items-center justify-center pb-10">
                  <div className="h-36 w-36 rounded-full">
                    <AccountCircleIcon className="!h-36 !w-36 " />
                  </div>
                  <div className="text-2xl">
                    {currentUser.name}{" "}
                    <span className="text-sm">({currentUser.role})</span>
                  </div>
                  <div>
                    username:{" "}
                    <span className="text-sm font-bold mt-2">
                      @{currentUser.username}
                    </span>
                  </div>
                </div>

                <div className="w-full">
                  <span>Full Name</span>
                  <TextField
                    id="outlined-basic"
                    className="w-full"
                    value={user.name}
                    placeholder="Full Name"
                    size="small"
                    onChange={handleChange}
                    variant="outlined"
                    name="name"
                  />
                </div>

                <div className="w-full">
                  <span>Username</span>

                  <TextField
                    id="outlined-basic"
                    className="w-full"
                    value={user.username}
                    size="small"
                    onChange={handleChange}
                    variant="outlined"
                    type="text"
                    name="username"
                  />
                </div>

                <div className="w-full">
                  <span>Email</span>
                  <Tooltip
                    arrow
                    title="You cannot update your email address,
                    Please contact your admin"
                  >
                    <TextField
                      id="outlined-basic"
                      className="w-full"
                      disabled
                      type="email"
                      value={user.email}
                      size="small"
                      onChange={handleChange}
                      variant="outlined"
                      name="email"
                    />
                  </Tooltip>
                </div>

                <div
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                  className="underline cursor-pointer opacity-75 hover:opacity-100 w-fit"
                >
                  Change Password
                </div>

                {showPassword && (
                  <div>
                    <div>
                      <span>Old Password</span>
                      <TextField
                        id="outlined-basic"
                        className="w-full"
                        type="password"
                        value={oldPassword}
                        size="small"
                        onChange={(e) => {
                          setOldPassword(e.target.value);
                        }}
                        variant="outlined"
                        name="password"
                      />
                    </div>
                    <div>
                      <span>New Password</span>
                      <TextField
                        id="outlined-basic"
                        className="w-full"
                        type="password"
                        value={newPasswordState}
                        size="small"
                        onChange={(e) => {
                          setNewPassword(e.target.value);
                        }}
                        variant="outlined"
                        name="password"
                      />
                    </div>
                    <div>
                      <span>Confirm Password</span>
                      <TextField
                        id="outlined-basic"
                        type="password"
                        className="w-full"
                        value={confirmPassword}
                        size="small"
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                        }}
                        variant="outlined"
                        name="password"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <span>About</span>
                  <TextField
                    id="outlined-basic"
                    className="w-full"
                    value={aboutState}
                    size="small"
                    placeholder="About yourself (Optional)"
                    onChange={(e) => {
                      setAboutState(e.target.value);
                    }}
                    variant="outlined"
                    multiline
                    name="about"
                    rows={4}
                  />
                </div>
                <div>
                  <span>Role</span>
                  <TextField
                    id="outlined-basic"
                    className="w-full"
                    disabled
                    value={user.role}
                    size="small"
                    onChange={handleChange}
                    variant="outlined"
                    name="about"
                  />
                </div>
              </div>
            </div>
            <div>
              <Divider />
              <div className="p-3 space-x-3 justify-end flex">
                <button
                  onClick={handleClose}
                  className="bg-red-500 hover:bg-red-700 py-2 px-4 rounded-full text-white"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-sky-600 hover:bg-sky-800 py-2 px-4 rounded-full text-white"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </Backdrop>
      </div>
    </>
  );
}

export default UserProfile;
