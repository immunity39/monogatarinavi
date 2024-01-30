import React, { useState } from 'react';



export default function SidebarComponent({
  json_data,
  onSeriesSelect,
}) {
  // const [isOpen, setIsOpen] = useState(false);
  // const [selectedSeriesId, setSelectedSeriesId] = useState<number | null>(9999); // 初期値を9999に設定

  // const toggleList = () => {
  //   setIsOpen(!isOpen);
  // };

  // const selectSeries = (id) => {
  //   setSelectedSeriesId(id);
  //   onSeriesSelect(id);
  // };

  // const calculateVisitedPercent = (series) => {
  //   const totalLocations = Object.keys(series.address).length;
  //   const visitedLocations = Object.values(series.address).filter(
  //     (loc) => loc.gone === 1
  //   ).length;
  //   return ((visitedLocations / totalLocations) * 100).toFixed(2);
  // };

  // const styles = {
  //   button: {
  //     borderRadius: '30px',
  //     padding: '15px 30px',
  //     backgroundColor: '#FFA500',
  //     border: 'none',
  //     color: 'white',
  //     fontSize: '1.2em',
  //     cursor: 'pointer',
  //     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  //     transition: 'all 0.3s ease-in-out',
  //   },
  //   listContainer: {
  //     marginTop: '20px',
  //     backgroundColor: '#f8f9fa',
  //     padding: '15px',
  //     borderRadius: '10px',
  //     boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
  //     maxHeight: '400px',
  //     overflowY: 'auto', // 正しい型を指定
  //   },
  //   listItem: {
  //     marginBottom: '10px',
  //     display: 'flex',
  //     alignItems: 'center',
  //     justifyContent: 'space-between',
  //     padding: '12px',
  //     backgroundColor: 'white',
  //     borderRadius: '8px',
  //     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.15)',
  //     cursor: 'pointer',
  //     transition: 'all 0.3s ease-in-out',
  //   },
  //   selectedListItem: {
  //     backgroundColor: '#FFA500',
  //     color: 'white',
  //     fontWeight: 'bold',
  //   },
  // };

  // const seriesArray = Object.values(json_data).flat();

  return (
    <div>aaa</div>
    // <div>
    //   <button onClick={toggleList} style={styles.button}>
    //     {isOpen ? 'Close' : 'Open'}
    //   </button>
    //   {isOpen && (
    //     <div style={styles.listContainer}>
    //       {/* ALLボタンの追加 */}
    //       <button
    //         key={9999}
    //         style={{
    //           ...styles.listItem,
    //           ...(9999 === selectedSeriesId ? styles.selectedListItem : {}),
    //           width: '100%',
    //           height: '60px',
    //         }}
    //         onClick={() => selectSeries(9999)}
    //       >
    //         <span>All Series</span>
    //       </button>
    //       {seriesArray.map((series, index) => (
    //         <button
    //           key={index}
    //           style={{
    //             ...styles.listItem,
    //             ...(series.id === selectedSeriesId ? styles.selectedListItem : {}),
    //             width: '100%',
    //             height: '60px',
    //           }}
    //           onClick={() => selectSeries(series.id)}
    //         >
    //           <span>{series.title}</span>
    //         </button>
    //       ))}
    //     </div>
    //   )}
    // </div>
  );
}
