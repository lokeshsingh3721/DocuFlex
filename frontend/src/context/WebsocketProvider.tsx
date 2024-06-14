// WebSocketContext.js
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { FolderType, WebSocketContextType } from "../types";

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }: React.PropsWithChildren) => {
  const [recentFiles, setRecentFiles] = useState<FolderType[] | null>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:4000");

    ws.current.onopen = () => {
      const token = localStorage.getItem("token");
      ws.current?.send(JSON.stringify({ type: "initial", token }));
      console.log("Connected to WebSocket");
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Handle WebSocket messages within this effect
    const handleWebSocketMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      if (message.type === "newFile") {
        setRecentFiles(message.files);
      }
      if (message.type === "initial") {
        console.log(message.files);
        setRecentFiles(message.files);
      }
    };

    if (ws.current) {
      ws.current.onmessage = handleWebSocketMessage;
    }
  }, []);

  const sendFile = (fileData: FolderType) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const token = localStorage.getItem("token");
      fileData.token = token as string;
      ws.current.send(JSON.stringify(fileData));
    }
  };

  return (
    <WebSocketContext.Provider value={{ recentFiles, sendFile }}>
      {children}
    </WebSocketContext.Provider>
  );
};
