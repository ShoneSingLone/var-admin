// const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const {
  isProd
} = require("./phases");

module.exports = {
  context: paths.context,
  module: {
    rules: [{
        test: /\.(js|jsx|mjs)$/,
        loader: "babel-loader",
        options: {
          compact: true,
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
     /*  {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", {
          loader: "postcss-loader",
          options: {
            sourceMap: false,
            conf个itig: {
              path: "postcss.config.js"
            }
          }
        }, "sass-loader"],
      }, */
      {
        test: /\.less$/,
        loader: [isProd ? {
            loader: MiniCssExtractPlugin.loader,
            options: {
              sourceMap: false,
              publicPath: "../../"
            }
          } : "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              sourceMap: false,
              config: {
                path: "postcss.config.js"
              }
            }
          },
          {
            loader: "less-loader",
            options: {
              javascriptEnabled: true,
            }
          }
        ] // 将 Less 编译为 CSS
      },
      {
        test: /\.styl$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader", {
            loader: "postcss-loader",
            options: {
              sourceMap: false,
              config: {
                path: "postcss.config.js"
              }
            }
          }, "stylus-loader"
        ]
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        loader: "file-loader",
        options: {
          name: "static/media/[name].[ext]",
        },
      },
    ],
  },
  externals: {
    vue: "Vue",
  },
  plugins: [
    // new CleanWebpackPlugin([paths.output]),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "../public/tml/index.html"),
      inject: true,
    }),
  ],
};