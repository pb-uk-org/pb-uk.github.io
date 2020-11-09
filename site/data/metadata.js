const { version } = require('../../package.json');

module.exports = {
  title: 'PB UK',
  url: 'https://pb-uk.github.io/',
  description: "Paul's home page miscellany.",
  feed: {
    subtitle: "Paul's home page miscellany.",
    filename: 'feed.xml',
    path: '/feed/feed.xml',
    id: 'https://pb-uk.github.io/',
  },
  jsonfeed: {
    path: '/feed/feed.json',
    url: 'https://pb-uk.github.io/feed/feed.json',
  },
  author: {
    name: 'Paul',
    email: 'pb@pbuk.uk',
    url: 'https://pb-uk.github.io/about-me/',
  },
  version,
};
