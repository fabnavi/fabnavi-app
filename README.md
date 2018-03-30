# fabnavi-app

* FabNavi の Electron Client を開発するリポジトリ．
  * Electron にすることで，ブラウザ依存をなくす．

## Requirement

* macOS HighSierra
* XCode
* Homebrew
* Node.js
  * v8.10.0

## Setup

```sh
# クロスビルド環境を用意
brew install wine
brew cask install xquartz

git clone https://github.com/fabnavi/fabnavi-app
cd fabnavi-app
npm install
```

## Development

```sh
npm run dev
# 開発をやめる時は Ctrl-C
```

## Release

```sh
npm run compile
export GH_TOKEN="xxxxxxxxxxxxxxxxxxxx"
# GitHub personal access token is required. You can generate by going to https://github.com/settings/tokens/new. The access token should have the repo scope/permission. Define GH_TOKEN environment variable.
npm run release
# https://github.com/fabnavi/fabnavi-app/releases に release が生成されるので Draft を外せば完了
```

* about more release
  * https://www.electron.build/configuration/publish

## Command

|      Command       |                                                  Description                                                  |
| :----------------: | :-----------------------------------------------------------------------------------------------------------: |
|   `npm run dev`    |           Electron が起動しバックグラウンドでソースの変更を監視し、変更があればコンパイルしてくれる           |
|   `npm run lint`   |                      ESLint を用いてコードを静的にチェックし、結果をコンソールに表示する                      |
| `npm run lint:fix` |                    ESLint を用いてコードを静的にチェックし、修正可能なものは修正してくれる                    |
|   `npm run dist`   |                                     インストールバイナリを生成してくれる                                      |
|  `npm run clean`   |                      生成されたコンパイル済みのファイルやインストールバイナリを削除する                       |
| `npm run release`  | GitHub に 各プラットフォームのインストールバイナリを配布する(win/mac 両方向けのビルドは macOS でしかできない) |
