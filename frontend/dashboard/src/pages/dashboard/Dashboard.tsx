import {FC} from "react";
import * as React from "react";
import {Grid} from "@mui/material";

import "./Dashboard.scss";
import {useParams} from "react-router-dom";

import {Sidebar} from "../../components/Sidebar/Sidebar";
import {Navbar} from "../../components/Navbar/Navbar";
import {CardSection} from "./sections/CardSection";
import {CardDeckInterface} from "../../components/CardDeck/CardDeckInterface";
import {ChartSection} from "./sections/ChartSection";

export const Dashboard: FC = () => {
  const {pairToken} = useParams();
    
  console.log(pairToken);

  const section_1: CardDeckInterface = {
    items: [{
      title: "Total Allocation",
      description: "$2,533,557.32",
    },
    {
      title: "Day Change",
      description: "+$4,482.29",
      variation:"(0.18%)",
    },
    {
      title: "YTD Change",
      description: "+$1,360,225",
      variation:"(115,93%)",
    },
    {
      title: "Average Annualized Yield",
      description: "23%",
    },
    {
      title: "Total Deployed",
      description: "$21,000,000",
    }]};

  const section_2: CardDeckInterface = {
    items: [{
      title: "All-Time",
      variation: "8.838%",
    },
    {
      title: "30-Day",
      variation: "8.838%",
    },
    {
      title: "7-Day",
      variation: "7.382%",
    },
    {
      title: "24-Hour",
      variation: "7.765%",
    }]};
    
  return(
    <Grid container className={"board"}>
      <Sidebar/>
      <Grid className={"board-section"}>
        <Navbar title={"Dashboard"} />
        <Grid className={"analytics-section-top"}>
          <CardSection title={"Global Metrics"} analytics={section_1} />
        </Grid>
        <Grid className={"analytics-section"}>
          <CardSection title={"Annualized Returns"} analytics={section_2} />
        </Grid>
        <Grid className={"chart-section"}>
          <ChartSection chartLegend={"Total Allocation"} title={"Performance"}/>
        </Grid>
      </Grid>
    </Grid>
  );
};