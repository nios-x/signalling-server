"use strict";
// import WebSocket,{WebSocketServer} from "ws";
// import { v4 as uuidv4 } from "uuid";
// const wss = new WebSocketServer({ port: 8080 });
// interface Socket extends WebSocket {
//     id? : string
//     userid? : string
// }
// const connected:WebSocket[] = [] 
// wss.on("connection", (socket: WebSocket) => {
//     const s = socket as Socket
//     s.id = uuidv4()
//     connected.push(socket)
//     console.log(`Client connected: ${s.id}`);
//     socket.on("message", (message) => {
//         console.log(`Received message from ${s.id}: ${message}`);      
//     })
//     console.log(connected)
// })
// wss.on("close", (socket: WebSocket) => {
//     const s = socket as Socket
//     console.log(`Client disconnected: ${s.id}`);
// })
