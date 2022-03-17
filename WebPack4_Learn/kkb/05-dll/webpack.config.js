const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const PurifyCSS = require("purifycss-webpack");
const glob = require("glob-all");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

//
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const SpeedMeasurePlugin = require("speed-measure-webpack-plugin");
const smp = new SpeedMeasurePlugin();

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;

const HappyPack = require("happypack");
// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      // {
      //   test: /\.css$/,
      //   include: path.resolve(__dirname, "./src"),
      //   use: ["HappyPack/loader?id=css"],
      // },
      // {
      //   test: /\.less$/,
      //   include: path.resolve(__dirname, "./src"),
      //   use: [
      //     "HappyPack/loader?id=less",
      //     // // "style-loader",
      //     // MiniCssExtractPlugin.loader,
      //     // {
      //     //   loader: "css-loader",
      //     //   options: {
      //     //     //css modules 开启
      //     //     modules: true,
      //     //   },
      //     // },
      //     // {
      //     //   loader: "postcss-loader",
      //     // },
      //     // "less-loader",
      //   ],
      // },
      // {
      //   test: /\.(png|jpe?g|gif)$/,
      //   include: path.resolve(__dirname, "./src"),
      //   use: {
      //     loader: "HappyPack/loader?id=pic",
      //     // options: {
      //     //   name: "[name]_[hash:6].[ext]",
      //     //   outputPath: "images/",
      //     //   limit: 12 * 1024,
      //     // },
      //   },
      // },
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "./src"),
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    modules: [path.resolve(__dirname, "./node_modules")],
  },

  devtool: "cheap-inline-source-map",
  // devServer: {
  //   //可以是相对路径
  //   contentBase: "./dist",
  //   open: true,
  //   hot: true,
  //   //即便HMR没有生效，浏览器也不要自动刷新。
  //   hotOnly: true,
  //   //代理
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:9092",
  //     },
  //   },
  //   //mock server
  //   before(app, server) {
  //     app.get("/api/mock.json", (req, res) => {
  //       res.json({
  //         hello: "express",
  //       });
  //     });
  //   },
  //   port: 8080,
  // },
  optimization: {
    usedExports: true, // 哪些导出的模块被使用了，再做打包
    // splitChunks: {
    //   chunks: "all", // 所有的 chunks 代码公共的部分分离出来成为一个单独的文件
    //   // minChunks: 2,
    //   automaticNameDelimiter: "-",
    //   cacheGroups: {
    //     lodash: {
    //       test: /lodash/,
    //       name: "lodash",
    //     },
    //     react: {
    //       test: /react|react-dom/,
    //       name: "react",
    //     },
    //   },
    // },
    concatenateModules: true,
  },
  plugins: [
    new CleanWebpackPlugin({
      protectedWebpackAssets: path.join(__dirname, "./dist/dll/*"),
      // cleanOnceBeforeBuildPatterns: ["!./dist/dll/*"],
    }),
    // new MiniCssExtractPlugin({
    //   filename: "css/[name]-[contenthash:8].css",
    // }),
    // 清除无用 css
    // new PurifyCSS({
    //   paths: glob.sync([
    //     // 要做 CSS Tree Shaking 的路径文件
    //     path.resolve(__dirname, "./src/*.html"), // 请注意，我们同样需要对 html 文件进行 tree shaking
    //     path.resolve(__dirname, "./src/*.js"),
    //   ]),
    // }),
    // new HappyPack({
    //   id: "css",
    //   loaders: ["style-loader", "css-loader"],
    // }),
    // new HappyPack({
    //   id: "js",
    //   loaders: ["babel-loader"],
    // }),
    // new OptimizeCSSAssetsPlugin({
    //   cssProcessor: require("cssnano"), //引入cssnano引擎
    //   cssProcessorOptions: {
    //     discardComments: { removeAll: true },
    //   },
    // }),
    new webpack.DllReferencePlugin({
      manifest: path.resolve(__dirname, "./dll/react-manifest.json"),
    }),
    // new HardSourceWebpackPlugin(),
    new HtmlWebpackPlugin({
      //选择html模板
      title: "首页",
      template: "./src/index.html",
      filename: "index.html",
      // minify: {
      //   // 压缩HTML文件
      //   removeComments: true, // 移除HTML中的注释
      //   collapseWhitespace: true, // 删除空白符与换行符
      //   minifyCSS: true, // 压缩内联css
      // },
    }),
    // new BundleAnalyzerPlugin(),
    // new webpack.HotModuleReplacementPlugin(),
  ],
};
