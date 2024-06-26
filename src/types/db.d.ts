interface User {
    name: string,
    email: string,
    image: string,
    id: string,
}

interface Message {
    id: string,
    senderId: string,
    receiverId?: string,
    text: string,
    timestamp: number
}

interface FriendRequest{
    id: string,
    senderId: string,
    receiverId: string,
}

interface Chat{
    id: string,
    messages: Message[],
}