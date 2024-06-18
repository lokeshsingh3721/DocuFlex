// WebSocketContext.js
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { RecentFileType, WebSocketContextType } from "../../types";

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }: React.PropsWithChildren) => {
  const [recentFiles, setRecentFiles] = useState<RecentFileType[] | null>(null);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:4000");

    ws.current.onopen = () => {
      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        const token = localStorage.getItem("token");
        if (token) {
          ws.current.send(JSON.stringify({ type: "initial", token }));
        }
      }
      console.log("connected");
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    // Handle WebSocket messages within this effect
    const handleWebSocketMessage = (event: MessageEvent) => {
      const message = JSON.parse(event.data);
      if (message.type === "newFile") {
        setRecentFiles(message.files);
      } else if (message.type === "initial") {
        console.log(message.files);
        setRecentFiles(message.files);
      } else if (message.type === "delete") {
        console.log("deleting the files ", message.files);
        console.log(message.files);
        setRecentFiles(message.files);
      }
    };

    if (ws.current) {
      ws.current.onmessage = handleWebSocketMessage;
    }
  }, []);

  const sendFile = (fileId: string, name: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const token = localStorage.getItem("token");
      const type = "addFile";
      ws.current.send(JSON.stringify({ type, fileId, name, token }));
    }
  };

  const deleteFile = (fileId: string) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const token = localStorage.getItem("token");
      const type = "delete";
      ws.current.send(JSON.stringify({ type, fileId, token }));
    }
  };

  return (
    <WebSocketContext.Provider value={{ recentFiles, sendFile, deleteFile }}>
      {children}
    </WebSocketContext.Provider>
  );
};
