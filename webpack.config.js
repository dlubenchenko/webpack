const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all',
		},
	}
	if (isProd) {
		config.minimizer = [new CssMinimizerPlugin(), new TerserPlugin()]
	}

	return config
}

console.log('isDev', isDev)

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: './index.js',
		analytics: './analytics.js',
	},
	output: {
		filename: '[name].[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
	},
	resolve: {
		extensions: ['.js', '.json', '.png'],
		alias: {
			'@models': path.resolve(__dirname, './src/models'),
			'@': path.resolve(__dirname, './src'),
		},
	},
	devServer: {
		port: 4200,
		hot: isDev,
	},
	optimization: optimization(),
	plugins: [
		new HTMLWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: isProd,
			},
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/favicon.ico'),
					to: path.resolve(__dirname, 'dist'),
				},
			],
		}),
	],
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {},
					},
					'css-loader',
				],
			},
			{
				test: /\.(png|jpg|svg|gif)/,
				use: ['file-loader'],
			},
			{
				test: /\.(ttf|woff|woff2|eot)/,
				use: ['file-loader'],
			},
			{
				test: /\.xml/,
				use: ['xml-loader'],
			},
			{
				test: /\.csv/,
				use: ['csv-loader'],
			},
		],
	},
}
