export interface UseCase<C, T> {
  execute(command: C): Promise<T>;
}
