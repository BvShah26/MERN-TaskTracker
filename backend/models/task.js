const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    id:Number,
    text: String,
    date: String,
    reminder: Boolean
})

const taskModel = mongoose.model("task", taskSchema, "task") 
module.exports = taskModel;