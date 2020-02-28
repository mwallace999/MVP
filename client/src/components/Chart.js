import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function Chart({ labels, data, backgroundColor, borderColor }) {

  const chartData = {
    labels,
    datasets: [{
      // label,
      backgroundColor,
      borderColor,
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
    legend: {
      display: false,
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true,
          min: 0,
        },
      }],
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
      <Bar data={chartData} options={options} /*width="50%" height="100%"*/ />
    </div>
  );
}
