const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/?authMechanism=DEFAULT', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


const postSchema = new mongoose.Schema({
  text: String,
  date: Date,
});

const Post = mongoose.model('Post', postSchema);

app.post('/api/posts', async (req, res) => {
  try {
    const post = new Post({
      text: req.body.text,
      date: new Date(),
    });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred.' });
  }
});

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred.' });
  }
});


app.delete('/api/posts/:id', async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'An error occurred.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
