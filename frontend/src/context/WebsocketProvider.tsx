// WebSocketContext.js
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { FolderType, WebSocketContextType } from "../types";

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }: React.PropsWithChildren) => {
  const [recentFiles, setRecentFiles] = useState<FolderType[] | null>(null);
  const ws = useRef<WebSocket | null>(null);

  console.log(recentFiles);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:4000");

    ws.current.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Handle WebSocket messages within this effect
    const handleWebSocketMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      console.log(message);
      if (message.type === "newFile") {
        console.log(message.file);
        setRecentFiles((prevFiles) => [...message.files, ...(prevFiles || [])]);
      }
    };

    if (ws.current) {
      ws.current.onmessage = handleWebSocketMessage;
    }

    // Cleanup function to remove event listener on unmount
    return () => {
      if (ws.current) {
        ws.current.onmessage = null;
      }
    };
  }, [ws.current]); // Add ws.current as a dependency

  const sendFile = (fileData: FolderType) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(fileData));
    }
  };

  return (
    <WebSocketContext.Provider value={{ recentFiles, sendFile }}>
      {children}
    </WebSocketContext.Provider>
  );
};
