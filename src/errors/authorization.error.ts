class AuthorizationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthorizationError";
  }
}

export class TokenNotFoundError extends AuthorizationError {
  constructor() {
    super(`Authorization token is missing. Authentication required.`);
    this.name = "TokenNotFoundError";
  }
}

export class InvalidTokenError extends AuthorizationError {
  constructor(invalidToken: string) {
    super(`Token ${invalidToken} is not valid.`);
    this.name = "InvalidTokenError";
  }
}

export class UnauthorizedTokenError extends AuthorizationError {
  constructor(unauthToken: string) {
    super(
      `Access forbidden. The provided token ${unauthToken} does not have the required permissions for this function.`
    );
    this.name = "UnauthorizedTokenError";
  }
}

export default AuthorizationError;
