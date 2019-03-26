const sm = require('sitemap');
const path = require('path');
const Chapter = require('./models/Chapter');

const sitemap = sm.createSitemap({
  hostname: 'https://builderbook.org',
  cacheTime: 6000000, // 6000 sec - cache purge period
});

function setup({ server }) {
  Chapter.find({}, 'slug').then((chapters) => {
    chapters.forEach((chapter) => {
      sitemap.add({
        url: `/books/builder-book/${chapter.slug}`,
        changefreq: 'daily',
        priority: 1,
      });
    });
  });

  sitemap.add({
    url: '/book',
    changefreq: 'daily',
    priority: 1,
  });

  sitemap.add({
    url: '/tutorials',
    changefreq: 'daily',
    priority: 1,
  });

  server.get('/sitemap.xml', (req, res) => {
    sitemap.toXML((err, xml) => {
      if (err) {
        res.status(500).end();
        return;
      }

      res.header('Content-Type', 'application/xml');
      res.send(xml);
    });
  });

  server.get('/robots.txt', (req, res) => {
    res.sendFile(path.join(__dirname, '../static', 'robots.txt'));
  });
}

module.exports = setup;
