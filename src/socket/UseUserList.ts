import { useEffect, useState } from "react";
import { useWebSocket } from "./WebSocketProvider";
import { User, WSResponse } from "./chat";

export function useUserList() {
  const { socket, sendMessage } = useWebSocket();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!socket) {
      return;
    }
    sendMessage({ type: "get_all_users" });
    const onMessage = (event: MessageEvent) => {
      const response: WSResponse = JSON.parse(event.data);
      if (response.type === "all_users") {
        console.log(response);
        setUsers(response.payload);
      }
    };

    socket.addEventListener("message", onMessage);
    return () => {
      socket.removeEventListener("message", onMessage);
    };
  }, [socket]);

  return users;
}
