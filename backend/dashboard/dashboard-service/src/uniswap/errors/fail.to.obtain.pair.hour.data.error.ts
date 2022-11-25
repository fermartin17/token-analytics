export class FailToObtainPairHourDataError extends Error {
  constructor(message = 'Failed to obtain Pair Hour Data in database.') {
    super(message);
  }
}
