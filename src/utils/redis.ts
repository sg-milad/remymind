import { createClient } from "redis"

export const redisClient = createClient({
  url: `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
})

redisClient.on("error", (err) => console.log("Redis Client Error", err))
