
var path = require('path');
var metalsmith = require('metalsmith');
var permalinks = require('metalsmith-permalinks');
var assets = require('metalsmith-assets');
var collections = require('metalsmith-collections');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var watch = require('metalsmith-watch');
var sass = require('metalsmith-sass');
var metalsmithExpress = require('metalsmith-express');
var layouts = require('metalsmith-layouts');
var autoprefixer = require('metalsmith-autoprefixer');

metalsmith(__dirname)
  .source('src/html')
  .use(collections({
    articles: {
      pattern: 'articles/**/*.md',
      sortBy: 'date',
      reverse: true
    }
  }))
  .use(markdown({
    gfm: true,
    tables: true,
  }))
  .use(permalinks())
  .use(templates({
    engine: 'jade',
    directory: 'src/templates'
  }))
  // .use(layouts({
  //   pageExt: ['hbs', 'html'],
  //   partials: 'src/partials/*.{html}'
  // }))
  .use(assets({
    source: 'src/assets/',
    destination: './assets'
  }))
  .use(autoprefixer())
  .use(sass({
    sourceMap: true,
    sourceMapContents: true,
    outputDir: 'assets/css/'
  }))
  .destination('dist')
  .use(metalsmithExpress())
  .use(
    watch({
      paths: {
        './src/html/*.html': '**/*.html',
        './src/html/articles/*': '**/*.md',
        './src/templates/*': '**/*.html',
        './src/assets/scss/*': true,
        './src/assets/js/*': true,
      },
      livereload: true,
    })
  )
  .build(function (err) {
    if (err) throw err;
    console.log('Finished building :)');
  });
