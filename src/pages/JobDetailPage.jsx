import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function JobDetailPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div>
      <h1>{job.title}</h1>
      <p>
        {job.company} •{job.location} •{job.type} •{job.salary}
      </p>
    </div>
  );
}

export default JobDetailPage;
