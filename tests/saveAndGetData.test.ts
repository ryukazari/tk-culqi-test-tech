import container from "../inversify.config";
import { CardService } from "../src/application/card.service";
import { RequestCreateTokenDto } from "../src/domain/dto/create-token.request.dto";
require("dotenv").config();

describe("Create and Get data", () => {
  let token = "";
  const correct_card_data: RequestCreateTokenDto = {
    email: "prueba1@gmail.com",
    card_number: 4111111111111111,
    cvv: 123,
    expiration_year: "2023",
    expiration_month: "09",
  };
  const cardService = container.get(CardService);

  it("should return a token according to the lenght sent: 16", async () => {
    const responsetoken = await cardService.saveDataByToken(correct_card_data);
    if (!responsetoken) return false;
    token = responsetoken;
    expect(responsetoken).toBeDefined();
    expect(responsetoken).toHaveLength(16);
  });
  it("should get data just created", async () => {
    if (!token) return false;
    const result = await cardService.getDataByToken(token);
    if (!result) return false;
    const { cvv, ...data_result } = correct_card_data;
    expect(result).toMatchObject(data_result);
  });
});
