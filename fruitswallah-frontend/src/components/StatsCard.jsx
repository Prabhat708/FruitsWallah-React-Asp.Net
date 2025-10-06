const StatsCard = ({ title, value, color, icon }) => (
  <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-12">
    <div
      className={`card shadow-sm border-0 h-100 p-3 hover-scale bg-${color} bg-opacity-10`}
      style={{ transition: "transform 0.3s" }}
    >
      <div className="d-flex align-items-center">
        <div
          className={`rounded-circle bg-${color} text-white d-flex align-items-center justify-content-center me-3`}
          style={{ width: "40px", height: "40px" }}
        >
          {icon}
        </div>
        <div>
          <h6 className="text-muted mb-1">{title}</h6>
          <h5 className={`fw-bold text-${color}`}>{value}</h5>
        </div>
      </div>
    </div>
  </div>
);

export default StatsCard;
