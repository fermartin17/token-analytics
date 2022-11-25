export class FailToCreatePairHourDataError extends Error {
  constructor(message = 'Failed to obtain pair hour data in database.') {
    super(message);
  }
}
