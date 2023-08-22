import { APIGatewayProxyEvent } from "aws-lambda";
import { statusErrorMapping } from "../errors/errors-code";
import { authMiddleware } from "../middlewares/auth.middleware";
import container from "../../inversify.config";
import { CardService } from "../application/card.service";
import { ResponseGetCardByTokenDto } from "../application/dto/get-card-by-token.response.dto";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<ResponseGetCardByTokenDto> => {
  try {
    const { headers, pathParameters } = event;
    const { id } = pathParameters;
    authMiddleware(headers);
    const cardService = container.get(CardService);
    const result = await cardService.getDataByToken(id);
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    const statusCode = statusErrorMapping[(error as Error).name] || 500;
    return {
      statusCode,
      body: JSON.stringify({ message: (error as Error).message }),
    };
  }
};
