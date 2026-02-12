import { WebSocketServer, WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });
//connection event
//0:connecting
//1:open (the only state where you can safely .send())
//2: closing
//3: closed
wss.on("connection", (socket, request) => {
  const ip = request.socket.remoteAddress;
  socket.on("message", (rawData) => {
    const message = rawData.toString();
    console.log({ rawData });
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Server Broadcast: ${message}`);
      }
    });
  });
  socket.on("error", (err) => {
    console.error(`Error : ${err.message}: ${ip}`);
  });
  socket.on("close", () => {
    console.log("Client disconnected");
  });
}); //npm i --save-dev @types/node @types/ws
console.log("WebSocket Server is live on ws://localhost:8080");
