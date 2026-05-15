import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">DevJobs</Link>
      <div>
        <Link to="/browse-jobs">Browse Jobs</Link>
        <button>Post a Job</button>
      </div>
    </nav>
  );
}

export default Navbar;
