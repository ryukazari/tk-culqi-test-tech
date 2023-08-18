import * as Joi from "joi";

export const validateCardData = (
  card_number: number,
  cvv: number,
  expiration_month: string,
  expiration_year: string,
  email: string
): void => {
  const schema = Joi.object({
    card_number: Joi.number()
      .min(1000000000000)
      .max(9999999999999999)
      .custom((value: number, helpers: Joi.CustomHelpers) => {
        if (luhnAlgorithmValidation(value)) {
          return value;
        } else {
          return helpers.message({
            card_number: "Card number did not pass the LUHN validation",
          });
        }
      })
      .required(),
    cvv: Joi.number().min(100).max(9999).required(),
    expiration_month: Joi.string()
      .regex(/^(0?[1-9]|1[0-2])$/)
      .required(),
    expiration_year: Joi.string()
      .regex(/^\d{4}$/)
      .custom((value: string, helpers: Joi.CustomHelpers) => {
        const numericValue = parseInt(value, 10);
        if (
          numericValue < new Date().getFullYear() ||
          numericValue > new Date().getFullYear() + 5
        ) {
          return helpers.message({
            expiration_year: "must be within the valid range",
          });
        }
        return value;
      })
      .required(),
    email: Joi.string()
      .email({
        tlds: { allow: false },
        minDomainSegments: 2,
      })
      .custom((value: string, helpers: Joi.CustomHelpers) => {
        const allowedDomains = ["gmail.com", "hotmail.com", "yahoo.es"];
        const domain = value.split("@")[1];
        if (!allowedDomains.includes(domain)) {
          return helpers.message({
            email: `must have a valid domain: ${allowedDomains.join(", ")}`,
          });
        }
        return value;
      })
      .required(),
  });

  const validationResult = schema.validate({
    card_number,
    cvv,
    expiration_month,
    expiration_year,
    email,
  });

  if (validationResult.error) {
    throw new Error("Invalid data in the request body");
  }
};

export const validateIdCard = (id: string): void => {
  const schema = Joi.object({
    id: Joi.string()
      .regex(/^[a-zA-Z0-9]{16}$/)
      .required(),
  });

  const validationResult = schema.validate({ id });
  if (validationResult.error) {
    throw new Error("Invalid data in the request body");
  }
};

const luhnAlgorithmValidation = (cardNumber: number): boolean => {
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
