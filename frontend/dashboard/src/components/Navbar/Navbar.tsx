import {NavbarInterface} from "./NavbarInterface";
import * as React from "react";

import "./Navbar.scss";

import {FC} from "react";
import {Grid} from "@mui/material";

export const Navbar: FC<NavbarInterface> = ({title}) => {

  return (
    <Grid container xs={12} sm={12} md={12} className={"navbar"}>
      <Grid xs={12} sm={6} md={6} className={"navbar-text"}>
        {title}
      </Grid>
      <Grid xs={12} sm={6} md={6} className={"navbar-search"}>
        <input className={"search-input"} type="text" placeholder="Search..." />
      </Grid>
    </Grid>
  );
};