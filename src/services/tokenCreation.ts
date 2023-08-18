import { authMiddleware } from "../middlewares/auth.middleware";
import { saveDataWithToken } from "../utils/repository";
import { validateCardData } from "../utils/validations";

export const createToken = async (event): Promise<any> => {
  try {
    authMiddleware(event);
    if (!event.body) {
      throw new Error("Event body is empty");
    }
    const { card_number, cvv, expiration_month, expiration_year, email } =
      JSON.parse(event.body);
    validateCardData(
      card_number,
      cvv,
      expiration_month,
      expiration_year,
      email
    );
    return await saveDataWithToken(event.body);
  } catch (error) {
    if (
      (error as Error).message === "Invalid data in the request body" ||
      (error as Error).message === "Event body is empty"
    ) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: (error as Error).message }),
      };
    }
    if ((error as Error).message.includes("Invalid authorization token")) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: (error as Error).message }),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ message: (error as Error).message }),
    };
  }
};
