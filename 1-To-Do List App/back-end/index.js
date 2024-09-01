const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

// mock storage
let tasks = [];

app.post("/task", (req, res) => {
    const { id, task, completed, isEditing } = req.body;
    tasks.push({ id, task, completed, isEditing });
    console.log("post: add task successful:", task)

    res.status(200).json({
        message: "Task added successfully",
        taskId: id
    })
});
app.delete("/tasks/:taskId", (req, res) => {
    const { taskId } = req.params;
    const targetTaskIndex = tasks.findIndex((task) => task.id === taskId);

    if (targetTaskIndex !== -1) {
        tasks.splice(targetTaskIndex, 1);
        res.status(200).json({
            message: "delete task successful",
            taskId: taskId
        });
        console.log("delete: delete task successful")

    } else {
        res.status(404).json({
            message:"Task not found",
            taskId: taskId
        })
    }
})

app.patch("/update/:taskId", (req, res) => {
    console.log(tasks);
    const { taskId } = req.params;
    const targetTaskIndex = tasks.findIndex((task) => task.id === taskId);
    const newTaskContent = req.body;

    if (targetTaskIndex !== -1) {
        tasks[targetTaskIndex] = {
            ...tasks[targetTaskIndex],
            ...newTaskContent
        };
        res.status(200).json({
            message:"Edit successful",
            taskId: taskId
        })
        
    } else {
        res.status(404).json({message: "task not found"})
    }
})

app.get("/tasks", (req, res) => {
    res.status(200).json(tasks)
})


app.listen(8080, () => {
    console.log("server running at 8080 port.")
})

