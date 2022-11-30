import {FC, useEffect, useMemo, useState} from "react";
import * as React from "react";
import {Grid} from "@mui/material";
import {ChartSectionInterface} from "./interfaces/ChartSectionInterface";
import {LineChart} from "../../../components/LineChart/LineChart";
import * as moment from "moment";

import "../sections/styles/ChartSection.scss";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Help from "../../../assets/help.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Back from "../../../assets/back.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Download from "../../../assets/download.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import View from "../../../assets/view.png";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Options from "../../../assets/options.png";
import {PairHourDataApi} from "../../../api/pairHourData/pair.hour.data.api";
import {useParams, useSearchParams} from "react-router-dom";
import {PairHourDataApr} from "../../../domain/PairHourDataApr";

export const ChartSection: FC<ChartSectionInterface> = ({title, chartLegend}) => {
  const {pairToken} = useParams();
  const [labels, setLabels] = useState<string[]>([]);
  const [values, setValues] = useState<string[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [oneHourActive, setOneHourActive] = useState<boolean>(false);
  const [sixHourActive, setSixHourActive] = useState<boolean>(false);
  const [twelveHourActive, setTwelveHourActive] = useState<boolean>(false);
  
  const HOUR_AVERAGE_QUERY_PARAMETER_KEY = "hour_average";
  const DEFAULT_HOUR_AVERAGE = "12";

  const cleanActiveButtons = (): void => {
    setOneHourActive(false);
    setSixHourActive(false);
    setTwelveHourActive(false);
  };
  
  const activeButtonSelected = (hourAverage: string): void => {
    if(hourAverage == "1"){
      setOneHourActive(true);
    }
    else if(hourAverage == "6"){
      setSixHourActive(true);
    }
    else if(hourAverage == "12"){
      setTwelveHourActive(true);
    }
  };

  const pairHourDataApi: PairHourDataApi = new PairHourDataApi();
  
  const timeAverageButtonClicked = async (hourAverage: string): Promise<void> => {
    cleanActiveButtons();
    activeButtonSelected(hourAverage);
    setSearchParams({"hour_average": hourAverage});
  };

  useEffect((): void => {
    try {
      (async () => {
        let hourAverageQueryParam: string = searchParams.get(HOUR_AVERAGE_QUERY_PARAMETER_KEY);

        if(!hourAverageQueryParam){
          hourAverageQueryParam = DEFAULT_HOUR_AVERAGE;
        }

        activeButtonSelected(hourAverageQueryParam);

        await pairHourDataApi.findAllPairHourDataAprByPairId(pairToken, hourAverageQueryParam)
          .then((elems:PairHourDataApr[]) => {
            setLabels([]);
            setValues([]);
            elems.forEach((elem: PairHourDataApr) => {
              setLabels(labels => [...labels, (moment(elem.date)).format("DD MMM HH") + "hs"]);
              setValues(values => [...values, elem.value.toString()]);
            });
          });
      })();
    } catch (response) {
      console.log("error", response);
    }}, [searchParams]);

  return (
    <Grid container xs={12} sm={12} md={12}>
      <Grid xs={12} sm={12} md={12} className={"section-chart-title"}>
        {title}
      </Grid>
      <Grid container className={"container-card"}>
        <Grid container className={"header"}>
          <Grid item xs={12} sm={6} md={6} lg={6} className={"chart-title"}>
            {title}
            <img src={Help} className={"icon-title"}/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} className={"chart-icons"}>
            <img src={Back} className={"icon"}/>
            <img src={Download} className={"icon"}/>
            <img src={View} className={"icon"}/>
            <img src={Options} className={"icon"}/>
          </Grid>
        </Grid>
        <Grid container className={"legend"}>
          <span className={"circle"}></span>
          <div className={"legend-text"}>{chartLegend}</div>
        </Grid>
        <Grid container className={"buttons-section"}>
          <Grid className={oneHourActive ? "time-button selected" : "time-button"}>
            <div className={"time-button-text"} onClick={() => timeAverageButtonClicked("1")}>1hs</div>
          </Grid>
          <Grid className={sixHourActive ? "time-button selected" : "time-button"}>
            <div className={"time-button-text"} onClick={() => timeAverageButtonClicked("6")}>6hs</div>
          </Grid>
          <Grid className={twelveHourActive ? "time-button selected" : "time-button"}>
            <div className={"time-button-text"} onClick={() => timeAverageButtonClicked("12")}>12hs</div>
          </Grid>
          <Grid className={"time-button"}>
            <div className={"time-button-text"}>1m</div>
          </Grid>
          <Grid className={"time-button"}>
            <div className={"time-button-text"}>3m</div>
          </Grid>
          <Grid className={"time-button"}>
            <div className={"time-button-text"}>6m</div>
          </Grid>
          <Grid className={"time-button"}>
            <div className={"time-button-text"}>1y</div>
          </Grid>
          <Grid className={"time-button"}>
            <div className={"time-button-text"}>YTD</div>
          </Grid>
          <Grid className={"custom-button"}>
            <div className={"time-button-text"}>Custom</div>
          </Grid>
          <Grid className={"time-button"}>
            <div className={"time-button-text"}>All</div>
          </Grid>
        </Grid>
        <Grid container>
          <LineChart labels={labels} values={values}></LineChart>
        </Grid>
      </Grid>
    </Grid>
  );
};