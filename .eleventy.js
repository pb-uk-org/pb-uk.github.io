// .eleventy.js

// Require plugins.
const baseBlogPlugin = require('./site/plugins/eleventy-base-blog');
const markdownPlugin = require('./site/plugins/markdown');
const browserSyncPlugin = require('./site/plugins/browser-sync');

// Site configuration.
const notFoundPage = 'docs/404.html';
const passthrough = { 'site/assets': 'assets/css'};

// This is the object that will be returned by the exported function.
const eleventyOptions = {
  templateFormats: ['md', 'njk', 'html', 'liquid'],

  // If your site lives in a different subdirectory, change this.
  // Leading or trailing slashes are all normalized away, so don’t worry about those.

  // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
  // This is only used for link URLs (it does not affect your file structure)
  // Best paired with the `url` filter: https://www.11ty.dev/docs/filters/url/

  // You can also pass this in on the command line using `--pathprefix`
  // pathPrefix: "/",

  markdownTemplateEngine: 'liquid',
  htmlTemplateEngine: 'njk',
  dataTemplateEngine: 'njk',

  // Override default directories.
  dir: {
    output: 'docs', //_site
    input: 'site/content',
    // Relative to `input`.
    includes: '../includes', // _includes
    layouts: '../layouts',
    partials: '../partials',
    data: '../data', //_data
  },
};

module.exports = function (eleventyConfig) {

  eleventyConfig.setDataDeepMerge(true);

  // Plugins.
  eleventyConfig.addPlugin(baseBlogPlugin);
  eleventyConfig.addPlugin(markdownPlugin);
  eleventyConfig.addPlugin(browserSyncPlugin, { notFoundPage });

  // Static assets.
  eleventyConfig.addPassthroughCopy(passthrough);

  return eleventyOptions;
};
