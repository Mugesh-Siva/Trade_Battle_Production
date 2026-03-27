import { createClient } from "redis";

let client;

export const connectRedis = async () => {
  if (client) return client; // reuse existing connection

  client = createClient({
    url: process.env.REDIS_URL,
  });

  client.on("error", (err) => {
    console.error("❌ Redis Error:", err);
  });

  client.on("connect", () => {
    console.log("✅ Redis Connected");
  });

  await client.connect();

  return client;
};

export const getRedis = () => {
  if (!client) {
    throw new Error("❌ Redis not initialized. Call connectRedis() first.");
  }
  return client;
};