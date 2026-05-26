import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/jobs/${id}`);
        if (!response.ok) throw new Error("Job not found");

        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="detail-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back to jobs
      </button>

      <div className="detail-card">
        <div className="detail-header">
          <div className="company-avatar">{job.company[0]}</div>
          <div>
            <h1 className="detail-title">{job.title}</h1>
            <p className="detail-company">{job.company} </p>
          </div>
        </div>
        <div className="detail-meta">
          <span className="meta-badge">📍 {job.location}</span>
          <span className="meta-badge">💼 {job.type}</span>
          <span className="meta-badge">💰 {job.salary}</span>
        </div>
        <div className="stack-tags">
          {job.stack.map((tech) => (
            <span key={tech} className="tag">
              {tech}
            </span>
          ))}
        </div>
        <div className="divider" />
        <button className="apply-btn">Apply for this role</button>
      </div>
    </div>
  );
}

export default JobDetailPage;
