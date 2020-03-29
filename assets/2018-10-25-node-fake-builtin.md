---
date: 2018-10-25
tag: [node, js]
---

# Node.jsのネイティブモジュールをフェイクしてみた

Node.jsで使うことのできるモジュール `http` `fs` とかを自分の好きなように置き換えられるようにしてみた．
ちなみに，Node.js自体のバイナリは変更しない．

## フェイク被害を受けてもらうプログラム

- ~/index.js
  ```js
  const http = require('http');
  http.get('https://example.com/');
  ```

ここで， `http.get()` を本来の挙動ではないものにしてしまおう．

## `require` を置き換える

`require()` で呼ばれる関数はどこ？


- [見た1](https://stackoverflow.com/questions/19903398/node-js-customize-require-function-globally)
- [見た2](https://github.com/ztrehagem/node/blob/master/lib/internal/modules/cjs/loader.js#L635)
- [見た3](https://github.com/ztrehagem/node/blob/master/lib/internal/modules/cjs/loader.js#L508)


自分の用意したモジュールを読み込むようにする．

- ~/require.js
  ```js
  const overwrapNames = [
    'http',
  ];

  const originalRequire = module.constructor.prototype.require;

  module.constructor.prototype.require = function (id) {
    if (overwrapNames.some(name => name === id)) {
      return originalRequire.call(this, `${__dirname}/modules/${id}`);
    } else {
      return originalRequire.call(this, id);
    }
  }
  ```

フェイクされて読み込まれるモジュールはこんな感じ．
既にrequireは置き換わっているので，フェイクされたモジュール内で本物のモジュールを使うときは `module.constructor._load()` を直接呼んで読み込む．

- ~/modules/http.js
  ```js
  const http = module.constructor._load('http', module, false);

  module.exports = {
    ...http,
    get(...args) {
      console.log('DUMMY!', ...args);
    },
  };
  ```

## フェイク実行

```shell-session
$ node -r ./require.js ./index.js
DUMMY! https://example.com/
```
