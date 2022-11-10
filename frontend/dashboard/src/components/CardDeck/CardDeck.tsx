import * as React from "react";
import {Grid} from "@mui/material";

import "./CardDeck.scss";
import {FC} from "react";
import {CardDeckInterface} from "../../domain/CardDeckInterface";
import {CardInterface} from "../../domain/CardInterface";
import {Card} from "../Card/Card";

export const CardDeck: FC<CardDeckInterface> = ({items}) => {
    

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

  return (
    <Grid container spacing={2} direction="row" alignItems="flex-start">
      {cards.map((elem: CardInterface) => (
        <Grid item xs={12} sm={6} md={2} key={elem.title}>
          <Card {...elem} />
        </Grid>
      ))}
    </Grid>
  );
};
