"use client";

import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import React, { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

interface SocketContextParams {
  stompClient: Client | undefined;
  connected: boolean;
}

const SocketContext = createContext({} as SocketContextParams);

export const SocketProvider = ({
  children,
  interviewId,
}: {
  children: React.ReactNode;
  interviewId: string;
}) => {
  const [stompClient, setStompClient] = useState<Client>();
  const [connected, setConnected] = useState<boolean>(false);
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const connect = () => {
      const sockJS = new SockJS(
        `${process.env.NEXT_PUBLIC_BACKEND_URL_FOR_BROWSER}/api/v1/socketEndpoint`
      );
      const client = new Client({
        brokerURL: `${process.env.NEXT_PUBLIC_BACKEND_URL_FOR_BROWSER}/api/v1/socketEndpoint`,
        webSocketFactory: () => sockJS,
        reconnectDelay: 5000, // Optional: Adjust the reconnect delay as needed
      });
      setStompClient(client);
      return client;
    };

    const client = connect();

    return () => {
      if (client) client.deactivate();
    };
  }, []);

  useEffect(() => {
    const roomClosed = () => {
      router.push("/interviews/room/left?closed=true");
    };

    if (stompClient) {
      stompClient.onConnect = async () => {
        stompClient.subscribe(
          `/interview/room/close/${interviewId}`,
          roomClosed
        );

        await stompClient.publish({
          destination: `/api/v1/sockets/interview/room/join/${interviewId}`,
          body: session.userId,
          skipContentLengthHeader: true,
        });

        setConnected(true);
      };

      stompClient.onStompError = (error: any) => {
        console.error(error);
      };

      stompClient.activate();
    }
  }, [stompClient]);

  return (
    <SocketContext.Provider value={{ stompClient, connected }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketContext;
