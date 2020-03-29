---
date: 2019-03-07
tag: [firebase, firebase-hosting, vue, vue-cli]
---

# Firebase+Vue.js 覚書

## まえがき

"[テイキョウドットコム](https://teikyou.com)"の裏側のCMSをFirebaseで作った話．
しばらくフレームワークとしてNuxt.jsを使っていたものの，`lang="ts"`にしようとしていろいろ躓いたりして面倒だったので，流行り（？）の`@vue/cli`に全部任せることにした．もうSSRはいいかな．

でもクライアントもサーバ(Firebase Functions)もTypeScriptで書けたらいいじゃん．良いじゃん（断定）

そのうちNuxt.js+TypeScriptちゃんと研究しよ．
Nuxt.jsすき．


## Firebase

まずfirebase-toolsで

```console
~/ $ firebase init
```

今回はHosting, Functions, Firestore, Authenticationを使う

ディレクトリ構造はこう

```
~/
|- functions/   --- Functionsのコード
|  |- src/         --- .tsファイル群
|  |- lib/         --- コンパイル済み.jsファイル群
|  |- package.json
|     ...
|- src/         --- クライアント側のコード
|  |- common/
|  |- site_name/     --- vue cliで作るディレクトリ
|  |  |- package.json
|  |     ...
|  `- site_name_2/   --- vue cliで作るディレクトリ
|     |- package.json
|        ...
|- public/      --- クライアント側ビルド済みファイル
|  |- site_name/
|  `- site_name_2/
|- .firebaserc
|- firebase.json
|- package.json
   ...
```

### Hosting
表側と裏側の2サイトを用意するので従量プランにアップグレード．
その上で"[複数のサイトでプロジェクトのリソースを共有する](https://firebase.google.com/docs/hosting/multisites?hl=ja)"の通りに，Hostingサイトと`~/public/site_name`を関連付ける．
また，SPAの場合すべてのURLリクエストをindex.htmlに飛ばす必要がある．"[Hosting 動作をカスタマイズする](https://firebase.google.com/docs/hosting/url-redirects-rewrites?hl=ja)"の"リライト"の項など参考に各target毎に設定を行う．
こんな感じ．

- ~/firebase.json
  ```json
    "hosting": [ {
      "target": "target_name",
      "public": "public/site_name",
      "rewrites": [ {
        "source": "**",
        "destination": "/index.html"
      } ]
    } ],
  ```

vue cliの項に続く．

### Authentication
方式はとりあえずメール+パスワード認証にした．あとでGoogleアカウントにしよ．
Firebase Consoleからユーザを作成（CMSを利用するのは限定人数なので）
実際に使えるメールアドレスと，仮の適当なパスワードで作る．
パスワード再設定用メール送信で実際のパスワードを設定させると同時にメール認証が完了する．

### Firestore
Firebase Consoleから作成しておく．ロックモードでよい．
Firestoreのreadは全員許可，writeを前項で作ったユーザのみに限定する．
ルールを以下のようにする．uidはユーザを作った時に発行されるやつ．
複数許可したり，emailで絞ることもできる．詳しくはドキュメント参照されたし．

- ~/firestore.rules
  ```
  ...
  allow read;
  allow write:
    if request.auth.token.email_verified
    && request.auth.uid in [
      'XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
      'YYYYYYYYYYYYYYYYYYYYYYYYYYYY'
    ];
  ...
  ```

複数fieldを使ったソートのクエリを使う必要があったので，indexを作成しておく．


### Functions

functionいっぱい作ってREST APIみたいにするとそれぞれのfunctionの起動に時間がかかるっぽいので、1つのfunctionにexpressを載せる構成にした。
expressのようなFunctionsだけの依存ライブラリは`~/functions/package.json`にインストールしよう．



## Vue

```console
~/src $ vue create site_name
```

TypeScriptを使う設定にした．その他お好み．
これをサイト数ぶん作る．

pugを使う場合は追加で

```console
~/src/site_name $ npm i -D pug pug-plain-loader
```

Firebase Consoleのoverviewにある"_アプリにFirebaseを追加して利用を開始しましょう_"から，initializaAppするために必要な値を確認し，`.env`を以下のように設定．
`.env`の仕様の詳細はドキュメント参照されたし

