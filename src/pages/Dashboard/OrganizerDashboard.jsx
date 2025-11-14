import React, { useEffect, useState } from "react";
import axios from "axios";
import MainLayout from "../../layout/MainLayout";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OrganizerDashboard = () => {
  const organizerId = localStorage.getItem("id");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/events/organizer/summary/${organizerId}`
      );
      setEvents(res.data);
    } catch (error) {
      console.error("Error loading events", error);
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/events/delete/${eventId}`);
      alert("Event Deleted Successfully");
      load();
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const chartData = {
    labels: events.map((e) => e.title),
    datasets: [
      {
        label: "Tickets Sold",
        data: events.map((e) => e.ticketsSold),
        backgroundColor: "rgba(54, 162, 235, 0.8)",
        borderRadius: 8,
      },
      {
        label: "Revenue (₹)",
        data: events.map((e) => e.revenue),
        backgroundColor: "rgba(75, 192, 75, 0.8)",
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { 
        position: "top",
        labels: {
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: "Event Performance Overview",
        font: {
          size: 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0,0,0,0.1)"
        }
      },
      x: {
        grid: {
          display: false
        }
      }
    }
  };

  return (
     <MainLayout>
    <div className="container-fluid">
      <h2 className="fw-bold text-primary mb-4">
        <i className="bi bi-graph-up me-2"></i>
        My Events Performance
      </h2>

      <div className="row mb-5">
        <div className="col-12">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>Event Name</th>
                      <th>Date</th>
                      <th>Location</th>
                      <th>Capacity</th>
                      <th>Tickets Sold</th>
                      <th>Revenue (₹)</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {events.map((e) => (
                      <tr key={e.eventId}>
                        <td>
                          <div className="fw-bold">{e.title}</div>
                          <small className="text-muted">ID: {e.eventId}</small>
                        </td>
                        <td>{e.date}</td>
                        <td>{e.location}</td>
                        <td>
                          <span className="badge bg-info">{e.capacity}</span>
                        </td>
                        <td>
                          <span className="fw-bold text-primary">{e.ticketsSold}</span>
                        </td>
                        <td>
                          <span className="fw-bold text-success">₹{e.revenue}</span>
                        </td>

                        <td>
                          <div className="d-flex gap-2">
                            <button
                              className="btn btn-warning btn-sm"
                              onClick={() => (window.location.href = `/edit-event/${e.eventId}`)}
                            >
                              <i className="bi bi-pencil me-1"></i>
                              Edit
                            </button>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(e.eventId)}
                            >
                              <i className="bi bi-trash me-1"></i>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {events.length === 0 && (
                <div className="text-center py-5">
                  <i className="bi bi-calendar-x display-1 text-muted mb-3"></i>
                  <h5 className="text-muted">No event data available yet.</h5>
                  <p className="text-muted">Start by organizing your first event!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {events.length > 0 && (
        <div className="row">
          <div className="col-12">
            <div className="card shadow-sm border-0">
              <div className="card-body">
                <h5 className="fw-bold text-primary mb-4">
                  <i className="bi bi-bar-chart me-2"></i>
                  Performance Analytics
                </h5>
                <Bar data={chartData} options={chartOptions} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </MainLayout>
  );
};

export default OrganizerDashboard;