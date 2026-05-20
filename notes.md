# How to create a React component

function ComponentName({prop1, prop2}) {
return (

<div></div
)

}

export default ComponentName;

# How to use useState

import { useState} from "react";

const [value, setValue] = useState("");

# How to fetch data in useEffect

import { useEffect } from "react";

useEffect(() => {
const fetchData = async () => {
const response = await fetch("url");
const data = await response.json();
setValue(data)

    };
    fetchData()

}, []) <-- [] means "run once when the component first loads"

# How to map over an array in JSX

const items = [{ id: 1, name: "React" }, { id: 2, name: "Node" }]

{items.map((item) => (
<JobCard key={item.id} item={item} />
))}

# try/catch/finally — for async operations that can fail

try {
// code that might fail (fetch, etc)
const response = await fetch("url");
const data = await response.json();
setJobs(data); // success — save the data
} catch(err) {
setError(err.message); // something went wrong — save the error
} finally {
setLoading(false); // always runs — stop loading
}

# When to use it

- Always wrap fetch calls in try/catch
- finally runs whether it succeeded or failed
- catch gives you the error message via err.message

# .filter() — keep only items that pass a test

const filteredJobs = jobs.filter((job) => {
return job.title.toLowerCase().includes(search.toLowerCase());
});

# Rules

- Returns a NEW array, doesn't change the original
- Return true = keep the item
- Return false = remove the item
- Always lowercase both sides for case-insensitive search

# Common uses

jobs.filter((job) => job.type === "Full-time") // exact match
jobs.filter((job) => job.salary > 30000) // number comparison
jobs.filter((job) => job.title.includes(search)) // search text

# response.ok — check if API request succeeded

const response = await fetch("url");

if (!response.ok) throw new Error("Something went wrong");
// response.ok is true for 200-299 status codes
// response.ok is false for 404, 500 etc

const data = await response.json();

# Why it matters

- fetch() does NOT throw an error on 404 or 500
- You must check response.ok manually
- Throwing inside try{} sends it to catch(err)

# HTTP status codes to know

200 = OK
201 = Created
400 = Bad request
401 = Unauthorized (no token)
404 = Not found
500 = Server error

# useState — remember values that can change

import { useState } from "react";

const [value, setValue] = useState(initialValue);

# The three parts

- value → the current value (read this)
- setValue → the function to update it (call this)
- initialValue → what it starts as

# Common initial values

useState("") // empty string — for text inputs
useState(null) // null — for data not loaded yet
useState(true) // true — for loading state
useState(false) // false — for toggles
useState([]) // empty array — for lists

# Rules

- Never change value directly: value = "new" ❌
- Always use the setter: setValue("new") ✅
- Every time setValue is called, React re-renders the component
- Always declare at the top of the component, never inside loops or if statements

# Example

const [search, setSearch] = useState("");

// when user types:
setSearch(e.target.value) // updates search, triggers re-render

// when displaying:
<input value={search} /> // shows current value

# BrowserRouter — enables navigation in React

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

# Basic setup in App.jsx

function App() {
return (
<BrowserRouter>
<Navbar /> // outside Routes — shows on every page

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
      </Routes>
    </BrowserRouter>

);
}

# Link — navigate without page reload

<Link to="/">Home</Link>
<Link to={`/jobs/${job.id}`}>View Job</Link>

# useParams — read dynamic values from the URL

const { id } = useParams();
// URL: /jobs/3 → id = "3" (always a string, use parseInt)

# useNavigate — navigate programmatically

const navigate = useNavigate();
navigate("/"); // go to home
navigate(-1); // go back

# Rules

- BrowserRouter wraps everything in App.jsx
- Routes contains only Route components
- Navbar goes outside Routes so it shows on every page
- Never use <a href> for internal links — always use <Link>
- :id in path means dynamic segment — matches any value

# Express Server — complete structure

## 1. Imports

import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

## 2. Constants

const JWT_SECRET = "your_secret_key";
const PORT = 3001;
const app = express();

