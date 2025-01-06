import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function Dashboard() {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "User Growth",
        data: [10, 20, 40, 35, 50, 60],
        fill: false,
        borderColor: "#4F46E5",
        tension: 0.1,
        pointBackgroundColor: "#4F46E5",
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw} users`,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
      y: {
        title: {
          display: true,
          text: "Users",
        },
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <>
      <div className="bg-gray-100 p-4 flex justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-4">
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Users</h2>
          <p className="text-3xl font-bold text-blue-500">1,024</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-600">Total Orders</h2>
          <p className="text-3xl font-bold text-green-500">542</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center">
          <h2 className="text-lg font-semibold text-gray-600">
            Total Products
          </h2>
          <p className="text-3xl font-bold text-purple-500">312</p>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 overflow-hidden">
        <h2 className="text-lg font-semibold text-gray-600 mb-4">
          User Growth
        </h2>
        <div className="w-[95%] mx-auto h-[300px] md:h-[400px] lg:h-[500px]">
          <Line data={data} options={options} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
