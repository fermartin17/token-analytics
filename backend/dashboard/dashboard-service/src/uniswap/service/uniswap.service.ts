import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { UniswapService } from '../domain/uniswap.service.interface';
import { PairHourDataFetch } from '../domain/pairHourData/pair.hour.data.fetch';

@Injectable()
export class UniswapServiceImpl implements UniswapService {
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
    } catch (error: any) {
      console.log(error);
    }
  }
}
