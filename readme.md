
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

```
$ linebotcli ngrok -t <LINE BOTのアクセストークン> -h <port> -p <path>
```

- 利用例

```
$ linebotcli ngrok -t xxxxxxxxxxxxxxxxx -h 5000 -p /webhook
```

別途ngrokを内部でインストールし、コマンド終了時にngrokをアンインストールしています。
パッケージにngrokをインクルードすると、Node.jsがインストールされているPCやフォルダのパーミッションによってエラーが発生する場合があるのでngrokを別インストールとしています。

こういった理由で、`linebotcli ngrok`のコマンドだけ利用できない環境があるかもしれません。

### LINE Botの情報を取得

```

```