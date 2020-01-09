const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");

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
         use: ['style-loader', 'css-loader', {
           loader: "postcss-loader",
           options: {
             sourceMap: false,
             config: {
               path: "postcss.config.js"
             }
           }
         }, 'sass-loader'],
       }, */
      {
        test: /\.less$/,
        loader: ["style-loader", "css-loader", {
          loader: "postcss-loader",
          options: {
            sourceMap: false,
            config: {
              path: "postcss.config.js"
            }
          }
        }, "less-loader"] // 将 Less 编译为 CSS
      },
      {
        test: /\.styl$/,
        use: ["style-loader", "css-loader", {
          loader: "postcss-loader",
          options: {
            sourceMap: false,
            config: {
              path: "postcss.config.js"
            }
          }
        }, "stylus-loader"]
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        loader: "file-loader",
        options: {
          name: "static/media/[name].[ext]",
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([paths.output]),
    new HtmlWebpackPlugin({
      title: "Hot Module Reload",
    }),
  ],
};