"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: parseInt(process.env.PORT) || 8080 });
const userIDToSocket = new Map();
wss.on("connection", (socket) => {
    socket.on("message", (data) => {
        try {
            const message = JSON.parse(data.toString());
            if (message.type === "register") {
                userIDToSocket.set(message.userID, socket);
                console.log(`User registered: ${message.userID}`);
            }
            else if (message.type === "call") {
                console.log("first");
                const targetSocket = userIDToSocket.get(message.targetUserID);
                if (targetSocket) {
                    targetSocket.send(JSON.stringify({
                        type: "incoming_call",
                        fromUserID: message.userID,
                        offer: message.offer
                    }));
                }
            }
            else if (message.type === "answer") {
                console.log("secfirst");
                const targetSocket = userIDToSocket.get(message.targetUserID);
                if (targetSocket) {
                    targetSocket.send(JSON.stringify({
                        type: "call_answered",
                        fromUserID: message.userID,
                        answer: message.answer
                    }));
                }
            }
            else if (message.type === "ice_candidate") {
                const targetSocket = userIDToSocket.get(message.targetUserID);
                console.log(message.targetUserID);
                if (targetSocket) {
                    targetSocket.send(JSON.stringify({
                        type: "ice_candidate",
                        fromUserID: message.targetUserID,
                        candidate: message.candidate
                    }));
                }
            }
        }
        catch (error) {
            console.error("Failed to parse message:", error);
        }
    });
    socket.on("close", () => {
        for (const [userID, s] of userIDToSocket.entries()) {
            if (s === socket) {
                userIDToSocket.delete(userID);
                console.log(`User disconnected: ${userID}`);
                break;
            }
        }
    });
});
console.log("Running on port 8080");
