import { inject, injectable } from "inversify";
import { RequestCreateTokenDto } from "../domain/dto/create-token.request.dto";
import { validateCardData, validateIdCard } from "../shared/validations";
import { generateToken } from "../shared/generateToken";
import { CardRepository } from "../domain/card.repository";
import { ResponseGetCardByTokenDto } from "../domain/dto/get-card-by-token.response.dto";

@injectable()
export class CardService {
  constructor(
    @inject("CARD_REPOSITORY")
    private readonly repository: CardRepository
  ) {}

  async saveDataByToken(body: RequestCreateTokenDto): Promise<string> {
    const { card_number, cvv, expiration_month, expiration_year, email } = body;
    validateCardData(
      card_number,
      cvv,
      expiration_month,
      expiration_year,
      email
    );
    const token = generateToken(16);
    await this.repository.saveCardByToken(token, body);
    return token;
  }

  async getDataByToken(token: string): Promise<ResponseGetCardByTokenDto> {
    validateIdCard(token);
    return await this.repository.getToken(token);
  }
}
