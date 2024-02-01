import React, { useState } from 'react';

export default function SearchComponent() {
  const [title, setTitle] = useState(''); // ユーザーの入力を追跡するstate
  const [animeList, setAnimeList] = useState([]); // 入力された作品名のリストを管理

  const handleInputChange = (e) => {
    setTitle(e.target.value); // 入力フィールドの値で状態を更新
    console.log("Input Changed:", e.target.value);
  };

  const handleSearch = () => {
    // 入力された作品名を新しいオブジェクトとして作成し、リストに追加
    const newAnime = { title: title };
    const updatedAnimeList = [...animeList, newAnime];
    setAnimeList(updatedAnimeList);

    // バックエンドのエンドポイントURLを設定
    const backendURL = 'http://localhost:8000/api/search'; // 実際のURLに置き換えてください

    // リクエストを送信
    fetch(backendURL, {
      method: 'POST', // POSTリクエストを送信することを指定
      headers: {
        'Content-Type': 'application/json', // リクエストボディのコンテンツタイプをJSONに設定
      },
      body: JSON.stringify(updatedAnimeList), // 更新されたリストをJSON形式で送信
    })
      .then((response) => response.json())
      .then((data) => {
        // バックエンドからの応答を処理
        console.log(data); // 応答データをコンソールに出力する例
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      })
      .finally(() => {
        setTitle(''); // 検索バーの入力をリセット
      });

    // コンソール上で現在のJSONファイルの内容を出力
    console.log("Current JSON File:", JSON.stringify(updatedAnimeList, null, 2));
  };

  return (
    <div className="search">
      <div className='search__bar'>
        <input
          className="search__bar__input"
          placeholder="Input Title"
          value={title}
          onChange={handleInputChange}
        />
      </div>
      <button className="search__bar__button" onClick={handleSearch}>Add</button>
    </div>
  );
}
