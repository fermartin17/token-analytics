import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { UniswapService } from '../domain/uniswap.service.interface';
import { PairHourDataFetch } from '../domain/pairHourData/pair.hour.data.fetch';
import { FailToFetchDataFromUniswapError } from "../errors/fail.to.fetch.data.from.uniswap.error";

@Injectable()
export class UniswapV2ServiceImpl implements UniswapService {
  private BaseAxiosConfig: AxiosRequestConfig = {
    baseURL: process.env.UNISWAP_URL,
  };
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create(this.BaseAxiosConfig);
  }

  private generatePairHourDataQuery = (
    pairId: string,
    fromWhen: number,
  ): string => {
    return `{
  pairHourDatas(
    where:{
      pair: "${pairId}"
    hourStartUnix_gt: ${fromWhen}
    }
    orderBy: hourStartUnix
    orderDirection: desc
  ){
    hourStartUnix
    hourlyVolumeUSD
    reserve0
    reserve1
    reserveUSD
  }
  }`;
  };

  async getPairHourDataByPairIdAndFromWhen(
    pairId: string,
    dateFrom: number,
  ): Promise<PairHourDataFetch[]> {
    try {
      const response = await this.axiosInstance.post(
        this.BaseAxiosConfig.baseURL,
        {
          query: this.generatePairHourDataQuery(pairId, dateFrom),
        },
      );

      return response.data.data.pairHourDatas;
    } catch (error: unknown) {
      throw new FailToFetchDataFromUniswapError();
    }
  }
}
