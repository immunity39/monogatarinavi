# monogatarinavi

## 動作
git cloneによってこのリポジトリをクローン。


npm installでfront側の環境を構築 + ホームディレクトリへ移動
```
cd frontend/app
npm install
cd ../..
```

## 起動

その後、dockerの起動を行う
```
docker-compose build
docker-compose up -d
```
コンテナの起動にはそれぞれある程度の時間がかかります。

(dockerの利用にはdocker desktopをインストールしてください)
コンテナ起動を確認したのち
`http://localhost:3000`
にアクセスするとReactのホーム画面が
`http://localhost:8000`
にアクセスするとdjangoのホーム画面が開かれます。(現在はホーム以外の画面になっています。404でなければOK)

(コンテナの起動に時間がかかる可能性があります)

## 終了
コンテナを閉じる
```
docker-compose down -v
```
