 import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";

const AddTodo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const getCurrentDate = () => {
  return new Date().toISOString().split("T")[0];
};
  
  useEffect(() => {
    if (!id) return;
    axios.get(`http://localhost:5000/todos`)
      .then(res => {
        const todo = res.data.find(t => t._id === id);
        if (todo) {
          setTitle(todo.title);
          setDescription(todo.description);
          setDueDate(todo.dueDate);
        } else {
          alert("Event not found");
          navigate("/dashboard");
        }
      });
  }, [id, navigate]);

  const addTodo = () => {
    if(!title) {
      alert("Title is required");
      return;
    }
    axios.post("http://localhost:5000/todos", {
      title,
      description,
      dueDate,
      username: localStorage.getItem("username")
    })
    .then(() => navigate("/dashboard"));
  };

  const updateTodo = () => {
    axios.put(`http://localhost:5000/todos/${id}`, {
      title,
      description,
      dueDate
    })
    .then(() => navigate("/dashboard"));
  };

  return (
    <div className="w-100 w-md-auto container my-3 border-primary border rounded p-4" style={{width: '45rem'}}>
        <h2 className="text-center mt-3">{id ? "Make Changes to Event" : "Add New Event"}</h2>
      <Form className="d-flex flex-column gap-3 px-md-5 py-3 justify-content-center">
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control style={{width: '37rem'}}
            className="w-100 w-md-auto"
            type="text"
            placeholder="Enter event title"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control style={{width: '37rem'}}
            className="w-100 w-md-auto"
            type="date"
            min={getCurrentDate()}
            placeholder="Enter event due date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control style={{width: '37rem'}}
            className="w-100 w-md-auto"
            type="text"
            placeholder="Enter event description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
      </Form>
      <div className="d-flex justify-content-center">
      <Button variant="primary" className="mt-3" onClick={id ? updateTodo : addTodo}>
        {id ? "Update Event" : "Add Event"}
      </Button>
      </div>
    </div>
  );
};

export default AddTodo;