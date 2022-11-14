import {NavbarInterface} from "./NavbarInterface";
import * as React from "react";

import "./Navbar.scss";

import {FC} from "react";
import {Grid} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";


export const Navbar: FC<NavbarInterface> = ({title}) => {

  return (
    <Grid container xs={12} sm={12} md={12} className={"navbar"}>
      <Grid item xs={8} sm={8} md={8} className={"navbar-text"}>
                Dashboard
      </Grid>
      <Grid item xs={4} sm={4} md={4} className={"navbar-search"}>
        <SearchIcon/>
        <input className={"search-input"} type="text" placeholder="Search..." />
      </Grid>
    </Grid>
  );
};