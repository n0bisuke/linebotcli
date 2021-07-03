
## line bot cli

LINE BOTの設定などをCLIでやれるツールを作ってみてるよ〜

## インストールの仕方

```
$ npm i -g linebotcli
```

## 使い方

### Webhook URLの変更

```
$ linebotcli webhook -t <LINE BOTのアクセストークン> -u <エンドポイントにしたいURL>
```

これでエンドポイントが変わるよ〜

### ngrokでサーバーを起動してURLの変更

- 基本

```
$ linebotcli ngrok <PORT> -t <LINE BOTのアクセストークン>
```

利用例

```
$ linebotcli ngrok 3000 -t xxxxxxxxxxxxxxxxx
```

- パス指定

`--path`or`-p`でパスを指定できます。指定しないと`/webhook`になります。

```
$ linebotcli ngrok <PORT> -t <LINE BOTのアクセストークン> -p <パス>
```

利用例

```
$ linebotcli ngrok 5000 -t xxxxxxxxxxxxxxxxx -p /webhook
```

`linebotcli ngrok`は、別途ngrokを内部でインストール(npx ngrokwrapper)して実行しています。

パッケージにngrokをそのままインクルードすると、Node.jsがインストールされているPCやフォルダのパーミッションによってエラーが発生する場合があるのでngrokを別インストールとしています。

こういった理由で、`linebotcli ngrok`のコマンドだけ利用できない環境があるかもしれません。

### LINE Botの情報を取得

```
$ linebotcli info -t xxxxxxxxxxxxxxxxx
```

## ライブコーディングで作ったよ

https://www.youtube.com/watch?v=DjopYxdjhjU
