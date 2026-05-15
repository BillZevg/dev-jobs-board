import { Link } from "react-router-dom";

function JobCard({ job }) {
  return (
    <Link to={`/jobs/${job.id}`}>
      <div>
        <h3 className="job-title">{job.title}</h3>
        <p>
          <span className="job-company">{job.company} · </span>
          <span className="job-location">{job.location} · </span>
          <span className="job-type">{job.type} · </span>
          <span className="job-salary">{job.salary} · </span>
        </p>

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
