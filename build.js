
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
  .use(assets({
    source: 'src/assets/',
    destination: './assets'
  }))
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
