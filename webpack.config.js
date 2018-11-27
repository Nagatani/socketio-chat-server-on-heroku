const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');
const CSSCombPlugin = require('csscomb-webpack-plugin');

// const MODE = 'production';
const MODE = 'development';

module.exports = (env) => {
  return {
    mode: MODE,
    entry: [
      path.join(__dirname, 'src/style.scss'),
      path.join(__dirname, 'src/index.js'),
    ],
    optimization: {
      runtimeChunk: true
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: `bundle.[chunkhash].js`
    },
    devServer: {
      contentBase: path.resolve(__dirname, 'src/'),
      compress: true,
      port: 9000
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'css-loader',
                options: {
                  url: false,
                  sourceMap: (MODE == 'development'),
                  minimize: (MODE != 'development'),
                  importLoaders: 2
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: (MODE == 'development'),
                  plugins: [require('autoprefixer')]
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: (MODE == 'development'),
                  outputStyle: 'expanded',
                }
              },
            ]
          })
        },
      ]
    },
    plugins: [
      new ExtractTextPlugin(`style.[chunkhash].css`),
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new CleanWebpackPlugin([
        'dist/*.html',
        'dist/*.js',
        'dist/*.css'
      ]),
      new HtmlBeautifyPlugin({
        config: {
          html: {
            end_with_newline: true,
            indent_size: 2,
            indent_inner_html: true,
            unformatted: ['i', 'b', 'span']
          }
        },
        replace: ['type="text/javascript"']
      }),
      new CSSCombPlugin({
        configFile: './.csscomb',
        files: '.src/*.s?(a|c)ss',
      }),
    ],
    performance: {
      hints: false
    },
  };
};
