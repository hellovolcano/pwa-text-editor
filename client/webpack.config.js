const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'production',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        favicon: './favicon.ico',
        title: 'Webpack Plugin',
      }),
      new InjectManifest({
        swSrc: './src/src-sw.js',
        swDest: 'service-worker.js'
      }),
      new WebpackPwaManifest({
        name: 'Just a Text Editor Application',
        short_name: 'JATE',
        description: 'Take notes!',
        background_color: '#e27ed8',
        theme_color: '#e27ed8',
        start_url: './',
        publicPath: './',
        fingerprints: false,
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets','icons'),
          },
          {
            src: path.resolve('src/images/logo.png'),
            size: '1024x1024',
            destination: path.join('assets','icons'),
            purpose: 'maskable'
          }
        ]
      })
    ],

    module: {
      rules: [
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.css$/i,
          use: ['style-loader','css-loader']
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
          loader: 'babel-loader',
          options: {
              presets: [
              ['@babel/preset-env', { targets: "defaults" }]
              ]
          }
              }
        },
      ],
    },
  };
};
