import { APIGatewayProxyEventHeaders } from "aws-lambda";
import container from "../../inversify.config";
import { UserService } from "../application/user.service";
import {
  InvalidTokenError,
  TokenNotFoundError,
  UnauthorizedTokenError,
} from "../errors/authorization.error";

export const authMiddleware = (event: APIGatewayProxyEventHeaders) => {
  const token = event.Authorization;
  if (!token) throw new TokenNotFoundError();

  const userSevice = container.get(UserService);
  const { token: pk_default } = userSevice.getPkUser();

  const tokenRegex = /^pk_test_[A-Za-z0-9]{16}$/;

  const [prefix, authToken] = token.split(" ");
  if (
    !authToken ||
    !tokenRegex.test(authToken) ||
    prefix != "Bearer" ||
    pk_default != authToken
  ) {
    if (pk_default != authToken) {
      throw new UnauthorizedTokenError(authToken);
    }
    throw new InvalidTokenError(authToken);
  }
};
