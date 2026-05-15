import { useEffect, useState } from "react";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";

function Homepage() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/jobs");
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);
  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  const filteredJobs = jobs.filter((job) => {
    return job.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div>
      <SearchBar value={search} onChange={setSearch} />

      {filteredJobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
}

export default Homepage;
