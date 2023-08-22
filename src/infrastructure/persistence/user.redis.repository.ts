import { injectable } from "inversify";
import { ResponseGetPkDto } from "../../domain/dto/get-pk.response.dto";
import { UserRepository } from "../../domain/user.repository";

@injectable()
export class UserRedisRepository implements UserRepository {
  getPk(): ResponseGetPkDto {
    return {
      token: "pk_test_LsRBKejzCOEEWOsw",
    };
  }
}
