
var path = require('path');
var metalsmith = require('metalsmith');
var permalinks = require('metalsmith-permalinks');
var assets = require('metalsmith-assets');
var collections = require('metalsmith-collections');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
var watch = require('metalsmith-watch');
var serve = require('metalsmith-serve');

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
  .destination('dist')
  .use(
    watch({
      paths: {
        './src/html/*.html': '**/*.html',
        './src/html/articles/*': '**/*.md',
        './src/templates/*': '**/*.html',
      }
    })
  )
  .use(serve({
    port: 8081,
    verbose: true,
    http_error_files: {
      404: '/404'
    }
  }))
  .build(function (err) {
    if (err) throw err;
    console.log('Finished building :)');
  });
