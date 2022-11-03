const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
/**
 * @type {import('webpack').Configuration}
 */
module.exports = {
	mode: 'development',
	entry: './src/index.ts',
	output: {
		filename: 'main.js',
		path: path.join(__dirname, '/dist'),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.(png|jpe?g|gif|webp|svg)$/i,
				type: 'asset',
				parser: {
					dataUrlCondition: {
						maxSize: 4 * 1024,
					},
				},
				generator: {
					filename: '/static/images/[hash:8][ext]',
				},
			},
			{
				test: /\.html$/i,
				use: ['html-loader'],
			},
			{
				test: /\.css$/i,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					// {
					// 	loader: 'postcss-loader',
					// 	options: {
					// 		postCssOptions: {
					// 			plugins: ['postcss-preset-env'],
					// 		},
					// 	},
					// },
				],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
			},
			{
				test: /\.ts$/i,
				use: ['ts-loader'],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, './public/index.html'),
			filename: 'index.html',
			inject: 'body',
		}),
		new CssMinimizerPlugin(),
		new MiniCssExtractPlugin({
			filename: 'static/css/main.css',
			chunkFilename: 'static/css/[name].chunk.[contenthash:8].css',
		}),
	],
	devServer: {
		static: './dist',
		port: 8080,
	},
	resolve: {
		extensions: ['.js', '.ts'],
		alias: {
			'@': path.join(__dirname, 'src'),
		},
	},
	devtool: 'source-map',
}
