import { generateToken } from "../src/utils/generateToken";

describe("Generate Token function", () => {
  const result = generateToken(16);
  it("should return a token according to the lenght sent: 16", async () => {
    expect(result).toHaveLength(16);
    expect(result.length === 15).toBeFalsy();
    expect(result.length === 17).toBeFalsy();
  });
  it("should return a token in a correct format", async () => {
    expect(result).toMatch(/^[a-zA-Z0-9]{16}$/);
  });
});
