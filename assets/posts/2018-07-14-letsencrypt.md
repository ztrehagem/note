---
date: 2018-07-14
tag: [letsencrypt]
---

# 急げ！HTTPS対応

[いよいよGoogleが本気。Chrome 68から全HTTPサイトに警告！](https://zenlogic.jp/aossl/basic/predict-chrome68/)

> Chrome68からは、「http://」で始まるすべてのWebサイトで、警告が表示されるようになります。


ワタクシ個人で運営しているのは，静的ファイルを置くだけのWebサイトだけでしたが，HTTPのままだとユーザーに不信感を与えてしまうかも．
ということで，これを機にHTTPS対応をやってみましたので，備忘録としてカキコ．



## Let's Encrypt

https://letsencrypt.org/
https://letsencrypt.jp/

> Let's Encrypt は、認証局（CA）として「SSL/TLSサーバ証明書」を無料で発行するとともに、証明書の発行・インストール・更新のプロセスを自動化することにより、TLS や HTTPS（TLSプロトコルによって提供されるセキュアな接続の上でのHTTP通信）を普及させることを目的としているプロジェクトです。2016年4月12日 に正式サービスが開始されました。

今回のHTTPS化では，あるURL（ドメイン）の所有者とWebサイトの所有者が同一であるということを第三者によって証明（証明書の作成）してもらうことで成立します．
今回は無料でHTTPS化するために，その「第三者」として上記のLet's Encryptをありがたく使わせていただきました．



## 今回の状況

レンタル中のVPSでWebサーバ（nginx）を立て，静的ファイルの配信のみをしています．
実際はDocker（docker-compose）を使っていますが，その部分の説明は省きます．
Let's Encryptの提供している認証ソフト「certbot」を用いた証明書の発行にはいくつか手段がありますが，今回は最も面倒であろう「manual」プラグインを使った方法で行いました．
VPS自体にできるだけごちゃごちゃとインストールしたくないという理由でしたが，結果としてHTTPS関連ファイルを手動でハンドリングでき，（多分）環境に依存しないので良い方法かと思います．



## HTTPS化していく

ここから実際の手順を書いていきます．

### 1. certbotのインストール

証明書の発行のために，Let's Encryptが提供している認証ソフト「certbot」を使います．
今回は手元のMacにインストールしました．Homebrewを使います．

```terminal:terminal
$ brew install certbot
$ certbot --version
certbot 0.26.0
```

### 2. 証明書の作成

certbotを使って認証を行います．

```terminal:terminal
$ sudo certbot certonly --manual
```

certbotの初回起動時にメールアドレスを聞かれます．

> ここで入力したメールアドレスは、緊急の通知、鍵を紛失したときの復旧、証明書の有効期限が近付いた場合の通知に使用されます。

次にHTTPS化の対象となるドメインを聞かれるので入力します．

```terminal:terminal
Please enter in your domain name(s) (comma and/or space separated)  (Enter 'c'
to cancel):
```

- `my-domain.com`
- `hoge.my-domain.com`
- `*.my-domain.com`

など．

このリクエストをしたマシンのIPがログに取られます．Yを入力．

```terminal:terminal
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
NOTE: The IP of this machine will be publicly logged as having requested this
certificate. If you're running certbot in manual mode on a machine that is not
your server, please ensure you're okay with that.

Are you OK with your IP being logged?
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(Y)es/(N)o:
```

次にACMEチャレンジ用のキーが表示されます．
指定されたURLでアクセスできる位置にテキストファイルを設置します．
下の例では， `http://my-domain.com/.well-known/acme-challenge/ABCDEFGHIJKLMNOPQRSTUVWXYZ` へのリクエストで， `ABCDEFGHIJKLMNOPQRSTUVWXYZ.ABCDEFGHIJKLMNOPQRSTUVWXYZ` とだけ記載されたファイルが取得できるようにします．
できたらEnterを押し，Let's Encryptからの確認が実行されます．

```terminal:terminal
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Create a file containing just this data:

ABCDEFGHIJKLMNOPQRSTUVWXYZ.ABCDEFGHIJKLMNOPQRSTUVWXYZ

And make it available on your web server at this URL:

http://my-domain.com/.well-known/acme-challenge/ABCDEFGHIJKLMNOPQRSTUVWXYZ

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Press Enter to Continue
```

確認が成功すると証明書ファイルが生成されます．
下のログに出ているパスはシンボリックリンクです．
実体は `/etc/letsencrypt/archive/my-domain.com/` にあります．

```terminal:terminal
IMPORTANT NOTES:
 - Congratulations! Your certificate and chain have been saved at:
   /etc/letsencrypt/live/my-domain.com/fullchain.pem
   Your key file has been saved at:
   /etc/letsencrypt/live/my-domain.com/privkey.pem
   Your cert will expire on 2018-10-11. To obtain a new or tweaked
   version of this certificate in the future, simply run certbot
   again. To non-interactively renew *all* of your certificates, run
   "certbot renew"
 - If you like Certbot, please consider supporting our work by:

   Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate
   Donating to EFF:                    https://eff.org/donate-le
```

### 3. 証明書の設置

今回はnginxサーバですので，先程生成した `fullchain.pem` と `privkey.pem` を使います．
nginxのコンフィグを以下のように設定します．
ポート80からhttpでアクセスが来た場合は301でhttpsにリダイレクトすると良いと思います．

```nginx:nginx.conf
server {
  listen 443;
  server_name my-domain.com;
  ssl on;
  ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
  ssl_ciphers HIGH:!ADH:!MD5;
  ssl_certificate /path/to/fullchain.pem;
  ssl_certificate_key /path/to/privkey.pem;

  location / {
    ...
```

また，証明書の発行をサーバマシンではなく手元のMacで行っているので，手元のMacからサーバマシンへ証明書をコピーしなければならず，証明書の更新時に面倒です．

設定を行ったら `https://my-domain.com` へアクセスし，ブラウザが証明書を認識していれば成功です．
サイト上でjsやcssへのリンクURLもhttpsに変更するのを忘れずに．
