const express = require("express");
const app = express();

const requestLogger = (req, res, next) => {
  console.log("😇 L-6 in index.js=> ", "Method: ", req.method);
  console.log("😇 L-7 in index.js=> ", "Path: ", req.path);
  console.log("😇 L-8 in index.js=> ", "Body: ", req.body);
  console.log("---");
  next();
};

app.use(requestLogger);
let notes = [
  {
    id: 1,
    content: "HTML is easy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
];

// To get all the data from the notes array 🫴
app.get("/api/notes", (req, res) => {
  res.json(notes);
});

// To get a single note from the notes array 🐪
app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const filteredData = notes.filter((notes) => notes.id === id);
  if (filteredData.length === 0) {
    res.status(404).end();
  } else {
    res.json(filteredData);
  }
});

// To delete a single note from the notes array 🚮
app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((notes) => notes.id !== id);
  res.status(204).end();
});

// To add a new note to the notes array ➕
app.use(express.json());
const generateID = () => {
  const maxID = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxID + 1;
};
app.post("/api/notes", (req, res) => {
  const body = req.body;
  if (!body.content) {
    return res.status(400).json({ error: "content missing" });
  }
  const newNote = {
    id: generateID(),
    content: body.content,
    important: body.important || false,
  };
  notes = notes.concat(newNote);
  console.log("😇 L-53 in index.js=> ", notes);
  res.json(newNote);
});

const unkonwReq = (req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};
app.use(unkonwReq);
const PORT = 3001;
app.listen(PORT, () => {
  console.log("😇 L-32 in index.js=> ", `Running on port ${PORT}`);
});
