import Project from "../../models/projectSchema.js";
import mongoose from "mongoose";

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
