import {FC} from "react";
import * as React from "react";
import {Grid} from "@mui/material";
import "./LineChart.scss";
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
import { Line } from "react-chartjs-2";
import {LineChartInterface} from "./LineChartInterface";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  maintainAspectRatio:false,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display:false,
      }
    },
    y: {
      grid: {
        display:true,
        drawBorder: false,
      }
    },
  }
};

// const labels = ["January", "February", "March", "April", "May", "June", "July"];
// const values = [50, 0, 100, 200, 300, 250, 200];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: "Dataset 1",
//       data: values,
//       borderColor: "#2E71F0",
//       backgroundColor: "#2E71F0",
//       borderWidth: 1.5,
//       pointBackgroundColor: "#fff",
//     }
//   ],
// };

export const LineChart: FC<LineChartInterface> = ({title, chartLegend, labels, values}) =>{
  const data = {
    labels,
    datasets: [
      {
        data: values,
        borderColor: "#2E71F0",
        backgroundColor: "#2E71F0",
        borderWidth: 1.5,
        pointBackgroundColor: "#fff",
      }
    ],
  };

  return(
    <Grid container>
      <Grid className={"chart"}>
        <Line options={options} data={data}/>
      </Grid>
    </Grid>
  );
};