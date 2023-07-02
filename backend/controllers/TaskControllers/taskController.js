import Task from "../../models/taskSchema.js";

export const getTasks = async (req, res, next) => {
  const project_id = req.params.project_id;

  try {
    const tasks = await Task.find({ project: project_id }).populate(
      "assignee",
      "name"
    );
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving tasks");
  }
};

export const getTask = async (req, res, next) => {
  const project_id = req.params.project_id;
  const task_id = req.params.task_id;

  try {
    const tasks = await Task.find({
      project: project_id,
      _id: task_id,
    }).populate("assignee", "name");
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while retrieving tasks");
  }
};

export const createTask = async (req, res, next) => {
  const {
    name,
    description,
    status,
    priority,
    project,
    dueDate,
    assignee,
    createdAt,
    createdBy,
  } = req.body;

  try {
    const task = new Task({
      name,
      description,
      status,
      priority,
      project,
      dueDate,
      assignee,
      createdAt,
      createdBy,
    });
    task
      .save()
      .then(() => {
        res.status(200).json(task);
      })
      .catch((error) => {
        console.log(error);
        res
          .status(500)
          .json({ message: "An error occurred while creating task" });
      });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while creating tasks");
  }
};

export const updateTask = async (req, res, next) => {
  const project_id = req.params.project_id;
  const task_id = req.params.task_id;

  try {
    const { name, description, status, priority, dueDate, assignee } = req.body;
    const task = await Task.findOne({
      _id: task_id,
      project: project_id,
    });

    if (!task) {
      return res.status(404).send("Task not found");
    }

    task.name = name;
    task.description = description;
    task.status = status;
    task.priority = priority;
    task.dueDate = dueDate;
    task.assignee = assignee;
    const updatedTask = await task.save();

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the task");
  }
};

export const deleteTask = async (req, res, next) => {
  const project_id = req.params.project_id;
  const task_id = req.params.task_id;

  try {
    const task = await Task.findOne({
      _id: task_id,
      project: project_id,
    });

    if (!task) {
      return res.status(404).send("Task not found");
    }

    task.deleteOne().then(() => {
      res.status(200).json({ messgae: "Task deleted successfully" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the task");
  }
};
