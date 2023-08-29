const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("posts.db");

app.get("/api/posts", (req, res) => {
  db.all("SELECT * FROM posts", (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Internal Server Error" });
    } else {
      res.json(rows);
    }
  });
});

app.post("/api/posts", (req, res) => {
  const { text } = req.body;
  if (text && text.length >= 2) {
    db.run("INSERT INTO posts (text, date) VALUES (?, ?)", [text, new Date()], (err) => {
      if (err) {
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(201).json({ message: "Post added successfully" });
      }
    });
  } else {
    res.status(400).json({ error: "Invalid post data" });
  }
});

// Add routes for updating and deleting posts

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, text TEXT, date TEXT)");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
