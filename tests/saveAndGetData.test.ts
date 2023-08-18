import { getDataByToken, saveDataWithToken } from "../src/utils/repository";
require("dotenv").config();

describe("Create and Get data", () => {
  let token = "";
  const correct_card_data = {
    email: "prueba1@gmail.com",
    card_number: 4111111111111111,
    cvv: 123,
    expiration_year: "2023",
    expiration_month: "09",
  };
  it("should return a token according to the lenght sent: 16", async () => {
    const responsetoken = await saveDataWithToken(
      JSON.stringify(correct_card_data)
    );
    if (!responsetoken) return false;
    const { body } = responsetoken;
    token = body;
    expect(body).toBeDefined();
    expect(body).toHaveLength(16);
  });
  it("should get data just created", async () => {
    if (!token) return false;
    const result = await getDataByToken(token);
    if (!result) return false;
    const resultJson = JSON.parse(result);
    const { cvv, ...data_result } = correct_card_data;
    expect(resultJson).toMatchObject(data_result);
  });
});
