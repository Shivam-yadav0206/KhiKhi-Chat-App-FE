import { z } from "zod";
import { fetchRedis } from "@/helpers/redis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id: idToRemove } = z.object({ id: z.string() }).parse(body);

    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const hasFriendRequest = await fetchRedis(
      "sismember",
      `user:${session.user.id}:incoming_friend_requests`,
      idToRemove
    );

    if (!hasFriendRequest) {
      return new Response("No friend request", { status: 400 });
    }

    await db.srem(
      `user:${session.user.id}:incoming_friend_requests`,
      idToRemove
    );

    return new Response("OK"); // Success response
  } catch (error) {
    //console.error(error)
    if (error instanceof z.ZodError) {
      return new Response("Invalid request payload", { status: 422 });
    }
    return new Response("Invalid request", { status: 400 });
  }
}
