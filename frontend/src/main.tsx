import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import NavigationProvider from "./context/NavigationProvider.tsx";
import { WebSocketProvider } from "./context/WebsocketProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <NavigationProvider>
      <WebSocketProvider>
        <App />
      </WebSocketProvider>
    </NavigationProvider>
  </React.StrictMode>
);
