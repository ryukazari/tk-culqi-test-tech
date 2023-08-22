import { InvalidCardError, InvalidIdCardParameter } from "../errors/card.error";
import { z } from "zod";

export const validateCardData = (
  card_number: number,
  cvv: number,
  expiration_month: string,
  expiration_year: string,
  email: string
): void => {
  const schema = z.object({
    card_number: z
      .string()
      .refine((value) => luhnAlgorithmValidation(value), {
        message: "Card number did not pass the LUHN validation",
      })
      .refine(
        (value) =>
          Number(value) >= 1000000000000 && Number(value) <= 9999999999999999
      ),
    cvv: z
      .string()
      .refine((value) => Number(value) >= 100 && Number(value) <= 9999),
    expiration_month: z.string().regex(/^(0?[1-9]|1[0-2])$/),
    expiration_year: z
      .string()
      .regex(/^\d{4}$/)
      .refine((value) => {
        const numericValue = parseInt(value, 10);
        return (
          numericValue >= new Date().getFullYear() &&
          numericValue <= new Date().getFullYear() + 5
        );
      }, "Expiration year must be within the valid range"),
    email: z
      .string()
      .email({
        message: "Invalid email format",
      })
      .refine((value) => {
        const allowedDomains = ["gmail.com", "hotmail.com", "yahoo.es"];
        const domain = value.split("@")[1];
        return allowedDomains.includes(domain);
      }, "Email must have a valid domain"),
  });

  try {
    schema.parse({
      card_number: card_number.toString(),
      cvv: cvv.toString(),
      expiration_month,
      expiration_year,
      email,
    });
  } catch (error) {
    throw new InvalidCardError();
  }
};

export const validateIdCard = (id: string): void => {
  const schema = z.object({
    id: z
      .string()
      .regex(/^[a-zA-Z0-9]{16}$/)
      .min(16),
  });

  try {
    schema.parse({ id });
  } catch (error) {
    throw new InvalidIdCardParameter();
  }
};

const luhnAlgorithmValidation = (cardNumber: string): boolean => {
  const digits = cardNumber.toString().replace(/\D/g, "").split("").map(Number);
  let sum = 0;
  let isAlternate = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = digits[i];

    if (isAlternate) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isAlternate = !isAlternate;
  }

  return sum % 10 === 0;
};
