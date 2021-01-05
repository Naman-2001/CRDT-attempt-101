import io from "socket.io-client";
const socket = io("http://localhost:8000");

console.log(socket);
export function subscribeToTimer(callback) {
  // socket.on("timer", (timestamp) => callback(null, timestamp));
  socket.emit("subscribeToTimer", 1000);
}
