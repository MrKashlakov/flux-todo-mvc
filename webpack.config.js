'use strict';
var path = require('path');
var webpack = require('webpack');

var extractTextPlugin = require('extract-text-webpack-plugin');
var postcssImport = require('postcss-import');
var postcssCustomProperties = require('postcss-custom-properties');
var postcssBemLinter = require('postcss-bem-linter');
var autoprefixer = require('autoprefixer');
var precss = require('precss');
var cssnano = require('cssnano');

module.exports = {
	entry: './js/app.js',
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /.js?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: [{
						plugins: ['transform-class-properties']
					}, 'es2015', 'react', 'stage-0']
				}
			},
			{
				test: /.post.css?$/,
				loader: extractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
			}
		]
	},
	postcss: [
		postcssImport({
			path: ['node_modules', './js']
		}),
		autoprefixer({browsers: ['last 2 versions']}),
		precss(),
		postcssBemLinter(),
		postcssCustomProperties(),
		cssnano()
	],
	plugins: [
		new extractTextPlugin('bundle.css')
	]
};