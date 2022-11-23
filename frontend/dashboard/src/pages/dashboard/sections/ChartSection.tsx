import {FC} from "react";
import * as React from "react";
import {Grid} from "@mui/material";
import {ChartSectionInterface} from "./interfaces/ChartSectionInterface";
import {LineChart} from "../../../components/LineChart/LineChart";

import "../sections/styles/ChartSection.scss";

export const ChartSection: FC<ChartSectionInterface> = ({title, chartLegend}) => {
  return(
    <Grid container xs={12} sm={12} md={12} lg={12}>
      <Grid xs={12} sm={12} md={12} className={"section-chart-title"}>
        {title}
      </Grid>
      <LineChart chartLegend={chartLegend} title={chartLegend}></LineChart>
    </Grid>
  );
};