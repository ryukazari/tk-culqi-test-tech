import { APIGatewayProxyHandler } from "aws-lambda";
import { createToken } from "./services/tokenCreation";

export const handler: APIGatewayProxyHandler = async (event): Promise<any> => {
  return await createToken(event);
};
