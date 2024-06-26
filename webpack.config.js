// node.js の標準モジュール path を読み込む
const path = require("path");
// プラグインの読み込み
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin   = require('copy-webpack-plugin');
// const ImageminMozjpeg = require('imagemin-mozjpeg');

const MODE = "development";

const sourceMapStatus = MODE === "development";

module.exports = {
  mode: MODE, // モードの設定。"development"か"production"を指定する。"development"でソースマップを有効化し、"production"で最適化されたファイルを出力する。
  context: path.join(__dirname, "src"), // エントリポイントと今後設定するローダーのベースとなるディレクトリを設定。設定は絶対パスで行い、デフォルト値はカレントディレクトリ。
  // entry: `./index.js`, // webpackがビルドを始める際の開始点となるエントリーポイントの設定。指定なしの場合は./src/index.jsがデフォルト値として設定される。contextで設定したディレクトリからの相対パスで指定する。
  entry: ["./index.js", "./sub1.js", "./sub2.js"], // 複数のエントリーポイントを指定する場合は、配列で指定する。
  devtool: false, // ソースマップの設定。falseでソースマップを無効化する。trueでソースマップを有効化する。"hidden-source-map"でソースマップを別ファイルとして出力する。
  watch: true, // ファイルの変更を監視し、変更があった場合に差分のみを自動でビルド
  watchOptions: {
    ignored: /node_modules/, // ファイルの監視対象から除外するディレクトリやファイルを設定
  },
  // ビルドしたファイルをどこにどのような名前で出力するかを設定する。
  output: {
    path: `${__dirname}/dist`, // バンドルしたファイルの出力先を設定。絶対パスで指定する。
    filename: "./assets/js/bundle.js", // バンドルしたファイルのファイル名を設定。
    clean: {
      keep: /index\.html/, // ビルド時に出力ディレクトリをクリーンにする際に削除しないファイルを設定。
    },
  },
  optimization: {
    minimize: true, // バンドルしたファイルを最小化するかどうかを設定。trueで最小化する。falseで最小化しない。productionだとデフォルトでtrueになる。
  },
  module: {
    // ローダーなどのモジュールの設定をするプロパティ
    rules: [
      // 各ローダーを設定するプロパティです。配列となっており、その各要素に各ローダーのルールを設定して行きます。
      {
        test: /\.(sass|scss|css)$/, // 正規表現などで該当するファイルを指定
        use: [
          // CSSファイルを書き出すオプションを有効にする
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              url: true, // CSS内のurl()の有効無効を設定. trueにすると画像もビルドされ、それが読み込まれる
              sourceMap: sourceMapStatus,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: sourceMapStatus,
            },
          },
          // 使用するローダーを指定するプロパティ
          // "style-loader",
        ],
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(gif|png|jpg|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            // これで100KB以上という設定になる。
            maxSize: 100 * 1024,
          },
        },
      },
    ],
  },
  // プラグインの設定
  plugins: [
    new MiniCssExtractPlugin({
      // 出力先の設定
      filename: "./css/[name].css",
    }),
    // html-webpack-pluginの設定
    new HtmlWebpackPlugin({
      // 対象のテンプレートを設定
      template: `${__dirname}/src/index.html`,
      // 書き出し先
      filename: `${__dirname}/dist/index.html`,
      // ビルドしたjsファイルを読み込む場所。デフォルトはhead
      inject: 'body'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${__dirname}/src/img/`,
          to: `${__dirname}/dist/img/`,
        }
      ]
    })
    // new ImageminPlugin({
    //   test: /\.(jpe?g|png|gif|svg)$/i,
    //   pngquant: {
    //     quality: '70-85'
    //   },
    //   gifsicle: {
    //     interlaced: false,
    //     optimizationLevel: 9,
    //     colors: 256
    //   },
    //   plugins: [
    //     ImageminMozjpeg({
    //       quality: 85,
    //       progressive: true
    //     })
    //   ],
    //   svgo: {},
    // })
  ],
};
