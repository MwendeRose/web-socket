const WebSocket = require('ws');

// Create a WebSocket server on port 8080
const wss = new WebSocket.Server({ port: 8080 });

console.log('WebSocket server is running on ws://localhost:8080');

// Handle client connections
wss.on('connection', (ws) => {
  console.log('New client connected');

  // Send a welcome message to the client
  ws.send('Welcome! You are now connected to the WebSocket server.');

  // Listen for messages from the client
  ws.on('message', (message) => {
    console.log(`Received from client: ${message}`);

    // Broadcast the message to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`Client says: ${message}`);
      }
    });
  });

  // Handle client disconnections
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
