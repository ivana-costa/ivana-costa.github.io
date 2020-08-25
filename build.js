
var path = require('path');
var metalsmith = require('metalsmith');
var permalinks = require('metalsmith-permalinks');
var assets = require('metalsmith-assets');
var collections = require('metalsmith-collections');
var markdown = require('metalsmith-markdown');
var templates = require('metalsmith-templates');
// var webpack = require('metalsmith-webpack');

metalsmith(__dirname)
	.source('src/html')
	.use(collections({
		articles: {
			pattern: 'blog/**/*.md',
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
	// .use(webpack({
	// 	context: path.resolve(__dirname, './src/assets/js/'),
	// 	entry: './app.js',
	// 	output: {
	// 		path: path.resolve(__dirname, './dist/assets/js/'),
	// 		filename: 'app.js'
	// 	}
	// }))
	.destination('dist')
	.build(function (err) {
		if (err) throw err;
		console.log('Finished building :)');
	});
