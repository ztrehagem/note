(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{251:function(t,e,v){"use strict";v.r(e);var _=v(28),r=Object(_.a)({},(function(){var t=this,e=t.$createElement,v=t._self._c||e;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"nuxt-jsで手間取ったことまとめ"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#nuxt-jsで手間取ったことまとめ"}},[t._v("#")]),t._v(" Nuxt.jsで手間取ったことまとめ")]),t._v(" "),v("p",[t._v("Nuxt.jsのプロジェクトをいくつか作っていて躓いたところまとめ")]),t._v(" "),v("h2",{attrs:{id:"nuxtが生成するディレクトリについて整理"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#nuxtが生成するディレクトリについて整理"}},[t._v("#")]),t._v(" nuxtが生成するディレクトリについて整理")]),t._v(" "),v("h3",{attrs:{id:"builddir"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#builddir"}},[t._v("#")]),t._v(" buildDir")]),t._v(" "),v("ul",[v("li",[t._v("nuxt.config.js "),v("code",[t._v("buildDir")]),t._v(" プロパティ．")]),t._v(" "),v("li",[v("code",[t._v("nuxt build")]),t._v(" や "),v("code",[t._v("nuxt generate")]),t._v(" した時")]),t._v(" "),v("li",[t._v("デフォルトは "),v("code",[t._v(".nuxt")])])]),t._v(" "),v("h3",{attrs:{id:"generate-dir"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#generate-dir"}},[t._v("#")]),t._v(" generate.dir")]),t._v(" "),v("ul",[v("li",[t._v("nuxt.config.js "),v("code",[t._v("generate")]),t._v(" プロパティの下にある "),v("code",[t._v("dir")])]),t._v(" "),v("li",[v("code",[t._v("nuxt generate")]),t._v(" もしくはspaモードで "),v("code",[t._v("nuxt build")]),t._v(" した時")]),t._v(" "),v("li",[t._v("デフォルトは "),v("code",[t._v("dist")])])]),t._v(" "),v("h2",{attrs:{id:"ページ上部のプログレスバーがいらない時"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#ページ上部のプログレスバーがいらない時"}},[t._v("#")]),t._v(" ページ上部のプログレスバーがいらない時")]),t._v(" "),v("ul",[v("li",[t._v("nuxt.config.js "),v("code",[t._v("loading")]),t._v(" プロパティを "),v("code",[t._v("false")]),t._v(" にする．")])]),t._v(" "),v("h2",{attrs:{id:"同一リポジトリに複数のnuxtプロジェクトがあるとき"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#同一リポジトリに複数のnuxtプロジェクトがあるとき"}},[t._v("#")]),t._v(" 同一リポジトリに複数のnuxtプロジェクトがあるとき")]),t._v(" "),v("ul",[v("li",[t._v("複数のnuxt.config.jsを用意することになる")]),t._v(" "),v("li",[t._v("それぞれ "),v("code",[t._v("srcDir")]),t._v(" と "),v("code",[t._v("buildDir")]),t._v(" と "),v("code",[t._v("generate.dir")]),t._v(" を設定してやること．")]),t._v(" "),v("li",[t._v("npm-run-allなどで並行にビルドを走らせようとするとポートが衝突するので "),v("code",[t._v("nuxt build -p 3001")]),t._v(" など指定してやると良い．")])]),t._v(" "),v("h2",{attrs:{id:"nuxt-generate-したファイルをルート以外のurlに配置するとき"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#nuxt-generate-したファイルをルート以外のurlに配置するとき"}},[t._v("#")]),t._v(" "),v("code",[t._v("nuxt generate")]),t._v(" したファイルをルート以外のURLに配置するとき")]),t._v(" "),v("p",[t._v("例えば "),v("code",[t._v("https://example.com/my/dir/")]),t._v(" に配置するとき")]),t._v(" "),v("ul",[v("li",[t._v("nuxt.config.js "),v("code",[t._v("router.base")]),t._v(" に "),v("code",[t._v("/my/dir/")]),t._v(" "),v("ul",[v("li",[t._v("devのときは "),v("code",[t._v("/")]),t._v("　になるようにNODE_ENVなどで切り替えると良い")])])]),t._v(" "),v("li",[t._v("nuxt.config.js "),v("code",[t._v("build.publicPath")]),t._v(" に "),v("code",[t._v("https://example.com/my/dir/")])]),t._v(" "),v("li",[t._v("aタグhref属性ではルートを "),v("code",[t._v("/my/dir/")]),t._v(" と見て良い．\n"),v("ul",[v("li",[t._v("つまり "),v("code",[t._v("https://example.com/my/dir/hoge")]),t._v(" へは単に "),v("code",[t._v("/hoge")]),t._v(" として良い")])])])])])}),[],!1,null,null,null);e.default=r.exports}}]);