import {FC} from "react";
import {CardInterface} from "../../domain/CardInterface";
import {Grid} from "@mui/material";
import * as React from "react";

import "./Card.scss";


export const Card: FC<CardInterface> = ({title, description, percentage}) => {
  return(
    <div className={"card"}>
      <Grid container>
        <Grid container xs={12} sm={12} md={12} className={"card-title"}>
          <Grid item>
            {title}
          </Grid>
        </Grid>
        <Grid container xs={12} sm={12} md={12}>
          <Grid item xs={6} sm={6} md={6} className={"card-description"}>
            {description}
          </Grid>
          <Grid item xs={6} sm={6} md={6} className={"card-description-percentage"}>
            {percentage}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};