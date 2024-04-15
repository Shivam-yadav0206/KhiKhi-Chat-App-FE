//import { z } from "zod";
import { fetchRedis } from "@/helpers/redis";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { nanoid } from "nanoid";
import { messageValidator } from "@/lib/validations/message";
import { pusherServer } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const { text, chatId } = await req.json();
    //console.log("text", text);
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("Unauthorized", { status: 401 });
    }

    const [userId1, userId2] = chatId.split("--");

    if (session.user.id !== userId1 && session.user.id !== userId2) {
      return new Response("Unauthorized", { status: 401 });
    }
    const receiverId = userId1 === session?.user?.id ? userId2 : userId1;

    const areFriends = await fetchRedis(
      "sismember",
      `user:${session?.user?.id}:friends`,
      receiverId
    );

    //console.log(areFriends);

    if (!areFriends) {
      return new Response("You can only send messages to your friends", {
        status: 400,
      });
    }

    const rawSender = (await fetchRedis(
      "get",
      `user:${session.user.id}`
    )) as string;
    const sender = JSON.parse(rawSender) as User;

    const timestamp = Date.now();
    const messageData: Message = {
      id: nanoid(),
      senderId: session?.user?.id,
      text,
      timestamp,
      receiverId,
    };

    const message = messageValidator.parse(messageData);

    //.log(message);

    await db.zadd(`chat:${chatId}:messages`, {
      score: timestamp,
      member: JSON.stringify(message),
    });

    pusherServer.trigger(
      toPusherKey(`chat:${chatId}:messages`),
      "messages",
      message
    );

    pusherServer.trigger(
      toPusherKey(`user:${receiverId}:chats`),
      "new_message",
      { ...message, senderImg: sender.image, senderName: sender.name }
    );

    return new Response("Message Sent!!!"); // Success response
  } catch (error) {
    //console.error("Error Yhhase--------------------------",error);
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }
    return new Response("Internal Server Error", { status: 500 });
  }
}
