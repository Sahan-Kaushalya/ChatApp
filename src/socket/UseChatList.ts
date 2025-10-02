import { useEffect, useState } from "react";
import { Chat, WSResponse } from "./chat";
import { useWebSocket } from "./WebSocketProvider";

export function useChatList(): Chat[] {

    const { socket, sendMessage } = useWebSocket();
    const [chatList, setChatList] = useState<Chat[]>([]);

    useEffect(() => {
        if (!socket) {
            return;
        }
        sendMessage({ type: "get_chat_list" });
        const onMessage = (event: MessageEvent) => {
            //console.log(event.data );
             const response: WSResponse = JSON.parse(event.data);
            if (response.type === "friend_list") {
                setChatList(response.payload);
                console.log(response.payload);
            }
        };

        socket.addEventListener("message", onMessage);

        return () => {
            socket.removeEventListener("message", onMessage);
        };
    }, [socket]);

    return chatList;
}