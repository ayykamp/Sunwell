const path = require("path");
const webpack = require("webpack");
const nodeExternals = require("webpack-node-externals");

const PROD = process.env.NODE_ENV === "production";
const PLATFORM = process.env.PLATFORM || "node";

let plugins = [
	new webpack.DefinePlugin({
		"process.env.PLATFORM": JSON.stringify(PLATFORM),
	}),
	new webpack.ProvidePlugin({
		process: "process/browser",
	}),
	new webpack.ProvidePlugin({
		Buffer: ['buffer', 'Buffer'],
	}),
];

module.exports = [
	{
		name: "sunwell",
		target: PLATFORM,
		entry: {
			sunwell: path.join(__dirname, "src/Sunwell.ts"),
		},
		output: {
			path: path.resolve(__dirname, "dist"),
			filename: PROD ? "[name].min.js" : "[name].js",
			library: {
				type: 'module',
			},
		},
		resolve: {
			extensions: [".webpack.js", ".web.js", ".ts", ".js"],
			fallback: {
				assert: require.resolve("assert"),
			},
		},
		externals: PLATFORM === "node" ? [nodeExternals()]: [],
		module: {
			rules: [
				{
					enforce: 'post',
					test: /linebreak[/\\]src[/\\]linebreaker.js/,
					loader: 'transform-loader',
					options: {
						brfs: {}
					}
				},
				{
        	test: /\.ts?$/,
        	use: 'ts-loader',
        	exclude: /node_modules/,
				},
			],
		},
		optimization: {
			minimize: PROD
		},
		mode: PROD ? 'production': 'development',
		plugins,
		experiments: {
			outputModule: true,
		},
	},
];
