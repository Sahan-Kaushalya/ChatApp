import { useEffect } from "react";
import { useWebSocket } from "./WebSocketProvider";
import { WSResponse } from "./chat";

export function useWebSocketPing(interval: number) {
    const { socket, isConnected, sendMessage } = useWebSocket();
    useEffect(() => {
        if (!socket || !isConnected) {
            return;
        }

        const pingTimer = setInterval(() => {
            sendMessage({ type: "PING" });
        }, interval);

        const onMessage = (event: MessageEvent) => {
            const response: WSResponse = JSON.parse(event.data);
            if (response.type === "PONG") {
                console.log("PONG received from server at ", new Date().toLocaleTimeString());
            }
        };
        socket.addEventListener("message", onMessage);


        return () => {
            clearInterval(pingTimer);
            socket.removeEventListener("message", onMessage);
        };

    }, [socket, interval, isConnected, sendMessage]);
}