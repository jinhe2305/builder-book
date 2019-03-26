const express = require('express');
const Book = require('../models/Book');
const User = require('../models/User');
const { getRepos } = require('../github');
const logger = require('../logs');

const router = express.Router();

router.use((req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  next();
});

router.get('/books', async (req, res) => {
  try {
    const books = await Book.list();
    res.json(books);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.post('/books/add', async (req, res) => {
  try {
    const book = await Book.add(Object.assign({ userId: req.user.id }, req.body));
    res.json(book);
  } catch (err) {
    logger.error(err);
    res.json({ error: err.message || err.toString() });
  }
});

router.post('/books/edit', async (req, res) => {
  try {
    const editedBook = await Book.edit(req.body);
    res.json(editedBook);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.get('/books/detail/:slug', async (req, res) => {
  try {
    const book = await Book.getBySlug({ slug: req.params.slug });
    res.json(book);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

// github-related

router.post('/books/sync-content', async (req, res) => {
  const { bookId } = req.body;

  const user = await User.findById(req.user._id, 'isGithubConnected githubAccessToken');

  if (!user.isGithubConnected || !user.githubAccessToken) {
    res.json({ error: 'Github not connected' });
    return;
  }

  try {
    await Book.syncContent({ id: bookId, githubAccessToken: user.githubAccessToken });
    res.json({ done: 1 });
  } catch (err) {
    logger.error(err);
    res.json({ error: err.message || err.toString() });
  }
});

router.get('/github/repos', async (req, res) => {
  const user = await User.findById(req.user._id, 'isGithubConnected githubAccessToken');

  if (!user.isGithubConnected || !user.githubAccessToken) {
    res.json({ error: 'Github not connected' });
    return;
  }

  try {
    const response = await getRepos({ accessToken: user.githubAccessToken });
    res.json({ repos: response.data });
  } catch (err) {
    logger.error(err);
    res.json({ error: err.message || err.toString() });
  }
});

module.exports = router;
