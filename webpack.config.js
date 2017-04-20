var webpack = require("webpack");
var path = require("path");
var DEV = path.resolve(__dirname, "code/react");
var OUTPUT = path.resolve(__dirname, "output");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

 
var config = {
  entry: DEV + "/index.jsx",
  output: {
    path: OUTPUT,
    filename: "myCode.js"
  },
  module: {
    loaders: [{
        include: DEV,
        loader: "babel-loader",
    },{
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader','sass-loader']
        })
    }]
  },
  plugins: [
        new ExtractTextPlugin({
          filename: 'style.css',
          allChunks: true
        })
    ]
};
 
module.exports = config;