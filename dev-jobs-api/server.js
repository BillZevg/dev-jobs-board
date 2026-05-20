import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const JWT_SECRET = "devjobs_secret_key_123";
const app = express();
const PORT = 3001;

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
};

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

const users = [];

app.get("/api/jobs", (req, res) => {
  res.json(jobs);
});

app.get("/api/jobs/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const job = jobs.find((j) => j.id === id);

  if (!job) return res.status(404).json({ message: "Job not found" });
  res.json(job);
});

app.post("/api/jobs", authenticate, (req, res) => {
  const newJob = req.body;
  const id = jobs[jobs.length - 1].id + 1;
  newJob.id = id;
  jobs.push(newJob);
  res.status(201).json(newJob);
});

app.post("/api/auth/register", async (req, res) => {
  const { email, password } = req.body;

  const existing = users.find((u) => u.email === email);
  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, email, password: hashedPassword };
  users.push(newUser);
  res.status(201).json({ message: "User created" });
});

app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const user = users.find((u) => u.email === email);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "24h" });
  res.json({ token });
});

app.delete("/api/jobs/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = jobs.findIndex((j) => j.id === id);
  if (index === -1) return res.status(404).json({ message: "Job not found" });
  jobs.splice(index, 1);
  res.json({ message: "Job deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
