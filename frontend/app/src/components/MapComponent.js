import React, { useEffect, useState, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import 'mapbox-gl/dist/mapbox-gl.css';



export default function MapComponent({ json_data, selectedSeriesId }) {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN ?? '';
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);
  const markers = useRef([]); // 型注釈を削除


  // 巡礼済みのピンの色
  const visitedPinColor = '#FFA500';

  useEffect(() => {
    const initializeMap = () => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        center: [139.7670516, 35.6811673], // 東京駅を初期値点として表示
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

    if (!map) initializeMap();
  }, [map]);

  useEffect(() => {
    if (map && json_data) {
      // 既存のマーカーをクリア
      markers.current.forEach(marker => marker.remove());
      markers.current = [];

      // selectedSeriesIdが9999の場合、全シリーズのロケーションを表示
      if (selectedSeriesId === 9999) {
        Object.values(json_data).flat().forEach(series => {
          Object.values(series.address).forEach(location => {
            const markerColor = location.gone === 1 ? visitedPinColor : 'red';
            const marker = new mapboxgl.Marker({ color: markerColor })
              .setLngLat([location.longitude, location.latitude])
              .addTo(map);
            markers.current.push(marker);
          });
        });
      } else {
        // 特定のシリーズのロケーションを表示
        const series = Object.values(json_data).flat().find(s => s.id === selectedSeriesId);
        if (series) {
          Object.values(series.address).forEach(location => {
            const markerColor = location.gone === 1 ? visitedPinColor : 'red';
            const marker = new mapboxgl.Marker({ color: markerColor })
              .setLngLat([location.longitude, location.latitude])
              .addTo(map);
            markers.current.push(marker);
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
}
