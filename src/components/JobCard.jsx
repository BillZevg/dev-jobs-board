import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <Link to={`/jobs/${job.id}`} className="job-card">
      <h3 className="job-title">{job.title}</h3>
      <p className="job-meta">
        {job.company} • {job.location} • {job.type} • {job.salary}
      </p>
      <div>
        {job.stack.map((tech) => (
          <span key={tech} className="tag">
            {tech}
          </span>
        ))}
      </div>
    </Link>
  );
}

export default JobCard;
