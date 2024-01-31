import './App.css';
import './globals.css';
import { useEffect, useState } from 'react';
import TitleComponent from "./components/TitleComponent";
import SearchComponent from "./components/SearchComponent";
import MapComponent from "./components/MapComponent";
import SidebarComponent from "./components/SidebarComponent";
import PilgrimageMeterComponent from "./components/PilgrimageMeterComponent";

function App() {
  const [data, setData] = useState(null);
  const [selectedSeriesId, setSelectedSeriesId] = useState(9999); // 型注釈を削除


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://127.0.0.1:5000/fetch_json');
        if (!res.ok) {
          throw new Error('Failed to retrieve data.');
        }
        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData();
  }, []); 

  const handleSeriesSelect = (id) => {
    setSelectedSeriesId(id); // 選択されたIDで状態を更新
  };

  if (!data) return <div>ローディング中...</div>;

  return (
    <main>
      <div className="title_component">
        <TitleComponent />
      </div>

      <div className="search_component">
        <SearchComponent />
      </div>

      <div className="pilgrimageMeter_component">
        <PilgrimageMeterComponent json_data={data} selectedSeriesId={selectedSeriesId}/>
      </div>

      <div className="map_component">
        <MapComponent json_data={data} selectedSeriesId={selectedSeriesId} />
      </div>

      <div className="sidebar_component">
        <SidebarComponent json_data={data} onSeriesSelect={handleSeriesSelect} />
      </div>
    </main>
  );
}

export default App;
