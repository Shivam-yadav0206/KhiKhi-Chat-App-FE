import { Redis } from "@upstash/redis";
// console.log(process.env.UPSTASH_REDIS_REST_URL);
// console.log("sdfghj");
export const db = new Redis({
  url : process.env.UPSTASH_REDIS_REST_URL!,
  token : process.env.UPSTASH_REDIS_REST_TOKEN!,
});
