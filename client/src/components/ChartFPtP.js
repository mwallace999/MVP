import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function ChartFPtP({ label, labels, data }) {

  // const fptpDataAlg = () => {
  //   const fptpObj = {};
  //   for (let i = 1; i <= labels.length; i++) {
  //     fptpObj[i] = 0;
  //   }
  //   for (let j = 0; j < data.length; j++) {
  //     fptpObj[data[j][0]] += 1; //<--------
  //   }
  //   return Object.values(fptpObj);
  // };


  const chartData = {
    labels,
    datasets: [{
      label,
      backgroundColor: 'rgb(46, 134, 193)',
      borderColor: 'rgb(21, 67, 96)',
      data,
    }],
  };

  const options = {
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20,
      },
    },
  };


  return (
    <div>
      <Bar data={chartData} options={options} />
    </div>
  );
}
