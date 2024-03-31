// node.js の標準モジュール path を読み込む
const path = require("path");

module.exports = {
  mode: "development", // モードの設定。"development"か"production"を指定する。"development"でソースマップを有効化し、"production"で最適化されたファイルを出力する。
  context: path.join(__dirname, "src"), // エントリポイントと今後設定するローダーのベースとなるディレクトリを設定。設定は絶対パスで行い、デフォルト値はカレントディレクトリ。
  // entry: `./index.js`, // webpackがビルドを始める際の開始点となるエントリーポイントの設定。指定なしの場合は./src/index.jsがデフォルト値として設定される。contextで設定したディレクトリからの相対パスで指定する。
  entry: [ "./index.js", "./sub1.js", "./sub2.js" ],  // 複数のエントリーポイントを指定する場合は、配列で指定する。
  devtool: false,  // ソースマップの設定。falseでソースマップを無効化する。trueでソースマップを有効化する。"hidden-source-map"でソースマップを別ファイルとして出力する。
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
}
