'use strict';

const webpack = require( 'webpack' ),
	merge = require('webpack-merge'),
	CleanPlugin = require('clean-webpack-plugin'),
	MiniCssExtractPlugin = require("mini-css-extract-plugin"),
	CopyGlobsPlugin = require('copy-globs-webpack-plugin'),
	FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin'),
	UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
	path = require('path'),
	resolve = require('resolve');

const config = require( './config' );

const assetsFilenames = (config.enabled.cacheBusting) ? config.cacheBusting : '[name]';

let webpackConfig = {
	context: config.paths.assets,
	entry: config.entry,
	devtool: ( config.enabled.sourceMaps ? '#source-map' : undefined ),
	output: {
		path: config.paths.dist,
		publicPath: config.publicPath,
		filename: `js/${assetsFilenames}.js`,
	},
	stats: {
	   hash: false,
	   version: false,
	   timings: false,
	   children: false,
	   errors: false,
	   errorDetails: false,
	   warnings: false,
	   chunks: false,
	   modules: false,
	   reasons: false,
	   source: false,
	   publicPath: false
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				include: config.paths.assets,
				use: 'eslint',
			},
			{
				enforce: 'pre',
				test: /\.(js|s?[ca]ss)$/,
				include: config.paths.assets,
				loader: 'import-glob',
			},
			{
				test: path.resolve(__dirname, "../../node_modules/smooth-scrolling"),
				loader: 'ify-loader'
			},	
			{
				test: /\.js$/,
				exclude: [/(node_modules|bower_components)(?![/|\\](bootstrap|foundation-sites))/],
				use: [
					{ loader: 'cache' },
					{ 
						loader: 'babel',
						options: {
							presets: ['@babel/preset-env']
						} 
					},
				],
			},			
			{
				test: /\.css$/,
				include: config.paths.assets,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'cache' },
					{ 
						loader: 'css', 
						options: { sourceMap: config.enabled.sourceMaps } 
					},
					{
						loader: 'postcss', 
						options: {
							config: { path: __dirname, ctx: config },
							sourceMap: config.enabled.sourceMaps,
						},
					},
				]
			},
			{
				test: /\.scss$/,
				include: config.paths.assets,
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: 'cache' },
					{ loader: 'css', options: { sourceMap: config.enabled.sourceMaps } },
					{
						loader: 'postcss', options: {
							config: { path: __dirname, ctx: config },
							sourceMap: config.enabled.sourceMaps,
						},
					},
					{ loader: 'resolve-url', options: { sourceMap: config.enabled.sourceMaps } },
					{ loader: 'sass-loader', options: { implementation: "sass", sourceMap: config.enabled.sourceMaps } },					
				],
			},
			{
				test: /\.(ttf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
				include: config.paths.assets,
				loader: 'url',
				options: {
					limit: 4096,
					name: `[path]${assetsFilenames}.[ext]`,
				},
			},
			{
				test: /\.modernizrrc.js$/,
				use: [ 'modernizr-loader' ]
			},
			{
				test: /\.modernizrrc(\.json)?$/,
				use: [ 'modernizr-loader', 'json-loader' ]
			}			
		]
	},
	resolve: {
		modules: [
			config.paths.assets,
			'node_modules',
			'bower_components',
		],
		enforceExtension: false,
		alias: {
			"modernizr$": path.resolve(__dirname, "./.modernizrrc")
    	}		
	},
	resolveLoader: {
		moduleExtensions: ['-loader'],
	},
	externals: {
		jquery: 'jQuery'
	},		
	plugins: [
		new CleanPlugin([config.paths.dist], {
			root: config.paths.root,
			verbose: false,
		}),
		new CopyGlobsPlugin({
			pattern: config.copy,
			output: `[path]${assetsFilenames}.[ext]`,
			manifest: config.manifest,
		}),
		new MiniCssExtractPlugin({
			filename: `css/${assetsFilenames}.css`,
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: config.enabled.optimize,
			debug: config.enabled.watcher,
			stats: { colors: true },
		}),
		new webpack.LoaderOptionsPlugin({
			test: /\.s?css$/,
			options: {
				output: { path: config.paths.dist },
				context: config.paths.assets,
			},
		}),
		new webpack.LoaderOptionsPlugin({
			test: /\.js$/,
			options: {
				eslint: { 
					failOnWarning: false, 
					failOnError: true,
					fix: true
				},
			},
		}),
		new FriendlyErrorsWebpackPlugin()
	]
};


if (config.enabled.optimize) {
	webpackConfig = merge(webpackConfig, require('./webpack.config.optimize'));
}

if (config.env.production) {
	webpackConfig.plugins.push(new webpack.NoEmitOnErrorsPlugin());
}

if (config.enabled.cacheBusting) {
	const WebpackAssetsManifest = require('webpack-assets-manifest');

	webpackConfig.plugins.push(
		new WebpackAssetsManifest({
			output: 'assets.json',
			space: 2,
			writeToDisk: false,
			assets: config.manifest,
			replacer: require('./util/assetManifestsFormatter'),
		})
	);
}

if (config.enabled.watcher) {
	webpackConfig.entry = require('./util/addHotMiddleware')(webpackConfig.entry);
	webpackConfig = merge(webpackConfig, require('./webpack.config.watch'));
}

module.exports = webpackConfig;
