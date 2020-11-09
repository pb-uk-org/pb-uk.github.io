// site/plugins/pbuk.js

const { DateTime } = require('luxon');
const yaml = require('js-yaml');

function hasTag(collection, tag, assert) {
  if (assert === false) {
    return collection.filter(
      (post) => !(post.data.tags && post.data.tags.includes(tag))
    );
  }
  return collection.filter(
    (post) => post.data.tags && post.data.tags.includes(tag)
  );
}

function getBreadcrumbs(post) {
  const parts = post.url.substring(1, post.url.length - 1).split('/');
  let url = '/';
  return parts.map((part) => {
    url += `${part}/`;
    return { text: part, url };
  });
}

function sortByLocation(collection) {
  return collection
    .map((post) => {
      return {
        breadcrumbs: getBreadcrumbs(post),
        post,
      };
    })
    .sort((a, b) =>
      a.post.url < b.post.url ? -1 : a.post.url > b.post.url ? 1 : 0
    );
}

function friendlyDate(dateObj) {
  return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('d LLLL yyyy');
}

const filters = {
  hasTag,
  sortByLocation,
  getBreadcrumbs,
  friendlyDate,
};

module.exports = (eleventyConfig) => {
  // Allow yaml in /site/data.
  eleventyConfig.addDataExtension('yaml', (contents) =>
    yaml.safeLoad(contents)
  );
  Object.entries(filters).forEach(([name, filter]) =>
    eleventyConfig.addFilter(name, filter)
  );
  eleventyConfig.addLayoutAlias('page', 'page.njk');
};
