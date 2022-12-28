import {createClient} from "redis"

export const redisClient = createClient({url: "redis://default:redispw@localhost:55000"})

redisClient.on("error", (err) => console.log("Redis Client Error", err))

