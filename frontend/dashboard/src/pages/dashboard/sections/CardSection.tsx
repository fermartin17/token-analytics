import {CardSectionInterface} from "./interfaces/CardSectionInterface";
import {FC} from "react";

import * as React from "react";
import {Grid} from "@mui/material";
import {CardDeck} from "../../../components/CardDeck/CardDeck";
import {CardInterface} from "../../../domain/CardInterface";

import "./styles/CardSection.scss";

export const CardSection: FC<CardSectionInterface> = ({title, analytics}) => {
  const cards: CardInterface[] =[{
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
  },];
    
  return(
    <Grid container xs={12} sm={12} md={12} className={"section"}>
      <Grid xs={12} sm={12} md={12} className={"section-title-text"}>
        <Grid item>
          {title} Global Metrics
        </Grid>
      </Grid>
      <Grid container xs={12} sm={12} md={12} className={"section-deck"}>
        <CardDeck items={cards}></CardDeck>
      </Grid>
    </Grid>
  );
};