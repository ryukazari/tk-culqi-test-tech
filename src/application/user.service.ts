import { inject, injectable } from "inversify";
import { ResponseGetPkDto } from "../domain/dto/get-pk.response.dto";
import { UserRepository } from "../domain/user.repository";

@injectable()
export class UserService {
  constructor(
    @inject("USER_REPOSITORY")
    private readonly repository: UserRepository
  ) {}

  public getPkUser(): ResponseGetPkDto {
    return this.repository.getPk();
  }
}
