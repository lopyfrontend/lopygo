const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  entry: {
    creative: './src/index.js'
  },
  output: {
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },

      {
        test: /\.pug$/,
        use: [
            {
                loader: 'html-loader',
                options: {
                }
            },
            {
                loader: 'pug-html-loader',
                options: {
                    self: true, // 這個要加
                    pretty: true,
                }
            },
          //"html-loader",
          //"pug-html-loader"
        ]
      },
        {
            test: /\.scss$/,
            use: [
                MiniCssExtractPlugin.loader, // creates style nodes from JS strings
                "css-loader", // translates CSS into CommonJS
                "sass-loader" // compiles Sass to CSS, using Node Sass by default
            ]
        },
      {
        test: /\.sass/,
        use: [
            MiniCssExtractPlugin.loader,
            // "style-loader", // style nodes from js strings
            "css-loader",
            "sass-loader"
        ]
      },
      // {
      //   test: /\.(png|jpg)$/,
      //   loader: 'url-loader?limit=8192&name=img/[name].[ext]'
      // }
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
              loader: 'file-loader',
              options: {
                  //outputPath:'img',
                  publicPath:'../',
                  useRelativePath: true,
                  name(file){
                      return '[path][name].[ext]';
                  },
              },
          },
        ],
      },
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/index.pug",
      filename: "./index.html",

      //how to use in pug
      templateParameters: {
        'foo': 'bar!!!'
      }
    }),
    new HtmlWebPackPlugin({
      template: "./src/404.pug",
      filename: "./404.html"
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
        //这里路径不对
      filename: "css/[name].css",
      chunkFilename: "css/[id].css"
    })
  ],
};
