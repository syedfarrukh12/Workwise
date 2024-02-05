import sendEmail from "../../common/mail.js";
import Team from "../../models/teamSchema.js";
import User from "../../models/userSchema.js";

export const getAllTeams = async (req, res) => {
  const { managerId } = req.params;

  const teams = await Team.find({ manager: managerId }).populate({
    path: "members",
  });
  if (teams) {
    res.json(teams);
  }
};

export const getProjectTeam = async (req, res) => {};

export const createMember = async (req, res) => {
  const { teamId } = req.params;
  const { email } = req.body;
  const inviteCode = generateUniqueInviteCode();
  const inviteLink = generateInviteLinkIndirect(inviteCode);
  const inviteLinkDirect = generateInviteLinkDirect(inviteCode);

  const user = await User.findOne({ email: email });
  const team = await Team.findById(teamId).populate({
    path: "manager",
  });

  if (user)
    if (team.members.includes(user._id)) {
      return res
        .status(400)
        .json({ error: "Member already exists in the team" });
    }

  const linkToSend = user ? inviteLinkDirect : inviteLink;

  const emailParams = new URLSearchParams({
    email,
    teamId,
  }).toString();
  const finalLink = `${linkToSend}?${emailParams}`;
  if (!user) {
    sendEmail(
      email,
      `Invitation to join new Team ${team.teamName}`,
      `You are being invited to join a new team ${team.teamName} by ${team.manager.name}. 
    Click following link to join the team: ${finalLink}`
    );
  } else {
    sendEmail(
      email,
      `Invitation to join new Team ${team.teamName}`,
      `You are being invited to join a new team ${team.teamName} by ${team.manager.name}. 
    Click following link to join the team: ${finalLink}`
    );
  }
  res.status(200).json({ message: "Invitation sent to " + email });
};

export const createTeam = async (req, res) => {
  const { manager, teamName, assignedProjects, members } = req.body;
  const inviteCode = generateUniqueInviteCode();
  const inviteLink = generateInviteLinkIndirect(inviteCode);
  const inviteLinkDirect = generateInviteLinkDirect(inviteCode);

  try {
    const teamExists = await Team.findOne({ teamName });
    if (teamExists) {
      return res
        .status(400)
        .json(
          "Team with this name Already Exists. Kindly choose a different name"
        );
    }
    const teamManager = await User.findById(manager);
    const team = new Team({
      manager,
      teamName,
      assignedProjects,
    });
    const savedTeam = await team.save();

    members.forEach(async (element) => {
      const user = await User.findOne({ email: element });
      const linkToSend = user ? inviteLinkDirect : inviteLink;

      const emailParams = new URLSearchParams({
        email: element,
        teamId: savedTeam._id,
      }).toString();
      const finalLink = `${linkToSend}?${emailParams}`;

      if (!user) {
        sendEmail(
          element,
          `Invitation to join new Team ${teamName}`,
          `You are being invited to join a new team ${teamName} by ${teamManager.name}. 
        Click following link to join the team: ${finalLink}`
        );
      } else {
        sendEmail(
          element,
          `Invitation to join new Team ${teamName}`,
          `You are being invited to join a new team ${teamName} by ${teamManager.name}. 
        Click following link to join the team: ${finalLink}`
        );
      }
    });

    if (team) {
      res.status(201).json(team);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating team");
  }
};

export const addMember = async (req, res) => {
  const { teamId } = req.params;
  const { email } = req.body;
  console.log("TeamID, MemberID", teamId, email);

  try {
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    const member = await User.findOne({ email: email });
    const memberId = member && member._id;

    if (team.members.includes(memberId)) {
      return res
        .status(400)
        .json({ error: "Member already exists in the team" });
    }
    team.members.push(memberId);
    await team.save();

    return res.status(200).json({ message: "Member added to the team" });
  } catch (error) {
    console.error("Error adding member to team:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const removeMember = async (req, res) => {
  const { teamId } = req.params;
  const { email } = req.body;
  console.log("TeamID, Email", teamId, email);

  try {
    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    const member = await User.findOne({ email: email });
    const memberId = member && member._id; // Remove the unnecessary null check
    console.log(memberId, "MEMBER ID");

    const memberIndex = team.members.indexOf(memberId);

    if (memberIndex !== -1) {
      team.members.splice(memberIndex, 1);
      await team.save();

      return res.status(200).json({ message: "Member Removed from the team" });
    } else {
      return res
        .status(400)
        .json({ message: "Member not present in the team" });
    }
  } catch (error) {
    console.error("Error removing member from team:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const deleteTeam = async (req, res) => {};

function generateInviteLinkIndirect(inviteCode) {
  const baseUrl = "http://localhost:3000";
  return `${baseUrl}/invite/${inviteCode}`;
}

function generateInviteLinkDirect(inviteCode) {
  const baseUrl = "http://localhost:3000";
  return `${baseUrl}/invite/direct/${inviteCode}`;
}

function generateUniqueInviteCode(length = 8) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let code = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    code += characters.charAt(randomIndex);
  }
  return code;
}
