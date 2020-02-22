const path = require("path");
const nodeExternals = require("webpack-node-externals");
const WebpackShellPlugin = require("webpack-shell-plugin");

const Dotenv = require("dotenv-webpack");

const { NODE_ENV = "production" } = process.env;

module.exports = {
  entry: "./src/index.ts",
  mode: NODE_ENV,
  target: "node",
  watch: NODE_ENV === "development",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "index.js"
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      src: path.resolve(__dirname, "src")
    }
  },
  plugins: [
    new WebpackShellPlugin({
      onBuildEnd: ["yarn run:dev"]
    }),
    // https://www.npmjs.com/package/dotenv-webpack
    new Dotenv()
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ["ts-loader"]
      }
    ]
  }
};
