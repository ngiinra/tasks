import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
type XYData = {
  name: string;
  type?: string;
  values: number[];
};

function LineAreaChart({
  firstXYData,
  secondXYData,
  labels,
  yTitle,
}: {
  firstXYData: XYData;
  secondXYData: XYData;
  labels: string[];
  yTitle: string;
}) {
  const [state, setState] = useState({
    series: [
      {
        name: firstXYData.name,
        type: "area",
        data: firstXYData.values,
      },
      {
        name: secondXYData.name,
        type: "area",
        data: secondXYData.values,
      },
    ],
    options: {
      fill: {
        type: "solid",
        opacity: [0.55, 0.5],
      },
      labels: labels,
      yaxis: [
        {
          title: {
            text: yTitle,
          },
        },
      ],
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="line"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
}

export default LineAreaChart;
