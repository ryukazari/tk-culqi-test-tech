import { ResponseGetPkDto } from "./dto/get-pk.response.dto";

export interface UserRepository {
  getPk(): ResponseGetPkDto;
}
