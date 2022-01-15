const express = require("express");
const app = express();
const port = 5000;
app.use(express.json())

const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/tasks")
    .then(() => console.log("MONGO DB Connected"));

const taskModel = require("./models/task");

app.get("/", (req, res) => {
    res.end("Home")
})

app.get("/api/list", async (req, res) => {
    const taskList = await taskModel.find()
    if (taskList.length === 0) {
        res.json({ data: { status: false } })
    }
    res.json({ data: { status: true, tasks: taskList } })
})

app.post("/api/new", async (req, res) => {
    const newTask = req.body;
    taskModel.create(newTask);
    res.json({ data: { status: true } })
})

app.delete("/api/delete/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const taskList = await taskModel.find({ id: id })
    console.log(taskList[0]);
    if (taskList.length === 0) {
        res.json({ data: { status: false } })
    }
    await taskModel.findOneAndDelete({ id: id })
    res.json({ data: { status: true } })
});

app.put("/api/reminder/:id", async (req, res) => {
    const id = req.params.id;
    const taskDetail = req.body;
    taskDetail.reminder = !(taskDetail.reminder)

    await taskModel.findOneAndUpdate({ id: id }, taskDetail, { new: true })
    res.json({ data: { status: true } })
})

app.listen(port, () => console.log(`Server Running on ${port}`))