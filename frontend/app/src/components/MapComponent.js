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
        zoom: 15,
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
          latitude: 13,
          longitude: 45
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
            const markerColor = location.gone === 1 ? visitedPinColor : 'red';
            const marker = new mapboxgl.Marker({ color: markerColor })
              .setLngLat([location.longitude, location.latitude])
              .addTo(map);
            markers.current.push(marker);

            // 現在の位置との距離を計算
            const distance = calculateDistance(currentLocation, location);

            // 距離がachievementThreshold以下の場合、作品IDと場所IDをコンソールに表示
            if (distance < achievementThreshold) {
              console.log(`Achievement!! 作品ID: ${series.id}, 場所ID: ${locationId}`);
            }
          });
        });
      } else {
        // 特定のシリーズのロケーションを表示
        const series = Object.values(json_data).flat().find(s => s.id === selectedSeriesId);
        if (series) {
          Object.entries(series.address).forEach(([locationId, location]) => {
            const markerColor = location.gone === 1 ? visitedPinColor : 'red';
            const marker = new mapboxgl.Marker({ color: markerColor })
              .setLngLat([location.longitude, location.latitude])
              .addTo(map);
            markers.current.push(marker);

            // 現在の位置との距離を計算
            const distance = calculateDistance(currentLocation, location);

            // 距離がachievementThreshold以下の場合、作品IDと場所IDをコンソールに表示
            if (distance < achievementThreshold) {
              console.log(`Achievement!! 作品ID: ${selectedSeriesId}, 場所ID: ${locationId}`);
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
