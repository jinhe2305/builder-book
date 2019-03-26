const mongoose = require('mongoose');
const _ = require('lodash');
const logger = require('../logs');

const { Schema } = mongoose;

const mongoSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subject: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const EmailTemplate = mongoose.model('EmailTemplate', mongoSchema);

async function getEmailTemplate(name, params) {
  const source = await EmailTemplate.findOne({ name });
  if (!source) {
    throw new Error(`No EmailTemplates found.
      Please check that at least one is generated at server startup,
      restart your server and try again.`);
  }

  return {
    message: _.template(source.message)(params),
    subject: _.template(source.subject)(params),
  };
}

async function insertTemplates() {
  const templates = [
    {
      name: 'welcome',
      subject: 'Welcome to builderbook.org',
      message: `<%= userName %>,
        <p>
          Thanks for signing up for Builder Book!
        </p>
        <p>
          In our books, we teach you how to build complete, production-ready web apps from scratch.
        </p>

        Kelly & Timur, Team Builder Book
      `,
    },
  ];

  const updates = _.reduce(
    templates,
    (res, template) => {
      res.push(EmailTemplate.updateOne({ name: template.name }, template, { upsert: true }));
      return res;
    },
    [],
  );
  return Promise.all(updates).catch((error) => {
    logger.error('EmailTemplate insertion error: ', error);
    throw error;
  });
}

exports.insertTemplates = insertTemplates;
exports.getEmailTemplate = getEmailTemplate;
