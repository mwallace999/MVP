import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function Chart({ labels, data }) {

  const chartData = {
    labels,
    datasets: [{
      label: 'My First dataset',
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
