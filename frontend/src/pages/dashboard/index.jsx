import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

const Dashboard = () => {
  const [todoId, setTodoId] = useState([]);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const username = localStorage.getItem("username");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/todos/${username}`)
      .then((response) => {
        setTodoId(response.data);
      })
      .catch((error) => {
        console.error("Error fetching event id's:", error);
      });
  }, [username]);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventPromises = todoId.map((id) =>
        axios.get(`http://localhost:5000/todos/${id}`)
      );
      try {
        const eventResponses = await Promise.all(eventPromises);
        setEvents(eventResponses.map((res) => res.data));
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };

    if (todoId.length > 0) {
      fetchEvents();
    }
  }, [todoId]);

  const deleteEvent = (id) => {
    axios
      .delete(`http://localhost:5000/todos/${id}/${username}`)
      .then(() => {
        setEvents(events.filter((event) => event._id !== id));
      })
      .catch((error) => {
        console.error("Error deleting event:", error);
      });
  };

  const markDoneEvent = (id) => {
    axios
      .patch(`http://localhost:5000/todos/${id}/completed`)
      .then(() => {
        setEvents(
          events.map((event) =>
            event._id === id ? { ...event, completed: true } : event,
          ),
        );
      })
      .catch((error) => {
        console.error("Error marking event as done:", error);
      });
  };

  return (
    <div>
      {events.length === 0 ? (
        <h2 className="text-center mt-5">
          No events found. Please add some events.
        </h2>
      ) : (
        <h2 className="text-center mt-3">Your Events</h2>
      )}
      <div className="d-flex flex-wrap gap-5 px-3 py-3 justify-content-center">
        {events.map((event) => (
          <div key={event._id}>
            <Card border="warning" bg="light" style={{ width: "16rem" }}>
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                {event.completed ? (
                  <Card.Subtitle className="text-success px-3">
                    Completed
                  </Card.Subtitle>
                ) : (
                  <Card.Subtitle className="text-danger px-3">
                    Pending
                  </Card.Subtitle>
                )}
                <Card.Text className="px-2">{event.dueDate ? `Due Date: ${(event.dueDate).toLocaleString().substring(0, 10)}` : ''}</Card.Text>
                <Card.Text className="px-2">{event.description}</Card.Text>
                <div className="d-flex flex-wrap gap-2 px-3 justify-content-center">
                  <Button
                    variant="primary"
                    onClick={() => {
                      navigate(`/add-event/${event._id}`);
                    }}
                  >
                    ✎ Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => deleteEvent(event._id)}
                  >
                    🗑 Delete
                  </Button>
                  {!event.completed ? (
                    <Button
                      variant="success"
                      onClick={() => markDoneEvent(event._id)}
                    >
                      ✔ Mark as Done
                    </Button>
                  ) : null}
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
