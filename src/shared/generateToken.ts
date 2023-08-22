import * as crypto from "crypto";

export const generateToken = (length: number): string => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const randomBytes = crypto.randomBytes(length);
  const token: string[] = [];

  for (let i = 0; i < length; i++) {
    const randomIndex = randomBytes[i] % characters.length;
    token.push(characters[randomIndex]);
  }

  return token.join("");
};
