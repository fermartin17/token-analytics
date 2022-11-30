import * as React from "react";
import {Grid} from "@mui/material";

import {FC} from "react";
import "./Sidebar.scss";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Logo from "../../assets/logo.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Home from  "../../assets/home.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import File from  "../../assets/file.png";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Bill from "../../assets/bill.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Light from  "../../assets/light.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Tool from  "../../assets/tool.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Bell from  "../../assets/bell.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import User from  "../../assets/user.png";

export const Sidebar: FC = () => {
  return(
    <Grid container className={"sidebar"} style={{width:"63px"}}>
      <Grid container xs={12} sm={12} className={"sidebar-logo"}>
        <img src={Logo} className={"logo"}/>
      </Grid>
      <Grid container xs={12} sm={12} className={"sidebar-tools-section"}>
        <Grid xs={12} sm={12} md={12} >
          <Grid className={"tools-selected"}>
            <img src={Home} className={"sidebar-icon"}/>
          </Grid>
        </Grid>
        <Grid xs={12} sm={12} md={12} className={"sidebar-tools"}>
          <Grid className={"tools"}>
            <img src={File} className={"sidebar-icon"}/>
          </Grid>
        </Grid>
        <Grid xs={12} sm={12} md={12} className={"sidebar-tools"}>
          <Grid className={"tools"}>
            <img src={Bill} className={"sidebar-icon"}/>
          </Grid>
        </Grid>
        <Grid xs={12} sm={12} md={12} className={"sidebar-tools"}>
          <Grid className={"tools"}>
            <img src={Light} className={"sidebar-icon"}/>
          </Grid>
        </Grid>
        <Grid xs={12} sm={12} md={12} className={"sidebar-tools"}>
          <Grid className={"tools"}>
            <img src={Tool} className={"sidebar-icon"}/>
          </Grid>
        </Grid>
      </Grid>
      <Grid container xs={12} sm={12} md={12} className={"sidebar-footer-section"}>
        <Grid xs={12} sm={12} md={12} className={"sidebar-tools"}>
          <Grid className={"tools"}>
            <img src={Bell} className={"sidebar-icon"}/>
          </Grid>
        </Grid>
        <Grid xs={12} sm={12} md={12} className={"sidebar-tools"}>
          <Grid className={"tools"}>
            <img src={User} className={"sidebar-footer-user"}/>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};