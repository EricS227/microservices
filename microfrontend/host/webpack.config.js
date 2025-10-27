const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { container: { ModuleFederationPlugin } } = require('webpack');

// Environment-based remote URLs
const contasUrl = process.env.CONTAS_URL || 'http://localhost:3001';
const transacoesUrl = process.env.TRANSACOES_URL || 'http://localhost:3002';

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  devServer: {
    port: 3000,
    historyApiFallback: true
  },
  output: {
    publicPath: 'auto',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'host',
      remotes: {
        contas: `contas@${contasUrl}/remoteEntry.js`,
        transacoes: `transacoes@${transacoesUrl}/remoteEntry.js`
      },
      shared: { react: { singleton: true }, 'react-dom': { singleton: true } }
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' })
  ]
};