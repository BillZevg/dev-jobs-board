import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">
        <div className="logo-icon">
          <img
            width="24"
            height="24"
            src="https://img.icons8.com/sf-regular/48/FFFFFF/briefcase.png"
            alt="briefcase"
          />
        </div>
        <span className="logo-text">DevJobs</span>
      </Link>
      <div className="nav-right">
        <Link to="/browse-jobs" className="nav-link">
          Browse Jobs
        </Link>

        <Link to="/post-job" className="nav-btn primary">
          Post a Job
        </Link>
        {token ? (
          <button className="nav-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to="/login" className="nav-btn">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
