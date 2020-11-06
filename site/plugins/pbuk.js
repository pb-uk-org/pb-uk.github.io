// site/plugins/pbuk.js

const yaml = require('js-yaml');

function hasTag(collection, tag, assert) {
  if (assert === false) {
    return collection.filter(post => !(post.data.tags && post.data.tags.includes(tag)));
  }
  return collection.filter(post => post.data.tags && post.data.tags.includes(tag));
}

function sortByLocation(collection) {
  return collection;
}

module.exports = (eleventyConfig) => {
  // Allow yaml in /site/data.
  eleventyConfig.addDataExtension('yaml', (contents) =>
    yaml.safeLoad(contents)
  );
  eleventyConfig.addLayoutAlias('page', 'page.njk');
  eleventyConfig.addFilter('hasTag', hasTag);
  eleventyConfig.addFilter('sortByLocation', sortByLocation);
};
