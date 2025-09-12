import { CircleUserRound } from "lucide-react";
import React from 'react'
import {Link} from 'react-router-dom';

const SidePannel = ({sidebarItems,activeItem,setActiveItem}) => {
  return (
    <>
      <div
        className="bg-white border-end"
        style={{ width: "280px", minHeight: "100vh" }}
      >
        <div className="p-4">
          <div className=" row">
            <CircleUserRound height="50px" width="50px"></CircleUserRound>
            <div className="d-flex justify-content-center fw-medium pt-2">
             {localStorage.getItem('user')}
            </div>
          </div>
          <div className="d-flex flex-column gap-1">
            <div className="text-start d-flex align-items-center justify-content-between p-3 border-0 rounded"></div>
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.active || activeItem === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveItem(item.label)}
                  className={`btn text-start d-flex align-items-center justify-content-between p-3 border-0 rounded ${
                    isActive
                      ? "bg-success text-white"
                      : "btn-outline-light text-dark"
                  }`}
                  style={{
                    backgroundColor: isActive ? "#0d6efd" : "transparent",
                    borderLeft: isActive
                      ? "4px solid #0a58ca"
                      : "4px solid transparent",
                  }}
                >
                  <div className="d-flex align-items-center gap-3">
                    <Icon size={20} />
                    <Link to={item.href} className="fw-medium text-dark">{item.label}</Link>
                  </div>
                  {item.count && (
                    <span className="badge bg-primary rounded-pill">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default SidePannel
