const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
	const config = {
		splitChunks: {
			chunks: 'all',
		},
		runtimeChunk: isDev && {
			name: 'single',
		},
	}
	if (isProd) {
		config.minimizer = [new CssMinimizerPlugin(), new TerserPlugin()]
	}

	return config
}

const cssLoaders = (extra) => {
	const loaders = [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {},
		},
		'css-loader',
	]
	if (extra) {
		loaders.push(extra)
	}
	return loaders
}

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`)

const plugins = () => {
	const base = [
		new HTMLWebpackPlugin({
			template: './index.html',
			minify: {
				collapseWhitespace: isProd,
			},
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: filename('css'),
		}),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/favicon.ico'),
					to: path.resolve(__dirname, 'dist'),
				},
			],
		}),
	]

	if (isProd) {
		base.push(new BundleAnalyzerPlugin())
	}

	return base
}

console.log('isDev', isDev)

module.exports = {
	context: path.resolve(__dirname, 'src'),
	mode: 'development',
	entry: {
		main: ['@babel/polyfill', './index.js'],
		analytics: './analytics.ts',
	},
	output: {
		filename: filename('js'),
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
	},
	devtool: isDev ? 'source-map' : isDev,
	optimization: optimization(),
	plugins: plugins(),
	module: {
		rules: [
			{
				test: /\.css$/,
				use: cssLoaders(),
			},
			{
				test: /\.less$/,
				use: cssLoaders('less-loader'),
			},
			{
				test: /\.s[ac]ss$/,
				use: cssLoaders('sass-loader'),
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
			{
				test: /\.m?js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-proposal-class-properties'],
					},
				},
			},
			{
				test: /\.m?ts$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env', '@babel/preset-typescript'],
						plugins: ['@babel/plugin-proposal-class-properties'],
					},
				},
			},
		],
	},
}
