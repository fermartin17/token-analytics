import * as React from "react";
import {Grid} from "@mui/material";

import "./CardDeck.scss";
import {FC} from "react";
import {CardDeckInterface} from "./CardDeckInterface";
import {CardInterface} from "../../domain/CardInterface";
import {Card} from "../Card/Card";

export const CardDeck: FC<CardDeckInterface> = ({items}) => {
  return (
    <Grid container direction="row" alignItems="flex-start"  className={"section-deck"}>
      {items.map((elem: CardInterface) => (
        <Grid item={true} xs={12} sm={6} md={3} lg={2} key={elem.title}>
          <Card {...elem} />
        </Grid>
      ))}
    </Grid>
  );
};
