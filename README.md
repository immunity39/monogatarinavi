# monogatarinavi

## 動作
git cloneによってこのリポジトリをクローン。

frontのホームディレクトリに移動
```
cd frontend/app
```

npmのインストール
```
npm install
```

Mapbox関連のパッケージをインストール
```
npm install --save mapbox-gl @types/mapbox-gl @mapbox/mapbox-gl-language
```

react-iconsをインストール
```
npm install react-icons --save
```

tokenファイルをsrcもとに配置

ルートディレクトリに戻る
```
cd ../..
```

## 起動

その後、dockerの起動を行う
**buildに関しては初回時のみ**
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

**(コンテナの起動に時間がかかる可能性があります)**

### DBに初期データを挿入
以下コマンドを実行
`docker-compose exec backend sh -c "python3 db_init.py"`

## 終了
コンテナを閉じる
```
docker-compose down -v
```
