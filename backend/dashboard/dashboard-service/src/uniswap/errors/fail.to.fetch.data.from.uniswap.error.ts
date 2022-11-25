export class FailToFetchDataFromUniswapError extends Error {
  constructor(message = 'Failed to fetch data from uniswap.') {
    super(message);
  }
}
