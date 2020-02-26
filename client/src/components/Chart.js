import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function Chart({ labels, data }) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['M', 'Tu', 'W', 'Th', 'F', 'Sa', 'Su'];
  const years = [];

  const chartLabels = (listData, labelList) => {
    const chartLabelArray = [];
    for (let i = 0; i < listData.length; i++) {
      chartLabelArray.push(labelList[i % labelList.length]);
    }
    return chartLabelArray;
  };

  const chartData = {
    labels: chartLabels(data, days),
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(46, 134, 193)',
      borderColor: 'rgb(21, 67, 96)',
      data,
    }],
  };


  return (
    <div>
      <Bar data={chartData} />
    </div>
  );
}
