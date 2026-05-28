import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function PostJobPage() {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [salary, setSalary] = useState("");
  const [stack, setStack] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      console.log("submitting...");
      const stackArray = stack.split(",").map((s) => s.trim());

      const response = await fetch("http://localhost:3001/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          company,
          location,
          type,
          salary,
          stack: stackArray,
        }),
      });

      console.log("response status", response.status);

      if (response.ok) {
        navigate("/");
      }
    } catch (err) {
      console.log("error:", err.message);
    }
  };

  useEffect(() => {
    if (!token) navigate("/login");
  }, []);

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Post a Job</h1>

        <input
          className="auth-input"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="auth-input"
          type="text"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          className="auth-input"
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select
          className="auth-input"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="">Select type...</option>
          <option value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Contract">Contract</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Remote">Remote</option>
        </select>
        <input
          className="auth-input"
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <input
          className="auth-input"
          type="text"
          placeholder="Stack"
          value={stack}
          onChange={(e) => setStack(e.target.value)}
        />
        <button className="auth-btn" onClick={handleSubmit}>
          Post Job
        </button>
      </div>
    </div>
  );
}

export default PostJobPage;
