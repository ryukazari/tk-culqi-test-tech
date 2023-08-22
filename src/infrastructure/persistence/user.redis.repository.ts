import { injectable } from "inversify";
import { UserRepository } from "../../domain/user.repository";
import { validUsers } from "../database/pk_users.mock.data";

@injectable()
export class UserRedisRepository implements UserRepository {
  getPk(token: string): boolean {
    return validUsers.includes(token);
  }
}
