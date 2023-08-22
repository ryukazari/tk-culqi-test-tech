import { RequestCreateTokenDto } from "../application/dto/create-token.request.dto";
import { ResponseGetCardByTokenDto } from "../application/dto/get-card-by-token.response.dto";

export interface CardRepository {
  saveCardByToken(token: string, payload: RequestCreateTokenDto): Promise<void>;
  getToken(token: string): Promise<ResponseGetCardByTokenDto>;
}
