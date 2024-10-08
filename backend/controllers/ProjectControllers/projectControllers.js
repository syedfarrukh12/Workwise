import Project from "../../models/projectSchema.js";

export const getProjects = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    if (userId) {
      const projectsCreatedByUser = await Project.find({
        createdBy: userId,
      }).populate("users", "name");
      const projectsPartOfUser = await Project.find({ users: userId }).populate(
        "users"
      );
      const allProjects = projectsCreatedByUser.concat(projectsPartOfUser);
      const uniqueProjectsSet = new Set();
      const uniqueProjects = [];
      allProjects.forEach((project) => {
        if (!uniqueProjectsSet.has(project._id.toString())) {
          uniqueProjectsSet.add(project._id.toString());
          uniqueProjects.push(project);
        }
      });
      if (uniqueProjects) {
        res.status(200).json(uniqueProjects);
      } else {
        res.status(200).json("Cannot Find Projects");
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving projects");
  }
};

export const getProject = async (req, res, next) => {
  const id = req.params.id;
  const userId = req.params.userId;

  Project.findOne({ _id: id, createdBy: userId })
    .populate("users", "name")
    .then((project) => {
      if (!project) {
        res.status(404).json("Project not found");
      } else {
        res.status(200).json(project);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json("An error occurred while retrieving the project");
    });
};

export const createProject = async (req, res, next) => {
  const { name, description, createdBy, users } = req.body;
  try {
    const project = new Project({
      name,
      description,
      createdBy,
      users,
    });

    project
      .save()
      .then((savedProject) => {
        res.status(200).json(savedProject);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json("An error occurred while creating the project");
      });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

export const updateProject = (req, res, next) => {
  const id = req.params.id;
  const { name, description, endDate, users } = req.body;
  Project.findByIdAndUpdate(
    id,
    { name, description, endDate, users },
    { new: true }
  )
    .then((project) => {
      if (!project) {
        return res.status(404).json("Cannot find project");
      }
      return res.status(200).json(project);
    })
    .catch((error) => {
      console.error(error);
      return res
        .status(500)
        .send("An error occurred while updating the project");
    });
};

export const deleteProject = (req, res, next) => {
  const id = req.params.id;

  Project.findByIdAndDelete(id)
    .then((project) => {
      if (!project) {
        return res.status(404).json("Cannot find project");
      }
      return res.status(200).json("Project deleted successfully");
    })
    .catch((error) => {
      console.error(error);
      return res
        .status(500)
        .send("An error occurred while deleting the project");
    });
};
