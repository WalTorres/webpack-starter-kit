const path = require("path");
//El complemento generará un archivo HTML5 para que usted incluya todos sus paquetes webpack en el encabezado usando etiquetas scripts.
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",

  devServer: {
    watchFiles: ["src/**/*.html"],
  },

  entry: path.resolve(__dirname, "./src"),
  output: {
    filename: "main.bundle.js",
    path: path.resolve(__dirname, "./dist"),
    // publicPath: "./",
    // clean: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: false,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(?:ico|svg|gif|png|jpg|jpeg|ttf)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src") + "/template.html",
      filename: "index.html",
      inject: true,
    }),
    //   new packages.htmlWebpackPlugin({
    //     template: 'template.html',
    //     filename: 'first.html',
    //     chunks: ['first'],
    //     inject: true,
    // }),
  ],
};
