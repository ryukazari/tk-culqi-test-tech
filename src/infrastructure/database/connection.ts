import { createClient } from "redis";
require("dotenv").config();

const client = createClient({
  url: "rediss://" + process.env.REDIS_ENDPOINT,
});

export const getClient = async () => {
  await client.connect();
  return client;
};

export const closeClient = () => {
  client.quit();
};
