import { generateToken } from "./generateToken";
import { getClient, closeClient } from "./connection";

export const saveDataWithToken = async (data: string) => {
  try {
    const client = await getClient();
    const token = generateToken(16);
    await client.set(token, data);
    await client.expire(token, 900);
    return {
      headers: {
        "Content-Type": "application/json",
      },
      body: token,
    };
  } catch (error) {
    throw new Error("Internal server error");
  } finally {
    closeClient();
  }
};

export const getDataByToken = async (id: string) => {
  try {
    const client = await getClient();
    return await client.get(id);
  } catch (error) {
    throw new Error("Internal server error");
  } finally {
    closeClient();
  }
};
