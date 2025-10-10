"use client";
import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

function BarChart({ data, labels }: { data: number[]; labels: string[] }) {
  const [chartFeatures, setChartFeatures] = useState({
    series: [
      {
        data: data,
      },
    ],
    options: {
      plotOptions: {
        bar: {
          columnWidth: "45%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: labels,
        labels: {
          style: {
            fontSize: "16px",
            font: "Lalezar",
          },
        },
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart
        options={chartFeatures.options}
        series={chartFeatures.series}
        type="bar"
        height={200}
      />
    </div>
  );
}

export default BarChart;
