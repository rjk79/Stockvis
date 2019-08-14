const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const outputDir = "./dist";

module.exports = {
    entry: path.resolve(__dirname, "src", "index.js"), //
    output: {
        path: path.join(__dirname, outputDir),
        filename: "[name].js",
        publicPath: "/dist/"
    },
    resolve: {
        extensions: [".js"] // if we were using React.js, we would include ".jsx"
    },
    module: {
        rules: [
            {
                test: /\.js$/, // if we were using React.js, we would use \.jsx?$/
                use: {
                    loader: "babel-loader",
                    options: { presets: ["env"] } // if we were using React.js, we would include "react"
                }
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader", "postcss-loader"],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.scss/,
                use: ExtractTextPlugin.extract({
                    use: ["css-loader", "sass-loader", "postcss-loader"],
                    fallback: "style-loader"
                })
            }
        ]
    },
    plugins: [new ExtractTextPlugin("[name].css"), require("autoprefixer")]
};