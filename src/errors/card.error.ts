class CardError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CardError";
  }
}

export class InvalidCardError extends CardError {
  constructor() {
    super(`Card has not a valid format or it's empty.`);
    this.name = "InvalidCardError";
  }
}

export class InvalidIdCardParameter extends CardError {
  constructor() {
    super(`Invalid parameter ID.`);
    this.name = "InvalidIdCardParameter";
  }
}

export class InvalidTokenCardError extends CardError {
  constructor() {
    super(`The data does not exist or expired.`);
    this.name = "InvalidTokenCardError";
  }
}

export default CardError;
