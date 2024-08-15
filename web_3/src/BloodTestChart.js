import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BloodTestChart = ({ data }) => {
  const chartData = {
    labels: data.map((result) => result.date),
    datasets: [
      {
        label: 'RBC',
        data: data.map((result) => parseFloat(result.parameters.find((param) => param.name === 'RBC').value)),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Hemoglobin',
        data: data.map((result) => parseFloat(result.parameters.find((param) => param.name === 'Hemoglobin').value)),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      },
      {
        label: 'Hematocrit',
        data: data.map((result) => parseFloat(result.parameters.find((param) => param.name === 'Hematocrit').value)),
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
      },
    ],
  };

  return <Line data={chartData} />;
};

export default BloodTestChart;
