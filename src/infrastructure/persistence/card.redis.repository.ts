import { injectable } from "inversify";
import { CardRepository } from "../../domain/card.repository";
import { RequestCreateTokenDto } from "../../domain/dto/create-token.request.dto";
import { ResponseGetCardByTokenDto } from "../../domain/dto/get-card-by-token.response.dto";
import { closeClient, getClient } from "../database/connection";
import { InvalidTokenCardError } from "../../errors/card.error";

@injectable()
export class CardRedisRepository implements CardRepository {
  async saveCardByToken(
    token: string,
    payload: RequestCreateTokenDto
  ): Promise<void> {
    try {
      const client = await getClient();
      await client.set(token, JSON.stringify(payload));
      await client.expire(token, 900);
    } finally {
      closeClient();
    }
  }
  async getToken(token: string): Promise<ResponseGetCardByTokenDto> {
    try {
      const client = await getClient();
      const response = await client.get(token);
      if (!response || response === null) throw new InvalidTokenCardError();
      const jsonResponse = JSON.parse(response);
      delete jsonResponse.cvv;
      return jsonResponse;
    } finally {
      closeClient();
    }
  }
}
