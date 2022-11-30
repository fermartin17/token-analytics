import {CardSectionInterface} from "./interfaces/CardSectionInterface";
import {FC} from "react";

import * as React from "react";
import {Grid} from "@mui/material";
import {CardDeck} from "../../../components/CardDeck/CardDeck";

import "./styles/CardSection.scss";

export const CardSection: FC<CardSectionInterface> = ({title, analytics}) => {
  return(
    <Grid container xs={12} sm={12} md={12} className={"section"}>
      <Grid xs={12} sm={12} md={12} className={"section-title-text"}>
        {title}
      </Grid>
      <CardDeck items={analytics.items}></CardDeck>
    </Grid>
  );
};