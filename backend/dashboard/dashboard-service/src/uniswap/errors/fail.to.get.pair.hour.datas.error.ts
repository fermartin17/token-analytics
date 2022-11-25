export class FailToGetPairHourDatasError extends Error {
  constructor(message = 'Failed to get pair hour datas in database.') {
    super(message);
  }
}
