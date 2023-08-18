import { authMiddleware } from "../middlewares/auth.middleware";
import { validateIdCard } from "../utils/validations";
import { getDataByToken } from "../utils/repository";

export const getCardDetails = async (event: any): Promise<any> => {
  try {
    const { id } = event.pathParameters;
    authMiddleware(event);
    validateIdCard(id);
    const data = await getDataByToken(id);
    if (!data) {
      throw new Error("The data does not exist or expired");
    }
    const dataJson = JSON.parse(data);
    delete dataJson.cvv;
    return {
      statusCode: 200,
      body: JSON.stringify(dataJson),
    };
  } catch (error) {
    if ((error as Error).message === "Invalid parameter ID") {
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
    if ((error as Error).message === "The data does not exist or expired") {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: (error as Error).message }),
      };
    }
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
