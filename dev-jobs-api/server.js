import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Acme Corp",
    location: "Athens, Greece",
    type: "Full-time",
    salary: "€35,000 – €45,000",
    stack: ["React", "JavaScript", "CSS"],
  },

  {
    id: 2,
    title: "Senior React Engineer",
    company: "TechNexus",
    location: "Thessaloniki, Greece (Remote)",
    type: "Full-time",
    salary: "€50,000 – €65,000",
    stack: ["React", "TypeScript", "Next.js"],
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "Athens, Greece",
    type: "Contract",
    salary: "€25,000 – €30,000",
    stack: ["Figma", "Adobe XD", "Tailwind CSS"],
  },
  {
    id: 4,
    title: "Full Stack Developer",
    company: "Fintech Solutions",
    location: "Marousi, Greece",
    type: "Full-time",
    salary: "€40,000 – €55,000",
    stack: ["Node.js", "React", "PostgreSQL"],
  },
  {
    id: 5,
    title: "Junior Frontend Developer",
    company: "StartUp Hub",
    location: "Patras, Greece",
    type: "Hybrid",
    salary: "€18,000 – €24,000",
    stack: ["JavaScript", "HTML", "Sass"],
  },
  {
    id: 6,
    title: "Mobile App Developer",
    company: "AppMasters",
    location: "Heraklion, Greece",
    type: "Full-time",
    salary: "€38,000 – €48,000",
    stack: ["React Native", "Firebase", "Redux"],
  },
];

app.get("/api/jobs", (req, res) => {
  res.json(jobs);
});

app.get("/api/jobs/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const job = jobs.find((j) => j.id === parseInt(id));
  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }
  res.json(job);
});

app.post("/api/jobs", (req, res) => {
  const newJob = req.body;
  const id = jobs[jobs.length - 1].id + 1;
  newJob.id = id;
  jobs.push(newJob);
  res.status(201).json(newJob);
});

app.delete("/api/jobs/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = jobs.findIndex((j) => j.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Job not found" });
  }
  jobs.splice(index, 1);
  res.json({ message: "Job deleted" });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});
