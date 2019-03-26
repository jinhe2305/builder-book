const express = require('express');
const _ = require('lodash');

const Book = require('../models/Book');
const Chapter = require('../models/Chapter');
const Review = require('../models/Review');
const Tutorial = require('../models/Tutorial');
const { subscribe } = require('../mailchimp');

const router = express.Router();

router.get('/books', async (req, res) => {
  try {
    const books = await Book.list();
    res.json(books);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.get('/books/:slug', async (req, res) => {
  try {
    const book = await Book.getBySlug({ slug: req.params.slug });
    res.json(book);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.get('/get-chapter-detail', async (req, res) => {
  try {
    const { bookSlug, chapterSlug } = req.query;
    const chapter = await Chapter.getBySlug({
      bookSlug,
      chapterSlug,
      userId: req.user && req.user.id,
      isAdmin: req.user && req.user.isAdmin,
    });
    res.json(chapter);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.get('/get-table-of-contents', async (req, res) => {
  try {
    const book = await Book.findOne({ slug: req.query.slug }, 'id');
    if (!book) {
      throw new Error('Not found');
    }

    const chapters = await Chapter.find(
      { bookId: book.id, order: { $gt: 1 } },
      'sections title slug',
    ).sort({ order: 1 });

    res.json(chapters);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.get('/get-book-reviews', async (req, res) => {
  try {
    const reviewDoc = await Review.findOne({ bookSlug: req.query.slug }, 'reviews').lean();
    const reviews = _.sortBy(reviewDoc.reviews, 'order');
    res.json(reviews);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.get('/get-tutorials', async (req, res) => {
  try {
    const tutorialDoc = await Tutorial.findOne({ bookSlug: req.query.slug }, 'tutorials').lean();
    const tutorials = _.sortBy(tutorialDoc.tutorials, 'order');
    res.json(tutorials);
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});

router.post('/subscribe-to-tutorials', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.json({ error: 'Email is required' });
    return;
  }

  try {
    await subscribe({ email, listName: 'tutorials' });
    res.json({ subscribed: 1 });
  } catch (err) {
    res.json({ error: err.message || err.toString() });
  }
});


module.exports = router;
