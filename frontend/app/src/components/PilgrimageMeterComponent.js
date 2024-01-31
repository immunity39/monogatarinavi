import React from 'react';



function calculateVisitedPercentage(series){
  const totalLocations = Object.keys(series.address).length;
  const visitedLocations = Object.values(series.address).filter((loc) => loc.gone === 1).length;
  return (visitedLocations / totalLocations) * 100;
}

function calculateTotalVisitedPercentage(json_data){
  let totalLocations = 0;
  let visitedLocations = 0;

  Object.values(json_data).forEach(series => {
    totalLocations += Object.keys(series.address).length;
    visitedLocations += Object.values(series.address).filter((loc)=> loc.gone === 1).length;
  });

  return (visitedLocations / totalLocations) * 100;
}

export default function PilgrimageMeterComponent({
  json_data,
  selectedSeriesId,
}) {
  const visitedPercentage = (() => {
    if (selectedSeriesId === 9999) {
      return calculateTotalVisitedPercentage(json_data);
    } else if (selectedSeriesId !== null) {
      const series = json_data[selectedSeriesId];
      return series ? calculateVisitedPercentage(series) : 0;
    } else {
      return 0;
    }
  })();

  const circleStyle = {
    fill: 'none',
    stroke: '#eee',
    strokeWidth: '4', // 印象的な見た目のためにストローク幅を増やしました
  };

  const progressStyle = {
    fill: 'none',
    stroke: '#FFA500',
    strokeWidth: '4', // 印象的な見た目のためにストローク幅を増やしました
    strokeDasharray: `${visitedPercentage} ${100 - visitedPercentage}`,
    transform: 'rotate(-90deg)',
    transformOrigin: 'center',
    transition: 'stroke-dasharray 0.5s ease-in-out', // プログレスバーのアニメーションをスムーズにするためのトランジション
  };

  const percentageBackgroundStyle = {
    fill: '#ddd', // パーセンテージテキストの背景をグレーに設定
  };

  return (
    <div className="pilgrimage-meter" style={{ position: 'relative', width: '100px', height: '100px' }}>
      <svg viewBox="0 0 36 36" className="circular-chart" style={{ width: '100%', height: '100%' }}>
        <path className="circle-bg"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          style={circleStyle}
        />
        <path className="circle"
          d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
          style={progressStyle}
        />
        <circle cx="18" cy="18" r="14" style={percentageBackgroundStyle} /> {/* パーセンテージテキストの背景をグレーに設定 */}
        <text x="18" y="20.35" className="percentage" textAnchor="middle" alignmentBaseline="middle" fontSize="10" fill="#333">
          {visitedPercentage.toFixed(0)}%
        </text>
      </svg>
    </div>
  );
}
