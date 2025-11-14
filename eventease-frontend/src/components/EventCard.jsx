import React from "react";

const EventCard = ({ event }) => (
  <div className="event-card">
    <h3>{event.name}</h3>
    <p>{event.date}</p>
    <p>{event.location}</p>
    <button>View Details</button>
  </div>
);

export default EventCard;
