'use strict';

var gulp = require('gulp');
var gulpUtil = require('gulp-util');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');

var WebpackDevServer = require('webpack-dev-server');

gulp.task('default', ['watch']);

gulp.task('watch', ['webpack:build-dev'], function () {
	gulp.watch(['js/**/*'], ['webpack:build-dev']);
});

gulp.task('production', ['webpack:build']);

gulp.task('webpack:build', function(callback) {
	var buildConfig = Object.create(webpackConfig);
	buildConfig.plugins = buildConfig.plugins || [];
	buildConfig.plugins = buildConfig.plugins.concat(
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
	);

	webpack(buildConfig, function (err, status) {
		if (err) {
			throw new gulpUtil.PluginError('webpack:build', err);
		}
		gulpUtil.log('[webpack:build]', status.toString({colors: true}));
		callback();
	});
});

gulp.task('webpack:build-dev', function (callback) {
	var buildConfig = Object.create(webpackConfig);
	buildConfig.devtool = 'sourcemap';
	buildConfig.debug = true;

	webpack(buildConfig, function (err, status) {
		if (err) {
			throw new gulpUtil.PluginError('webpack:build-dev', err);
		}
		gulpUtil.log('[webpack:build-dev]', status.toString({colors: true}));
		callback();
	});
});

