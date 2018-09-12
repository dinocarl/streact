const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");

module.exports = {
  entry: "./src/js/app.js",
  output: {
    path: path.resolve(__dirname, "dist/"),
    filename: "js/app.js"
  },
  plugins: [new HtmlWebpackPlugin({
    hash: true,
    title: 'Match Game 3000',
    template: './src/index.html',
    filename: './index.html'
  })],
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env"]
          }
        }
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ]
  },
  devServer: {
    contentBase: './dist'
  },
  devtool: 'source-map'
};
