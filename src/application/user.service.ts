import { inject, injectable } from "inversify";
import { UserRepository } from "../domain/user.repository";

@injectable()
export class UserService {
  constructor(
    @inject("USER_REPOSITORY")
    private readonly repository: UserRepository
  ) {}

  public checkPkUser(token: string): boolean {
    return this.repository.getPk(token);
  }
}
