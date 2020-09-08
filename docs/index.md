# @lollipop-onl/vuex-typesafe-helper

[![npm version](https://badge.fury.io/js/%40lollipop-onl%2Fvuex-typesafe-helper.svg)](https://badge.fury.io/js/%40lollipop-onl%2Fvuex-typesafe-helper)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

[@takepepe](https://twitter.com/takepepe) 氏の著書「[実践 TypeScript](https://twitter.com/takepepe)」にて例示されているサンプルプロジェクト [takefumi-yoshii/ts-nuxtjs-express](https://github.com/takefumi-yoshii/ts-nuxtjs-express) を抽象化しライブラリ化しました。

## Pros

* State と Getters / Mutations / Actions の引数・返り値の型を定義すると Store のすべての型が推論されます
* コンポーネントから State / Getters / Mutations / Actions を型安全に参照・サジェッションできます
* Store の修正時に既存使用箇所で型エラーが通知されます
* TypeScript の型情報のみ提供するためバンドルサイズが変わりません

## Requirements

`@lollipop-onl/vuex-typesafe-helper` v2.0 より、以下の要件が必須となりました。

* `vuex` v3.0.0 +
* `typescript` v4.1.0 +
* `@nuxtjs/typescript-build` v2.3.0 + (Nuxt.jsで使用する場合)

v2.0以前のバージョンと要件は [過去バージョン](docs/versions.md) からご確認ください。

## Installation

```sh
$ yarn add -D @lollipop-onl/vuex-typesafe-helper
# or
$ npm install -D @lollipop-onl/vuex-typesafe-helper
```

## Documentation

使用方法、リファレンスは [ドキュメントページ](https://vuex-typesafe-helper.lollipop.onl) をご覧ください。

## License

[MIT](https://github.com/lollipop-onl/vuex-typesafe-helper/blob/main/LICENSE)
