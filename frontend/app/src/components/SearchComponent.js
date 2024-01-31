import React, { useState } from 'react';

export default function SearchComponent() {
  const [title, setTitle] = useState(''); // ユーザーの入力を追跡するstate

  const handleInputChange = (e) => {
    setTitle(e.target.value); // 入力フィールドの値で状態を更新
    console.log("Input Changed:", e.target.value);
  };

  const handleSearch = () => {
    // バックエンドのエンドポイントURLを設定
    const backendURL = 'http://your-backend-url.com/api/search'; // 実際のURLに置き換えてください

    // リクエストを送信
    fetch(backendURL, {
      method: 'POST', // POSTリクエストを送信することを指定
      headers: {
        'Content-Type': 'application/json', // リクエストボディのコンテンツタイプをJSONに設定
      },
      body: JSON.stringify({ title }), // 入力されたタイトルをJSON形式で送信
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
