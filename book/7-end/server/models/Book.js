/* eslint-disable no-use-before-define */

const mongoose = require('mongoose');
const frontmatter = require('front-matter');
const generateSlug = require('../utils/slugify');
// const Chapter = require('./Chapter');
const { getCommits, getContent } = require('../github');
const logger = require('../logs');

const { Schema } = mongoose;

const mongoSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  githubRepo: {
    type: String,
    required: true,
  },
  githubLastCommitSha: String,

  createdAt: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

class BookClass {
  static async list({ offset = 0, limit = 10 } = {}) {
    const books = await this.find({})
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);
    return { books };
  }

  static async getBySlug({ slug }) {
    const bookDoc = await this.findOne({ slug });
    if (!bookDoc) {
      throw new Error('Book not found');
    }

    const book = bookDoc.toObject();

    book.chapters = (await Chapter.find({ bookId: book._id }, 'title slug').sort({ order: 1 })).map(
      (chapter) => chapter.toObject(),
    );
    return book;
  }

  static async add({ name, price, githubRepo }) {
    const slug = await generateSlug(this, name);
    if (!slug) {
      throw new Error(`Error with slug generation for name: ${name}`);
    }
    return this.create({
      name,
      slug,
      price,
      githubRepo,
      createdAt: new Date(),
    });
  }

  static async edit({ id, name, price, githubRepo }) {
    const book = await this.findById(id, 'slug name');

    if (!book) {
      throw new Error('Book is not found by id');
    }

    const modifier = { price, githubRepo };

    if (name !== book.name) {
      modifier.name = name;
      modifier.slug = await generateSlug(this, name);
    }

    const editedBook = await this.findOneAndUpdate(
      { _id: id },
      { $set: modifier },
      { fields: 'slug', new: true },
    );

    return editedBook;
  }

  static async syncContent({ id, githubAccessToken }) {
    const book = await this.findById(id, 'githubRepo githubLastCommitSha');

    if (!book) {
      throw new Error('Book not found');
    }

    const lastCommit = await getCommits({
      accessToken: githubAccessToken,
      repoName: book.githubRepo,
      limit: 1,
    });

    if (!lastCommit || !lastCommit.data || !lastCommit.data[0]) {
      throw new Error('No change in content!');
    }

    const lastCommitSha = lastCommit.data[0].sha;
    if (lastCommitSha === book.githubLastCommitSha) {
      throw new Error('No change in content!');
    }

    const mainFolder = await getContent({
      accessToken: githubAccessToken,
      repoName: book.githubRepo,
      path: '',
    });

    await Promise.all(
      mainFolder.data.map(async (f) => {
        if (f.type !== 'file') {
          return;
        }

        if (f.path !== 'introduction.md' && !/chapter-([0-9]+)\.md/.test(f.path)) {
          return;
        }

        const chapter = await getContent({
          accessToken: githubAccessToken,
          repoName: book.githubRepo,
          path: f.path,
        });

        const data = frontmatter(Buffer.from(chapter.data.content, 'base64').toString('utf8'));

        data.path = f.path;

        try {
          await Chapter.syncContent({ book, data });
          logger.info('Content is synced', { path: f.path });
        } catch (error) {
          logger.error('Content sync has error', { path: f.path, error });
        }
      }),
    );

    return book.updateOne({ githubLastCommitSha: lastCommitSha });
  }
}

mongoSchema.loadClass(BookClass);

const Book = mongoose.model('Book', mongoSchema);

module.exports = Book;

const Chapter = require('./Chapter');
