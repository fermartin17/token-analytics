import {NavbarInterface} from "./NavbarInterface";
import * as React from "react";

import "./Navbar.scss";

import {FC} from "react";
import {Grid} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


export const Navbar: FC<NavbarInterface> = ({title}) => {

  return (
    <Grid container xs={12} sm={12} md={12} className={"navbar"}>
      <Grid item xs={12} sm={6} md={6} className={"navbar-text"}>
        {title}
      </Grid>
      <Grid item xs={12} sm={6} md={6} className={"navbar-search"}>
        <SearchIcon/>
        <input className={"search-input"} type="text" placeholder="Search..." />
      </Grid>
    </Grid>
  );
};