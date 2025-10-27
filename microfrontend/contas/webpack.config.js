const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { container: { ModuleFederationPlugin } } = require('webpack');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/bootstrap.js',
    mode: argv.mode || 'development',
    devServer: {
      port: 3001,
      historyApiFallback: true
    },
    output: {
      publicPath: isProduction ? '/' : 'auto',
      path: path.resolve(__dirname, 'dist')
    },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'contas',
      filename: 'remoteEntry.js',
      exposes: {
        './ContasApp': './src/ContasApp.js'
      },
      shared: {
        react: { singleton: true, requiredVersion: false },
        'react-dom': { singleton: true, requiredVersion: false }
      }
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' })
  ]
  };
};