import { Server } from "socket.io";

let io;
const eventQueue = []; // Queue to store events when there are no clients
let clientsConnected = false; // Flag to check if clients are connected

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // Replace with your React frontend URL if needed
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    clientsConnected = true;

    // Emit any queued events once a client connects
    while (eventQueue.length > 0) {
      const { eventName, data } = eventQueue.shift(); // Remove the first event from the queue
      io.emit(eventName, data);
    }

    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
      if (io.sockets.sockets.size === 0) {
        // Check if there are no connected clients
        clientsConnected = false;
      }
    });
  });

  return io;
};

// Function to get the Socket.IO instance
export const getSocketInstance = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

// Function to emit events
export const emitEvent = (eventName, data) => {
  const io = getSocketInstance();
  if (clientsConnected) {
    io.emit(eventName, data);
  } else {
    // Queue the event if no clients are connected
    eventQueue.push({ eventName, data });
  }
};
