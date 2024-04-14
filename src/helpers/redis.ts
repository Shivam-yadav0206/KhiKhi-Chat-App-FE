// const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL;
// const authToken = process.env.UPSTASH_REDIS_REST_TOKEN;

// type Command = "zrange" | "sismember" | "get" | "smembers";

// export async function fetchRedis(
//   command: Command,
//   ...args: (string | number)[]
// ) {
//   const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join('/')}`
//   console.log(
//     "-------------------------------------------------------------------------------"
//   );
//   console.log("UPSTASH_REDIS_REST_URL", upstashRedisRestUrl);
//   console.log("UPSTASH_REDIS_REST_TOKEN", authToken);
//   console.log("Command URL", commandUrl);
//   console.log(
//     "-------------------------------------------------------------------------------"
//   );

//   const response = await fetch(commandUrl, {
//     headers: {
//       Authorization: `Bearer ${authToken}`,
//     },
//     cache: "no-store",
//   });

//   if (!response.ok) {
//     //console.log(upstashRedisRestUrl, authToken, commandUrl);
//     throw new Error(`Error executing Redis command: ${response?.statusText}`);
//   }

//   const data = await response.json();
//   return data?.result;
// }
const upstashRedisRestUrl = process.env.UPSTASH_REDIS_REST_URL;
const authToken = process.env.UPSTASH_REDIS_REST_TOKEN;

type Command = "zrange" | "sismember" | "get" | "smembers";

export async function fetchRedis(
  command: Command,
  ...args: (string | number)[]
) {
  const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join("/")}`;
  //console.log("Command URL", commandUrl);

  try {
    const response = await fetch(commandUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      cache: "no-store",
    });

    if (!response?.ok) {
      throw new Error(`Error executing Redis command: ${response.statusText}`);
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error("Error fetching data from Redis:", error);
    throw error; // Re-throw the error to propagate it further if needed
  }
}
