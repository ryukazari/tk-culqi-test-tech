export interface UserRepository {
  getPk(token: string): boolean;
}
