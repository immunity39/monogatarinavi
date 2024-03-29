import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import 'mapbox-gl/dist/mapbox-gl.css';
import TOKEN from "../token/token.json";

const MapComponent = ({ json_data, selectedSeriesId }) => {
  mapboxgl.accessToken = TOKEN[0].token;
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const markers = useRef([]);
  const achievementThreshold = 0.001; // 座標がこの範囲内になったらachievementを表示

  // 巡礼済みのピンの色
  const visitedPinColor = '#FFA500';

  // 現在の位置との距離を計算する関数
  const calculateDistance = (currentLocation, location) => {
    const lat1 = currentLocation.lat;
    const lon1 = currentLocation.lng;
    const lat2 = location.latitude;
    const lon2 = location.longitude;

    const R = 6371; // 地球の半径（キロメートル）
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  useEffect(() => {
    const initializeMap = ({ latitude, longitude }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        center: [longitude, latitude], // ユーザーの現在地またはデフォルト位置
        zoom: 1000,
        style: 'mapbox://styles/mapbox/streets-v12',
      });

      const language = new MapboxLanguage({ defaultLanguage: 'ja' });
      map.addControl(language);

      map.on('load', () => {
        setMap(map);
        map.resize();
      });
    };

    const options = {
      enableHighAccuracy: true, // 高精度な位置情報を要求
      timeout: 10000, // 位置情報取得のタイムアウトを10秒に設定
      maximumAge: 0 // キャッシュされた位置情報は使用しない
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        // 現在地の取得に成功
        initializeMap({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      }, () => {
        // 現在地の取得に失敗した場合、デフォルト位置を使用
        initializeMap({
          latitude: 35.6811673, // 東京駅の緯度
          longitude: 139.7670516 // 東京駅の経度
        });
      }, options);
    } else {
      // Geolocation APIが利用不可の場合、デフォルト位置を使用
      initializeMap({
        latitude: 35.6811673, // 東京駅の緯度
        longitude: 139.7670516 // 東京駅の経度
      });
    }
  }, []);

  // 地名を入力して緯度、緯度を取得する関数
  async function getCoordinates(placeName) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(placeName)}`;
  
    try {
      const response = await fetch(url, { headers: { 'User-Agent': 'YourAppName' } });
      const data = await response.json();
  
      if (data.length > 0) {
        const { lat, lon } = data[0]; // 最初の結果の緯度と経度を取得
        return { latitude: lat, longitude: lon };
      } else {
        // 座標が見つからない場合は、緯度と経度を0に設定
        return { latitude: 0, longitude: 0 };
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      // エラーが発生した場合も、緯度と経度を0に設定
      return { latitude: 0, longitude: 0 };
    }
  }
  

  useEffect(() => {
    if (map && json_data) {
      // 既存のマーカーをクリア
      markers.current.forEach(marker => marker.remove());
      markers.current = [];

      // 現在の位置を取得
      const currentLocation = map.getCenter();

      // selectedSeriesIdが9999の場合、全シリーズのロケーションを表示
      if (selectedSeriesId === 9999) {
        Object.values(json_data).flat().forEach(series => {
          Object.entries(series.address).forEach(([locationId, location]) => {
            getCoordinates(location.name).then(coordinates => {
              // 座標が0,0の場合はマーカーを追加しない
              if (coordinates.latitude !== 0 || coordinates.longitude !== 0) {
                console.log("locationName!!" + JSON.stringify(location.name, null, 2));
                console.log("latitude" + coordinates.latitude);
                console.log("longitude" + coordinates.longitude);

                const markerColor = location.gone === 1 ? visitedPinColor : 'red';
                const marker = new mapboxgl.Marker({ color: markerColor })
                  .setLngLat([coordinates.longitude, coordinates.latitude])
                  .addTo(map);
                markers.current.push(marker);
              }
            })


            // 現在の位置との距離を計算
            const distance = calculateDistance(currentLocation, location);
            // 距離がachievementThreshold以下の場合、作品IDと場所IDをコンソールに表示
            if (distance < achievementThreshold) {
              console.log(`Achievement!! 作品ID: ${series.id}, 場所ID: ${locationId}`);
              const title = json_data[series.id].title;
              const locationName = json_data[series.id].address[locationId].name;

              console.log(`Achievement!! 作品名: ${title}, 場所名: ${locationName}`);

              const backendURL = 'http://localhost:8000/api/user_gone';

              fetch(backendURL, {
                method: 'POST', // POSTリクエストを送信することを指定
                headers: {
                  'Content-Type': 'application/json', // リクエストボディのコンテンツタイプをJSONに設定
                },
                body: {"title":title,"location":locationName },
              })
                .then((response) => response.json())
                .then((data) => {
                  // バックエンドからの応答を処理
                  console.log(data); // 応答データをコンソールに出力する例
                })
                .catch((error) => {
                  console.error('Error occurred:', error);
                });
            }
          });
        });
      } else {
        // 特定のシリーズのロケーションを表示
        const series = Object.values(json_data).flat().find(s => s.id === selectedSeriesId);
        if (series) {
          Object.entries(series.address).forEach(([locationId, location]) => {
            getCoordinates(location.name).then(coordinates => {
              // 座標が0,0の場合はマーカーを追加しない
              if (coordinates.latitude !== 0 || coordinates.longitude !== 0) {
                console.log("locationName!!" + JSON.stringify(location.name, null, 2));
                console.log("latitude" + coordinates.latitude);
                console.log("longitude" + coordinates.longitude);

                const markerColor = location.gone === 1 ? visitedPinColor : 'red';
                const marker = new mapboxgl.Marker({ color: markerColor })
                  .setLngLat([coordinates.longitude, coordinates.latitude])
                  .addTo(map);
                markers.current.push(marker);
              }
            })

            // 現在の位置との距離を計算
            const distance = calculateDistance(currentLocation, location);

            // 距離がachievementThreshold以下の場合、作品IDと場所IDをコンソールに表示
            if (distance < achievementThreshold) {
              console.log(`Achievement!! 作品ID: ${selectedSeriesId}, 場所ID: ${locationId}`);
              const title = json_data[series.id].title;
              const locationName = json_data[series.id].address[locationId].name;

              console.log(`Achievement!! 作品名: ${title}, 場所名: ${locationName}`);
            }
          });
        }
      }
    }
  }, [map, json_data, selectedSeriesId]);

  return (
    <div>
      <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
};

MapComponent.propTypes = {
  json_data: PropTypes.array.isRequired,
  selectedSeriesId: PropTypes.number.isRequired,
};

export default MapComponent;
