import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config()

export const redis = new createClient({
    url: process.env.REDIS_URL
});

await redis.connect();

export const EXPIRATION = 3600;
