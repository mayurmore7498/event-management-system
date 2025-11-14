import React from "react";
import QRCode from "react-qr-code";

const QRCodeGenerator = ({ ticket }) => {
  if (!ticket) return null;

  const qrData = JSON.stringify({
    ticketId: ticket.id,
    event: ticket.event.title,
    seat: ticket.seatNumber,
    timestamp: new Date().toISOString()
  });

  return (
    <div 
      className="text-center p-4"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        borderRadius: "16px",
        color: "white"
      }}
    >
      <h5 className="fw-bold mb-3">Your Digital Ticket</h5>
      <div 
        style={{
          background: "white",
          padding: "20px",
          borderRadius: "12px",
          display: "inline-block",
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)"
        }}
      >
        <QRCode 
          value={qrData} 
          size={180} 
          style={{ 
            height: "auto", 
            maxWidth: "100%", 
            width: "100%" 
          }}
        />
      </div>
      <div className="mt-3">
        <p className="mb-1 fw-semibold">Seat: {ticket.seatNumber}</p>
        <p className="mb-0 fw-semibold">{ticket.event.title}</p>
      </div>
    </div>
  );
};

export default QRCodeGenerator;