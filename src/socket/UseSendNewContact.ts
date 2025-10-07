import { useEffect, useState } from "react";
import { User, WSResponse } from "./chat";
import { useWebSocket } from "./WebSocketProvider";
import { ALERT_TYPE, Toast } from "react-native-alert-notification";

export function useSendNewContact() {

    const { socket, sendMessage } = useWebSocket();
    const [responseText, setResponseText] = useState<string>();

    const sendNewContact = (user: User) => {
        sendMessage({
            type: "save_new_contact",
            user
        });
    };

    useEffect(() => {
        if (!socket) {
            return;
        }
   

        const onMessage = (event: MessageEvent) => {
            const response: WSResponse = JSON.parse(event.data);
            if (response.type === "new_contact_response_text") {
                setResponseText(response.payload);

                if(response.payload.responseStatus){
                    Toast.show({
                        type:ALERT_TYPE.SUCCESS,
                        title:"Success",
                        textBody:response.payload.message,
                        autoClose: true
                    });
                }else{
                    Toast.show({
                        type:ALERT_TYPE.WARNING,
                        title:"WARNING",
                        textBody:response.payload.message,
                        autoClose: true
                    });
                }
                   
                
            }
        };

        socket.addEventListener("message", onMessage);

        return () => {
            socket.removeEventListener("message", onMessage);
        };
    }, [socket]);

    return {sendNewContact: sendNewContact, responseText: responseText};

}