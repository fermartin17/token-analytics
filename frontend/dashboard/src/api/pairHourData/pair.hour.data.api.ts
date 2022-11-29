import Axios from "axios";
import {PairHourDataApr} from "../../domain/PairHourDataApr";

export class PairHourDataApi {
    private static readonly PAIR_HOUR_DATA_BASE_URL: string = "/uniswap/pair-hour-datas";

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {}
    
    private findAllPairHourDataAprByPairIdUrl = (pairId: string): string => {
      return PairHourDataApi.PAIR_HOUR_DATA_BASE_URL + `/pairs/${pairId}`;
    };
    
    async findAllPairHourDataAprByPairId(pairId: string, hourAverage: string): Promise<PairHourDataApr[]>{
      return (await Axios.get(this.findAllPairHourDataAprByPairIdUrl(pairId), {params: {hour_average: hourAverage}})).data;
    }
}