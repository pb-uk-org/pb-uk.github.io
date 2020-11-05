// site/plugins/markdown.js

const markdownIt = require('markdown-it');
const markdownItAnchor = require('markdown-it-anchor');

module.exports = (eleventyConfig) => {
  /* Markdown Overrides */
  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  }).use(markdownItAnchor, {
    permalink: true,
    permalinkClass: 'direct-link',
    permalinkSymbol: '#',
  });
  eleventyConfig.setLibrary('md', markdownLibrary);
};
