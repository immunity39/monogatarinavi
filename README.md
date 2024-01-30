# monogatarinavi

## 動作
git cloneによってこのリポジトリをクローンしたら、クローンしたフォルダで以下コマンドを実行

```
docker-compose build #時間かかるかも
docker-compose up -d
```
(dockerの利用にはdocker desktopをインストールしてください)
コンテナ起動を確認したのち
`http://localhost:3000`
にアクセスするとReactのホーム画面が
`http://localhost:8000`
にアクセスするとdjangoのホーム画面が開かれます。(現在はホーム以外の画面になっています。404でなければOK)

<string>(コンテナの起動に時間がかかる可能性があります)</string>

