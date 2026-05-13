import express from "express";
const router = express.Router();
import Todo from "../models/Todo.js";
import User from "../models/User.js";

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, dueDate, username } = req.body;

    // 1️⃣ Create Todo
    const newTodo = new Todo({
      title,
      description,
      dueDate
    });

    await newTodo.save();

    // 2️⃣ Find user
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3️⃣ Push todo ID into user
    user.todos.push(newTodo._id);
    await user.save();

    res.status(201).json(newTodo);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch("/:id/completed", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      throw new Error("Todo not found");
    }
    todo.completed = true;
    await todo.save();
    res.json({ message: "Todo marked as done" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, { title: req.body.title, description: req.body.description, dueDate: req.body.dueDate }, { new: true });
    if (!todo) {
      throw new Error("Todo not found");
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id/:username", async (req, res) => {
  try {
    const { id, username } = req.params;

    // 1️⃣ Delete todo
    await Todo.findByIdAndDelete(id);

    // 2️⃣ Remove from user
    await User.findOneAndUpdate(
      { username },
      { $pull: { todos: id } }
    );

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;