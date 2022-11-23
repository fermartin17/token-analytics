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

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Help from  "../../assets/help.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Download from  "../../assets/download.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Back from  "../../assets/back.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import View from  "../../assets/view.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Options from  "../../assets/options.png";


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
        height: "2px",
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

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const values = [50, 0, 100, 200, 300, 250, 200];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: values,
      borderColor: "#2E71F0",
      backgroundColor: "#2E71F0",
      borderWidth: 1.5,
      pointBackgroundColor: "#fff",
    }
  ],
};

export const LineChartPlot: FC = () =>{
  return(
    <Grid container className={"container-card"}>
      <Grid container className={"header"}>
        <Grid item xs={12} sm={6} md={6} lg={6} className={"chart-title"}>
          Total Allocation
          <img src={Help} className={"icon-title"}/>
        </Grid>
        <Grid item xs={12} sm={6} md={6} lg={6} className={"chart-icons"}>
          <img src={Back} className={"icon"}/>
          <img src={Download} className={"icon"}/>
          <img src={View} className={"icon"}/>
          <img src={Options} className={"icon"}/>
        </Grid>
      </Grid>
      <Grid container className={"legend"}>
        <span className={"circle"}></span>
        <div className={"legend-text"}>Total Allocation</div>
      </Grid>
      <Grid container className={"buttons-section"}>
        <Grid className={"time-button"}>
          <div className={"time-button-text"}>1hs</div>
        </Grid>
        <Grid className={"time-button"}>
          <div className={"time-button-text"}>6hs</div>
        </Grid>
        <Grid className={"time-button"}>
          <div className={"time-button-text"}>12hs</div>
        </Grid>
        <Grid className={"time-button"}>
          <div className={"time-button-text"}>1m</div>
        </Grid>
        <Grid className={"time-button"}>
          <div className={"time-button-text"}>3m</div>
        </Grid>
        <Grid className={"time-button"}>
          <div className={"time-button-text"}>6m</div>
        </Grid>
        <Grid className={"time-button"}>
          <div className={"time-button-text"}>1y</div>
        </Grid>
        <Grid className={"time-button"}>
          <div className={"time-button-text"}>YTD</div>
        </Grid>
        <Grid className={"custom-button"}>
          <div className={"time-button-text"}>Custom</div>
        </Grid>
        <Grid className={"time-button"}>
          <div className={"time-button-text"}>All</div>
        </Grid>
      </Grid>
      <Grid container>
        <Grid item className={"chart"}>
          <Line options={options} data={data}/>
        </Grid>
      </Grid>
    </Grid>
  );
};