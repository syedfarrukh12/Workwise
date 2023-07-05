import Project from "../../models/projectSchema.js";

export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving projects");
  }
};

export const getProject = async (req, res, next) => {
  const id = req.params.id;
  Project.findById(id)
    .then((project) => {
      if (!project) {
        res.status(404).send("Project not found");
      } else {
        res.status(200).json(project);
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred while retrieving the project");
    });
};

export const createProject = async (req, res, next) => {
  const { name, description, createdBy } = req.body;

  const project = new Project({
    name,
    description,
    createdBy,
  });

  project
    .save()
    .then((savedProject) => {
      res.status(200).json(savedProject);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("An error occurred while creating the project");
    });
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
        return res.status(404).send("Cannot find project");
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
  console.log(id)

  Project.findByIdAndDelete(id)
    .then((project) => {
      if (!project) {
        return res.status(404).send("Cannot find project");
      }
      return res.status(200).json({message: "Project deleted successfully"});
    })
    .catch((error) => {
      console.error(error);
      return res
        .status(500)
        .send("An error occurred while deleting the project");
    });
};