## 3. Middleware — always before routes

app.use(cors()); // allows React to call the API
app.use(express.json()); // reads JSON from request body

## 4. Data (until you have a real database)

const jobs = []; // array of job objects
const users = []; // array of user objects

## 5. Authenticate middleware — protects routes

const authenticate = (req, res, next) => {
const authHeader = req.headers.authorization;

if (!authHeader) {
return res.status(401).json({ message: "No token provided" });
}

const token = authHeader.split(" ")[1]; // "Bearer <token>" → get token part

try {
const decoded = jwt.verify(token, JWT_SECRET);
req.userId = decoded.userId;
next(); // allow request to continue
} catch {
return res.status(401).json({ message: "Invalid token" });
}
};

## 6. Job routes

### GET all jobs

app.get("/api/jobs", (req, res) => {
res.json(jobs);
});

### GET one job

app.get("/api/jobs/:id", (req, res) => {
const id = parseInt(req.params.id);
const job = jobs.find((j) => j.id === id);
if (!job) return res.status(404).json({ message: "Job not found" });
res.json(job);
});

### POST new job (protected)

app.post("/api/jobs", authenticate, (req, res) => {
const newJob = req.body;
const id = jobs[jobs.length - 1].id + 1;
newJob.id = id;
jobs.push(newJob);
res.status(201).json(newJob);
});

### DELETE job

app.delete("/api/jobs/:id", (req, res) => {
const id = parseInt(req.params.id);
const index = jobs.findIndex((j) => j.id === id);
if (index === -1) return res.status(404).json({ message: "Job not found" });
jobs.splice(index, 1);
res.json({ message: "Job deleted" });
});

## 7. Auth routes

### Register

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

### Login

app.post("/api/auth/login", async (req, res) => {
const { email, password } = req.body;

const user = users.find((u) => u.email === email);
if (!user) {
return res.status(400).json({ message: "Invalid credentials" });
}

const valid = await bcrypt.compare(password, user.password);
if (!valid) {
return res.status(400).json({ message: "Invalid credentials" });
}

const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "24h" });
res.json({ token });
});

## 8. Start server — always last

app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

## Key rules to remember

- Middleware goes before routes
- authenticate goes between route path and handler: app.post("/path", authenticate, handler)
- app.listen always goes at the bottom
- bcrypt.hash — use when saving password (register)
- bcrypt.compare — use when checking password (login)
- jwt.sign — creates token (login)
- jwt.verify — checks token (authenticate middleware)
- req.params.id — from URL (/jobs/3)
- req.body — from request body (POST)
- res.json() — send data
- res.status(404).json() — send error with status code

# handleSubmit — handle form submission

const handleSubmit = async () => {
try {
const response = await fetch("http://localhost:3001/api/auth/login", {
method: "POST", // GET is default, POST must be specified
headers: { "Content-Type": "application/json" }, // tells server we're sending JSON
body: JSON.stringify({ email, password }), // converts JS object to JSON string
});

    if (!response.ok) throw new Error("Request failed");

    const data = await response.json();            // parse the response
    localStorage.setItem("token", data.token);     // save token to browser storage

} catch (err) {
setError(err.message); // show error to user
}
};

# Key concepts

## fetch options

fetch(url, {
method: "POST", // "GET", "POST", "DELETE", "PUT"
headers: {
"Content-Type": "application/json" // always include when sending JSON
},
body: JSON.stringify(data) // always stringify objects before sending
})

## localStorage — save data in the browser

localStorage.setItem("token", value) // save
localStorage.getItem("token") // read
localStorage.removeItem("token") // delete

# When to use handleSubmit

- Login form → POST credentials, save token
- Register form → POST new user data
- Post a job form → POST job data with token in headers

# Sending token with protected requests

const token = localStorage.getItem("token");

fetch("http://localhost:3001/api/jobs", {
method: "POST",
headers: {
"Content-Type": "application/json",
"Authorization": `Bearer ${token}` // ← send token here
},
body: JSON.stringify(jobData)
})
