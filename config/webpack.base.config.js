const CleanWebpackPlugin = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");
const VueLoaderPlugin = require("vue-loader/lib/plugin");


module.exports = {
  context: paths.context,
  module: {
    rules: [{
        test: /\.(js|jsx|mjs)$/,
        include: paths.context,
        loader: "babel-loader?cacheDirectory",
        options: {
          compact: true,
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
/*       {
        test: /\.(scss|sass)$/,
        use: ["style-loader", "css-loader", {
          loader: "postcss-loader",
          options: {
            sourceMap: false,
            config: {
              path: "postcss.config.js"
            }
          }
        }, "sass-loader"],
      },
 */      {
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
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: "file-loader",
        options: {
          name: "static/media/[name].[hash:8].[ext]",
        },
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new CleanWebpackPlugin([paths.output]),
    new HtmlWebpackPlugin({
      title: "Hot Module Reload",
    }),
  ],
};