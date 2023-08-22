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

  const tokenRegex = /^pk_test_[A-Za-z0-9]{16}$/;

  const [prefix, authToken] = token.split(" ");
  const isValid = userSevice.checkPkUser(authToken);
  if (
    !authToken ||
    !tokenRegex.test(authToken) ||
    prefix != "Bearer" ||
    !isValid
  ) {
    if (!isValid) {
      throw new UnauthorizedTokenError(authToken);
    }
    throw new InvalidTokenError(authToken);
  }
};
