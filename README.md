# fabnavi-app 

## はじめに  
fabnaviのwebclientを開発するリポジトリ．Electronを使ってアプリケーションにしてある．  
electronにすることで，ブラウザ依存をなくす．    


## CLIコマンド  
Using npm  
- `npm run build:watch` : webpackが起動してコンパイルし続ける
- `npm run build:electron` : コンパイルされたコードでelectronが立ち上がる
- `npm run clean` : コンパイルされたコードがあるフォルダの中をすっきりさせる
- `npm run lint:fix` : eslintがコードを整形する

`build:watch` と `build:electron` はそれぞれ別セッションで実行する

