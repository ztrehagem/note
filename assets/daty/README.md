# 小さな日付ライブラリ"Daty"を作りました

[[toc]]

---

- GitHub [https://github.com/ztrehagem/daty](https://github.com/ztrehagem/daty)
- npm [https://www.npmjs.com/package/@ztrehagem/daty](https://www.npmjs.com/package/@ztrehagem/daty)

## 背景

JavaScriptには、日付・時刻・タイムゾーンまで扱える[Date](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date)というものが存在します。
ライブラリ等が無くても使えるのでサクッと日付をゴニョりたいときには便利です。

ただ少し複雑な操作をしようとすると、その特殊な挙動によって無駄に消耗することがあると思います。
特に筆者は、Vue.jsを使った日付選択UIを実装した際、割と面倒なことになりました。

そこで、Dateの恩恵を受けつつも、合理的な振る舞いとシンプルなインターフェースを持った、**日付のみ**を表現するclassを実装することにしました。

多分これは車輪の再開発だと思いますが。

### Dateの挙動(日付オーバーフロー)

```javascript:node
> d = new Date(2000, 0, 31)
> d.toLocaleString()
'2000-1-31 00:00:00'

> d.setMonth(d.getMonth() + 1)
> d.toLocaleString()
'2000-3-2 00:00:00'
```

"**2000年1月31日**"で初期化したDateオブジェクトの"**月**"をインクリメントすると、2月ではなく、"**3月2日**"になるというものです。
これは少し考えれば分かりますが、

1. 2000-1-31 (初期値)
2. 2000-2-31 (月をインクリメント)
3. 2000-3-2 (2000年2月は29日までのため、2月31日相当となる3月2日として解釈される)

このようなものと考えられるでしょう。

### Dateの挙動(NaN)

Dateオブジェクトをインスタンス化する際、各パラメータ（年月日...）に相当する引数に`NaN`を与えることが可能です。例外は発生しません。
その場合、Date全体で "Invalid Date" という扱いになり、各パラメータを個別に制御できません。
`setDate()` 等が動かなったり、 `setFullYear()` により他のパラメータが強制的に埋められたりします。
そもそも日付を表すのにNaNを使うはずもなく、動作未定義でも仕方のないところです。


## 作りたかった日付選択フォーム

Datepickerのような特殊なものではなく、単純な年・月・日の3つのプルダウン(select要素)からなるフォームを作ろうとしました。

```html
<select>
  <option value="">年</option>
  <option value="2000">2000年</option>
  ...
</select>
<select>
  <option value="">月</option>
  <option value="0">1月</option>
  ...
</select>
<select>
  <option value="">日</option>
  <option value="1">1日</option>
  ...
</select>
```

ここで達成したい要件は以下の通りです。

- 年月日それぞれ独立して未選択状態を表現する。
- 存在しない日付は”日”プルダウンの選択肢に現れない。
- 月プルダウンから月を選択したとき、存在しない日付となった場合は”日”を丸める。

各種リアクティブ系フレームワークの力を借りてゴニョればゴリ押しで達成できそうな気がしますが、実装は当然複雑になるでしょう。
そこで、上記の要件を満たしたDateの代替クラスを作ってしまえば、Vue.jsやその他のフレームワークにおけるデータバインディングの枠組みの上に合理的に乗っかったUI実装ができるのではないかと考えました。

## Datyの実装

- 実装 https://github.com/ztrehagem/daty/blob/master/src/daty-core.ts
- ドキュメント(ja) https://github.com/ztrehagem/daty/blob/master/README-ja.md#class-datycore

ドキュメント整備は途中でやる気を失いました。すまん。

クラスDatyCoreは上記3要件を満たすためのミニマルな実装です。以下のようなコンストラクタとプロパティ／メソッドを持ちます。

- コンストラクタ
  - `new DatyCore(year, month, date)`
     - 年月日パラメータを数値で初期化。未指定の場合はNaN扱い。
  - `new DatyCore(jsDate)`
     - Dateオブジェクトから初期化。
- プロパティ
  - `year`, `month`, `date`
     - 年月日パラメータの取得と代入やインクリメントが可能
  - `hasYear`, `hasMonth`, `hasDate` (readonly)
     - 年月日パラメータがNaNかどうか
  - `endOfMonth` (readonly)
     - `hasYear && hasMonth ? 月末の日付 : 31`
  - `jsDate` [^1]
     - 内部で持っているDateオブジェクトへの参照（不変）。代入した場合はコンストラクタと同様。
- メソッド
  - `clearYear()`, `clearMonth()`, `clearDate()`
     - 各パラメータにNaNを代入するのと等しい。

Note: DatyCoreを拡張したDatyというクラスも用意してありますが、本記事の執筆時点ではまだ暫定的な実装なので非推奨としておきます。

## Datyの利用

- npm https://www.npmjs.com/package/@ztrehagem/daty

あまり説明はいらないかもしれませんが、 `year`, `month`, `date` を双方向バインディングさせ、加えて `endOfMonth` を使って"日"プルダウンの内容を可変させれば良いということになります。

また、DatyCoreは単なるclassですので、これを継承して新たな機能を持たせることを検討してみてください。
ヘルパーメソッドを用意すればview層でも使えますし、パースやシリアライズ用メソッドを用意すればAPI層まで持っていくことが可能かと思います。



[^1]: ここで取得できるDateオブジェクトは直接使わずに、Dateオブジェクトを新たに生成するメソッド `toDate()` 等を実装することを推奨します。
