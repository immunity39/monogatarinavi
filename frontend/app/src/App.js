import './App.css';
import './globals.css';
import { useEffect, useState } from 'react';
import TitleComponent from "./components/TitleComponent";
import SearchComponent from "./components/SearchComponent";
import MapComponent from "./components/MapComponent";
import SidebarComponent from "./components/SidebarComponent";
import PilgrimageMeterComponent from "./components/PilgrimageMeterComponent";
import Map from "./components/Map";

function App() {
  const [data, setData] = useState(null);
  const [selectedSeriesId, setSelectedSeriesId] = useState(9999); // 型注釈を削除

  const updateData = (newData) => {
    setData(newData);
  };


  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('http://localhost:8000/api/user_all_data');
        if (!res.ok) {
          throw new Error('Failed to retrieve data.');
        }
        const result = await res.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData();
  }, []); 

  const handleSeriesSelect = (id) => {
    setSelectedSeriesId(id); // 選択されたIDで状態を更新
  };

  if (!data) return (
    <main>
      <div className="title_component">
        <TitleComponent />
      </div>

      <div className="search_component">
        <SearchComponent onUpdateData={updateData}/>
      </div>

      <div className="map_component">
        <Map/>
      </div>
    </main>
  );

  return (
    <main>
      <div className="title_component">
        <TitleComponent />
      </div>

      <div className="search_component">
        <SearchComponent onUpdateData={updateData}/>
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
