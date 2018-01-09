# fabnavi-app

## はじめに

fabnaviのwebclientを開発するリポジトリ．Electronを使ってアプリケーションにしてある．
electronにすることで，ブラウザ依存をなくす．

## CLIコマンド

Using npm

- `npm run dev` : webpackとElectronが起動してコンパイルし続ける

- `npm run clean` : コンパイルされたコードがあるフォルダの中をすっきりさせる

- `npm run lint:fix` : eslintがコードを整形する

- `npm run dist` : インストールバイナリをビルドする

- `npm run release` : GitHub に 各プラットフォームのインストールバイナリを配布する(macOSでビルドすること)
