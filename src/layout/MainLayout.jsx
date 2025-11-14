import React from "react";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div 
        className="flex-grow-1 p-4"
        style={{ 
          marginLeft: "280px",
          background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
          minHeight: "100vh"
        }}
      >
        <div 
          style={{
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            minHeight: "calc(100vh - 2rem)",
            padding: "2rem"
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;