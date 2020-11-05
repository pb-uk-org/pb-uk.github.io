# eleventy-base-blog

A starter repository showing how to build a blog with the [Eleventy](https://github.com/11ty/eleventy) static site generator.

[![Build Status](https://travis-ci.org/11ty/eleventy-base-blog.svg?branch=master)](https://travis-ci.org/11ty/eleventy-base-blog)

## Demos

- [Netlify](https://eleventy-base-blog.netlify.com/)
- [GitHub Pages](https://11ty.github.io/eleventy-base-blog/)
- [Remix on Glitch](https://glitch.com/~11ty-eleventy-base-blog)

## Deploy this to your own site

These builders are amazing—try them out to get your own Eleventy site in a few clicks!

- [Get your own Eleventy web site on Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/11ty/eleventy-base-blog)
- [Get your own Eleventy web site on Vercel](https://vercel.com/import/project?template=11ty%2Feleventy-base-blog)

## Getting Started

### 1. Clone this Repository

```
git clone https://github.com/11ty/eleventy-base-blog.git my-blog-name
```

### 2. Navigate to the directory

```
cd my-blog-name
```

Specifically have a look at `.eleventy.js` to see if you want to configure any Eleventy options differently.

### 3. Install dependencies

```
npm install
```

### 4. Edit \_data/metadata.json

### 5. Run Eleventy

```
npx eleventy
```

Or build and host locally for local development

```
npx eleventy --serve
```

Or build automatically when a template changes:

```
npx eleventy --watch
```

Or in debug mode:

```
DEBUG=* npx eleventy
```

### Implementation Notes

- `about/index.md` shows how to add a content page.
- `posts/` has the blog posts but really they can live in any directory. They need only the `post` tag to be added to this collection.
- Add the `nav` tag to add a template to the top level site navigation. For example, this is in use on `index.njk` and `about/index.md`.
- Content can be any template format (blog posts needn’t be markdown, for example). Configure your supported templates in `.eleventy.js` -> `templateFormats`.
  - Because `css` and `png` are listed in `templateFormats` but are not supported template types, any files with these extensions will be copied without modification to the output (while keeping the same directory structure).
- The blog post feed template is in `feed/feed.njk`. This is also a good example of using a global data files in that it uses `_data/metadata.json`.
- This example uses three layouts:
  - `site/layouts/base.njk`: the top level HTML structure
  - `site/layouts/home.njk`: the home page template (wrapped into `base.njk`)
  - `site/layouts/post.njk`: the blog post template (wrapped into `base.njk`)
- `site/includes/postlist.njk` is a Nunjucks include and is a reusable component used to display a list of all the posts. `index.njk` has an example of how to use it.

### File structure

```bash
bin                    # Scripts.
docs                   # The public build directory.
site                   # The contents, tempates, data etc. for the site.
site/content           # Content goes here.
site/data              # Data goes here.
site/filters/index.js  # Filters exported here are added automagically.
site/layouts           # Layouts go here - they don't need prefixing in source files.
site/plugins/index.js  # Plugins exported here are added automagically.
site/static            # Contents of this directory are copied across to the site intact.
src                    # Site JavaScript and CSS (to be build by Webpack).
```

### Scripts

```bash
$ npm run build    # Build into dist for deployment (does not run Webpack).
$ npm run bundle   # Build Webpack module bundle.
$ npm run lint     # Check lint and prettier.
$ npm run lint:fix # Fix lint and prettier.
$ npm run watch    # ???
$ npm run serve    # Build and run a development server.
$ npm run debug    # Run a DEBUG build.
```
