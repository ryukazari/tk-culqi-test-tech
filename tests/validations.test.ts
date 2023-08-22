import { validateCardData, validateIdCard } from "../src/shared/validations";

describe("Validate data", () => {
  const correct_card_data = {
    email: "prueba1@gmail.com",
    card_number: 4111111111111111,
    cvv: 123,
    expiration_year: "2023",
    expiration_month: "09",
  };
  const valid_id_card = "w3Z0LBoTiB9P21zE";
  const invalid_id_card = "w3Z0LBoTiB9P21zEzWQE";
  it("should pass validation card data", async () => {
    const { card_number, cvv, expiration_month, expiration_year, email } =
      correct_card_data;
    expect(() => {
      validateCardData(
        card_number,
        cvv,
        expiration_month,
        expiration_year,
        email
      );
    }).not.toThrow();
  });
  it("should not pass validation card data", async () => {
    const { card_number, cvv, expiration_year, email } = correct_card_data;
    expect(() => {
      validateCardData(card_number, cvv, "25", expiration_year, email);
    }).toThrow("Card has not a valid format or it's empty.");
  });
  it("Should pass validation for id_card format", async () => {
    expect(() => {
      validateIdCard(valid_id_card);
    }).not.toThrow();
  });
  it("Should not pass validation for id_card format", async () => {
    expect(() => {
      validateIdCard(invalid_id_card);
    }).toThrow("Invalid parameter ID.");
  });
});
