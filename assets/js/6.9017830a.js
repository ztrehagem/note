(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{250:function(t,e,a){"use strict";a.r(e);var n=a(28),r=Object(n.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"急げ！https対応"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#急げ！https対応"}},[t._v("#")]),t._v(" 急げ！HTTPS対応")]),t._v(" "),a("p",[a("a",{attrs:{href:"https://zenlogic.jp/aossl/basic/predict-chrome68/",target:"_blank",rel:"noopener noreferrer"}},[t._v("いよいよGoogleが本気。Chrome 68から全HTTPサイトに警告！"),a("OutboundLink")],1)]),t._v(" "),a("blockquote",[a("p",[t._v("Chrome68からは、「http://」で始まるすべてのWebサイトで、警告が表示されるようになります。")])]),t._v(" "),a("p",[t._v("ワタクシ個人で運営しているのは，静的ファイルを置くだけのWebサイトだけでしたが，HTTPのままだとユーザーに不信感を与えてしまうかも．\nということで，これを機にHTTPS対応をやってみましたので，備忘録としてカキコ．")]),t._v(" "),a("h2",{attrs:{id:"let-s-encrypt"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#let-s-encrypt"}},[t._v("#")]),t._v(" Let's Encrypt")]),t._v(" "),a("p",[t._v("https://letsencrypt.org/\nhttps://letsencrypt.jp/")]),t._v(" "),a("blockquote",[a("p",[t._v("Let's Encrypt は、認証局（CA）として「SSL/TLSサーバ証明書」を無料で発行するとともに、証明書の発行・インストール・更新のプロセスを自動化することにより、TLS や HTTPS（TLSプロトコルによって提供されるセキュアな接続の上でのHTTP通信）を普及させることを目的としているプロジェクトです。2016年4月12日 に正式サービスが開始されました。")])]),t._v(" "),a("p",[t._v("今回のHTTPS化では，あるURL（ドメイン）の所有者とWebサイトの所有者が同一であるということを第三者によって証明（証明書の作成）してもらうことで成立します．\n今回は無料でHTTPS化するために，その「第三者」として上記のLet's Encryptをありがたく使わせていただきました．")]),t._v(" "),a("h2",{attrs:{id:"今回の状況"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#今回の状況"}},[t._v("#")]),t._v(" 今回の状況")]),t._v(" "),a("p",[t._v("レンタル中のVPSでWebサーバ（nginx）を立て，静的ファイルの配信のみをしています．\n実際はDocker（docker-compose）を使っていますが，その部分の説明は省きます．\nLet's Encryptの提供している認証ソフト「certbot」を用いた証明書の発行にはいくつか手段がありますが，今回は最も面倒であろう「manual」プラグインを使った方法で行いました．\nVPS自体にできるだけごちゃごちゃとインストールしたくないという理由でしたが，結果としてHTTPS関連ファイルを手動でハンドリングでき，（多分）環境に依存しないので良い方法かと思います．")]),t._v(" "),a("h2",{attrs:{id:"https化していく"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#https化していく"}},[t._v("#")]),t._v(" HTTPS化していく")]),t._v(" "),a("p",[t._v("ここから実際の手順を書いていきます．")]),t._v(" "),a("h3",{attrs:{id:"_1-certbotのインストール"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1-certbotのインストール"}},[t._v("#")]),t._v(" 1. certbotのインストール")]),t._v(" "),a("p",[t._v("証明書の発行のために，Let's Encryptが提供している認証ソフト「certbot」を使います．\n今回は手元のMacにインストールしました．Homebrewを使います．")]),t._v(" "),a("div",{staticClass:"language-terminal:terminal extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ brew install certbot\n$ certbot --version\ncertbot 0.26.0\n")])])]),a("h3",{attrs:{id:"_2-証明書の作成"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2-証明書の作成"}},[t._v("#")]),t._v(" 2. 証明書の作成")]),t._v(" "),a("p",[t._v("certbotを使って認証を行います．")]),t._v(" "),a("div",{staticClass:"language-terminal:terminal extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("$ sudo certbot certonly --manual\n")])])]),a("p",[t._v("certbotの初回起動時にメールアドレスを聞かれます．")]),t._v(" "),a("blockquote",[a("p",[t._v("ここで入力したメールアドレスは、緊急の通知、鍵を紛失したときの復旧、証明書の有効期限が近付いた場合の通知に使用されます。")])]),t._v(" "),a("p",[t._v("次にHTTPS化の対象となるドメインを聞かれるので入力します．")]),t._v(" "),a("div",{staticClass:"language-terminal:terminal extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("Please enter in your domain name(s) (comma and/or space separated)  (Enter 'c'\nto cancel):\n")])])]),a("ul",[a("li",[a("code",[t._v("my-domain.com")])]),t._v(" "),a("li",[a("code",[t._v("hoge.my-domain.com")])]),t._v(" "),a("li",[a("code",[t._v("*.my-domain.com")])])]),t._v(" "),a("p",[t._v("など．")]),t._v(" "),a("p",[t._v("このリクエストをしたマシンのIPがログに取られます．Yを入力．")]),t._v(" "),a("div",{staticClass:"language-terminal:terminal extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\nNOTE: The IP of this machine will be publicly logged as having requested this\ncertificate. If you're running certbot in manual mode on a machine that is not\nyour server, please ensure you're okay with that.\n\nAre you OK with your IP being logged?\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\n(Y)es/(N)o:\n")])])]),a("p",[t._v("次にACMEチャレンジ用のキーが表示されます．\n指定されたURLでアクセスできる位置にテキストファイルを設置します．\n下の例では， "),a("code",[t._v("http://my-domain.com/.well-known/acme-challenge/ABCDEFGHIJKLMNOPQRSTUVWXYZ")]),t._v(" へのリクエストで， "),a("code",[t._v("ABCDEFGHIJKLMNOPQRSTUVWXYZ.ABCDEFGHIJKLMNOPQRSTUVWXYZ")]),t._v(" とだけ記載されたファイルが取得できるようにします．\nできたらEnterを押し，Let's Encryptからの確認が実行されます．")]),t._v(" "),a("div",{staticClass:"language-terminal:terminal extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\nCreate a file containing just this data:\n\nABCDEFGHIJKLMNOPQRSTUVWXYZ.ABCDEFGHIJKLMNOPQRSTUVWXYZ\n\nAnd make it available on your web server at this URL:\n\nhttp://my-domain.com/.well-known/acme-challenge/ABCDEFGHIJKLMNOPQRSTUVWXYZ\n\n- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\nPress Enter to Continue\n")])])]),a("p",[t._v("確認が成功すると証明書ファイルが生成されます．\n下のログに出ているパスはシンボリックリンクです．\n実体は "),a("code",[t._v("/etc/letsencrypt/archive/my-domain.com/")]),t._v(" にあります．")]),t._v(" "),a("div",{staticClass:"language-terminal:terminal extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v('IMPORTANT NOTES:\n - Congratulations! Your certificate and chain have been saved at:\n   /etc/letsencrypt/live/my-domain.com/fullchain.pem\n   Your key file has been saved at:\n   /etc/letsencrypt/live/my-domain.com/privkey.pem\n   Your cert will expire on 2018-10-11. To obtain a new or tweaked\n   version of this certificate in the future, simply run certbot\n   again. To non-interactively renew *all* of your certificates, run\n   "certbot renew"\n - If you like Certbot, please consider supporting our work by:\n\n   Donating to ISRG / Let\'s Encrypt:   https://letsencrypt.org/donate\n   Donating to EFF:                    https://eff.org/donate-le\n')])])]),a("h3",{attrs:{id:"_3-証明書の設置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3-証明書の設置"}},[t._v("#")]),t._v(" 3. 証明書の設置")]),t._v(" "),a("p",[t._v("今回はnginxサーバですので，先程生成した "),a("code",[t._v("fullchain.pem")]),t._v(" と "),a("code",[t._v("privkey.pem")]),t._v(" を使います．\nnginxのコンフィグを以下のように設定します．\nポート80からhttpでアクセスが来た場合は301でhttpsにリダイレクトすると良いと思います．")]),t._v(" "),a("div",{staticClass:"language-nginx:nginx.conf extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("server {\n  listen 443;\n  server_name my-domain.com;\n  ssl on;\n  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;\n  ssl_ciphers HIGH:!ADH:!MD5;\n  ssl_certificate /path/to/fullchain.pem;\n  ssl_certificate_key /path/to/privkey.pem;\n\n  location / {\n    ...\n")])])]),a("p",[t._v("また，証明書の発行をサーバマシンではなく手元のMacで行っているので，手元のMacからサーバマシンへ証明書をコピーしなければならず，証明書の更新時に面倒です．")]),t._v(" "),a("p",[t._v("設定を行ったら "),a("code",[t._v("https://my-domain.com")]),t._v(" へアクセスし，ブラウザが証明書を認識していれば成功です．\nサイト上でjsやcssへのリンクURLもhttpsに変更するのを忘れずに．")])])}),[],!1,null,null,null);e.default=r.exports}}]);