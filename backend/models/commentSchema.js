const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    task: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
});

module.exports = mongoose.model('Comment', commentSchema);