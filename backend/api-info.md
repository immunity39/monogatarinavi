# APIの概要
Djangoのフォームに対するAPI
URLアクセスに対応しています。

## 一覧
http://localhost:8000/　に続く形で入力してください。

1. api/select/:id
指定したidに対応する情報が見れる

1. api/titles
productのtitleを0-indexで表示

1. api/pilgrims
product.pilgrimを0-indexで表示

1. api/search
1タイトルのjsonリクエストへの返答

1. api/endpoint
frontからのjsonデータを貰うだけ。ほんとにもらうだけ

1. api/db/init
DBに渡されたjsonデータを挿入

1. api/all_data
DBに入っている全てのタイトル、聖地データを0-indexで表示

1. api/user_all_data
json形式でタイトルを渡すと対応するタイトルと聖地データの組み合わせを0-indexで表示

**postmanでの実行は完了しています。**
