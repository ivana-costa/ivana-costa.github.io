var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: "development",
	entry: path.resolve(__dirname, 'src') + '/assets/js/app.js',
	output: {
		path: path.join(__dirname, "/dist/assets/js"),
		filename: "index.bundle.js"
	},
	devServer: {
		contentBase: path.join(__dirname, 'dist'),
		compress: true,
		port: 9000
	}
};
