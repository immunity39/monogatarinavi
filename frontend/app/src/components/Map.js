import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import 'mapbox-gl/dist/mapbox-gl.css';
import TOKEN from "../token/token.json";

const Map = () => {
  mapboxgl.accessToken = TOKEN[0].token;
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initializeMap = ({ latitude, longitude }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        center: [longitude, latitude], // デフォルト位置
        zoom: 2,
        style: 'mapbox://styles/mapbox/streets-v12',
      });

      const language = new MapboxLanguage({ defaultLanguage: 'ja' });
      map.addControl(language);

      map.on('load', () => {
        setMap(map);
        map.resize();
      });
    };

    // デフォルト位置を使用してマップを初期化
    initializeMap({
      latitude: 35.6811673, // 東京駅の緯度
      longitude: 139.7670516 // 東京駅の経度
    });
  }, []);

  return (
    <div>
      <div ref={mapContainer} style={{ width: '100%', height: '100vh' }} />
    </div>
  );
};

export default Map;
