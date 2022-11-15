import {FC} from "react";
import {CardInterface} from "../../domain/CardInterface";
import {Grid} from "@mui/material";
import * as React from "react";

import "./Card.scss";


export const Card: FC<CardInterface> = ({title, description, variation}) => {
  return(
    <div className={"card"}>
      <Grid container>
        <Grid container xs={12} sm={12} md={12} className={"card-title"}>
          <Grid item>
            {title}
          </Grid>
        </Grid>
        <Grid container xs={12} sm={12} md={12}>
          {
            description &&
            <Grid item xs={6} sm={6} md={6} className={"card-description"}>
              {description}
            </Grid>
          }
          {
            description && variation &&
            <Grid item xs={6} sm={6} md={6} className={"card-description-variation"}>
              {variation}
            </Grid>
          }
          { !description && variation &&
              <Grid item xs={6} sm={6} md={6} className={"card-variation"}>
                {variation}
              </Grid>
          }
        </Grid>
      </Grid>
    </div>
  );
};