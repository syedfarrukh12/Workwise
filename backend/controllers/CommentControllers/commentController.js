import Comment from "../../models/commentSchema.js";

export const getComments = (req, res, next) => {
  const taskId = req.params.taskId;

  Comment.find({ task: taskId })
    .then((comments) => {
      if (!comments) {
        res.status(404).send("No comments found");
      }
      res.status(200).json(comments);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Something went wrong failed to get comments");
    });
};

export const editComment = (req, res, next) => {
  const taskId = req.params.taskId;
  const commentId = req.params.commentId;
  const { text } = req.body;

  Comment.findOneAndUpdate(
    { task: taskId, _id: commentId },
    { text },
    { new: true }
  )
    .then((comment) => {
      if (!comment) {
        return res.status(404).send("Comment not found");
      }
      res.status(200).json(comment);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send("Failed to update comment. Please try again.");
    });
};

export const createComment = (req, res, next) => {
  const { text, author, task } = req.body;

  const comment = new Comment({
    text,
    author,
    task,
  });
  comment
    .save()
    .then((comment) => {
      res.status(200).json(comment);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Something went wrong failed to create comment");
    });
};

export const deleteComment = (req, res, next) => {
  const taskId = req.params.taskId;
  const commentId = req.params.commentId;

  Comment.findOneAndDelete({ _id: commentId, task: taskId })
    .then(() => {
      res.status(200).send("Comment Successfully deleted");
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send("Something went wrong failed to delete comment");
    });
};
