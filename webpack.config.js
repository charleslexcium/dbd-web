const webpack = require('webpack');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'dist/');
const APP_DIR = path.resolve(__dirname, 'src/');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const appUrl = (process.env.NODE_ENV !== 'prod') ? `https://register.${process.env.NODE_ENV}.neithing.com` : 'https://register.neithing.com';
const serviceUrl = (process.env.NODE_ENV !== 'prod') ? `https://bff.${process.env.NODE_ENV}.neithing.com` : 'https://bff.neithing.com';
const authUrl = (process.env.NODE_ENV !== 'prod') ? `https://auth.${process.env.NODE_ENV}.neithing.com` : 'https://auth.neithing.com';

const appEnv = (process.env.NODE_ENV === 'local') ? new webpack.DefinePlugin({
  "process.env.REACT_APP_URL": '"http://localhost:3000"',
  "process.env.REACT_APP_BFF_URL": '"http://localhost:8091/web/v1"',
  "process.env.REACT_APP_AUTH_URL": '"https://auth.dev.neithing.com"',
  "process.env.REACT_APP_AUTH_REALM": '"test"',
  "process.env.REACT_APP_AUTH_CLIENT_ID": '"test-client"',
}) : new webpack.DefinePlugin({
  "process.env.REACT_APP_URL": `"${appUrl}"`,
  "process.env.REACT_APP_BFF_URL": `"${serviceUrl}/web/v1"`,
  "process.env.REACT_APP_AUTH_URL": `"${authUrl}"`,
  "process.env.REACT_APP_AUTH_REALM": '"test"',
  "process.env.REACT_APP_AUTH_CLIENT_ID": '"test-client"',
});

module.exports = {
  mode: 'production',
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  devServer: {
    static: {
      directory: BUILD_DIR,
    },
    port: 3000,
    historyApiFallback: true,
    open: true,
    hot: 'only',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    extensionAlias: {
      ".js": [".js", ".ts", ".jsx"],
      ".cjs": [".cjs", ".cts"],
      ".mjs": [".mjs", ".mts"]
    },
    fallback: {
      "crypto": false,
      "vm": false,
      "buffer": false,
      "stream": false,
    },
  },
  module: {
    rules: [
      {
        loader: "ts-loader",
        test: /\.([cm]?ts|tsx)$/,
        exclude: /node_modules/
      },
      {
        loader: 'babel-loader',
        test: /\.js$|jsx/,
        exclude: /node_modules/
      },
      {
        test: /\.?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            "presets": [
              "@babel/preset-env",
              "@babel/preset-react"
            ],
            "plugins": [
              "macros",
              "@babel/plugin-proposal-class-properties",
              "@babel/transform-runtime"
            ]
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader'
          }
        ],
      },
      {
        test: /\.(ttf|svg|png|jpg|svg|gif|woff|woff2|eot|ico)?$/i,
        type: 'asset/resource',
        exclude: /node_modules/,
        dependency: { not: ['url'] },
      }
    ]
  },
  plugins: [
    appEnv,
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      filename: path.join(__dirname, 'dist', 'index.html'),
      favicon: path.join(__dirname, 'public', 'favicon.ico'),
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'static' },
      ],
    }),
  ],
}