- ~/src/site_name/.env.production
  ```text
  VUE_APP_FIREBASE_FUNCTIONS_URL=https://region-name-project-id.cloudfunctions.net/

  VUE_APP_FIREBASE_API_KEY=xxx
  VUE_APP_FIREBASE_AUTH_DOMAIN=project-id.firebaseapp.com
  VUE_APP_FIREBASE_DATABASE_URL=https://project-id.firebaseio.com
  VUE_APP_FIREBASE_PROJECT_ID=project-id
  VUE_APP_FIREBASE_STORAGE_BUCKET=project-id.appspot.com
  VUE_APP_FIREBASE_MESSAGING_SENDER_ID=xxx
  ...
  ```

- ~/src/site_name/.env.development
  ```text
  VUE_APP_FIREBASE_FUNCTIONS_URL=http://localhost:5001/project-id/us-central1/

  おなじ
  ...
  ```

`$ firebase serve`でローカルで動かすとき，Firestoreだけはローカルで立たないので，`.env.development`では予め用意したstaging用のFirebaseプロジェクトを使うようにすると◎．（その場合Firestoreだけ使うのでstaging用プロジェクトの料金プランアップグレードは不要）

`.env`で設定したもののうち`VUE_APP_`で始まるものは以下のようにクライアントサイドのコードで呼び出せるのでそうなっている．

- `process.env.VUE_APP_XXX`
- `<%= VUE_APP_XXX %>` (`~/src/site_name/public/index.html`など)

headのmetaでcanonical urlが欲しいときは`VUE_APP_PUBLIC_PATH`など設定しておくと◎．

そして最後にこう

- firebase.ts

  ```ts
  const config = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  };

  firebase.initializeApp(config);
  ```

- axios.ts

  ```ts
  import axios from 'axios';

  export default axios.create({
    baseURL: process.env.VUE_APP_FIREBASE_FUNCTIONS_URL,
  });
  ```

## Build, Serve, Deploy

npm scriptだけ列挙する

- ~/functions/package.json
  ```json:
      "build": "tsc",
      "watch": "tsc -w",
  ```

- ~/src/site_name/package.json
  ```json:
      "build": "vue-cli-service build --dest=../../public/site_name --mode=development",
      "watch": "vue-cli-service build --dest=../../public/site_name --mode=development --watch",
      "prod": "vue-cli-service build --dest=../../public/site_name --mode=production",
  ```

- ~/package.json
  ```json:
      "build": "run-s build:*",
      "build:functions": "npm --prefix=functions run build",
      "build:site_name": "npm --prefix=src/site_name run build",
      "build:site_name_2": "npm --prefix=src/site_name_2 run build",
      "serve": "firebase serve --project project-id-staging",
      "prod:site_name": "npm --prefix=src/site_name run prod",
      "prod:site_name_2": "npm --prefix=src/site_name_2 run prod",
      "predeploy": "run-s clean prod:*",
      "deploy": "firebase deploy --project project-id",
      "clean": "rm -r public || true",
  ```

開発中は`npm run watch`を各package.jsonの位置で実行する．またはルートで`npm run build`．
その後ルートで`npm run serve`でFirebase Hostingがローカルで動く．
`npm run deploy`で全部productionビルドしてデプロイする．Functionsはfirebase-toolsが勝手にビルドします．
`npm run deploy -- --only functions`とかも可能．詳しくはfirebase-toolsのドキュメント参照されたし

`run-s`は`npm-run-all`パッケージ


## 蛇足

### alias vs symlink
複数サイト間やVue・Functions間でinterfaceの定義を共有したかったりする．
tsconfig.jsonのpathsで`"@common/*": ["../../comon/*"]`とするか，
シンボリックリンク`ln -s ../../common ./common`とするか，
どっちがいいんだろうか？

どちらにせよ実体がtsconfig.jsonやtslint.json/eslint.jsonの外側ディレクトリにあるので，
lintはかからないしwatchしてくれない・・・？

### VSCode
プロジェクトルートから見てtsconfigが複数あるので，paths解決やインテリセンス等々を上手にやってくれない．
tsconfigの位置毎にVSCodeを複窓して書いてるけどめんどくさいぞ！
いい方法教えてください．

### type safeなstore
Vuex+TypeScript問題に足突っ込む
