import { APIGatewayProxyEvent } from "aws-lambda";
import { ResponseCreateTokenDto } from "../application/dto/create-token.response.dto";
import { authMiddleware } from "../middlewares/auth.middleware";
import { statusErrorMapping } from "../errors/errors-code";
import { InvalidCardError } from "../errors/card.error";
import { RequestCreateTokenDto } from "../application/dto/create-token.request.dto";
import container from "../../inversify.config";
import { CardService } from "../application/card.service";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<ResponseCreateTokenDto> => {
  try {
    const { headers, body } = event;
    authMiddleware(headers);
    if (!body) throw new InvalidCardError();
    const parsedBody: RequestCreateTokenDto = JSON.parse(body);
    const cardService = container.get(CardService);
    const token = await cardService.saveDataByToken(parsedBody);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      body: token,
    };
  } catch (error) {
    const statusCode = statusErrorMapping[(error as Error).name] || 500;
    return {
      statusCode,
      body: JSON.stringify({ message: (error as Error).message }),
    };
  }
};
