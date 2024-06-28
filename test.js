const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');

// Create a new Express application
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Initialize a new instance of socket.io by passing the HTTP server object
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Object to keep track of room members and intervals
const rooms = {};

// Function to fetch data from an API
const fetchDataFromApi = async () => {
  try {
    const response = await axios.get('https://api.example.com/data'); // Replace with your API endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching data from API:', error);
    return null;
  }
};

// Function to start interval fetching for a room
const startIntervalFetching = (roomName) => {
  if (!rooms[roomName].interval) {
    rooms[roomName].interval = setInterval(async () => {
      const apiData = await fetchDataFromApi();
      if (apiData) {
        io.in(roomName).emit('apiData', apiData);
      }
    }, 5000); // Fetch data every 5 seconds
  }
};

// Function to stop interval fetching for a room
const stopIntervalFetching = (roomName) => {
  if (rooms[roomName].interval) {
    clearInterval(rooms[roomName].interval);
    delete rooms[roomName].interval;
  }
};

// Listen for new connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for the 'joinRoom' event
  socket.on('joinRoom', async (roomName) => {
    if (!rooms[roomName]) {
      rooms[roomName] = { members: [] };
    }
    rooms[roomName].members.push(socket.id);
    socket.join(roomName);
    console.log(`User joined room: ${roomName}`);

    // Notify all members in the room about the updated member list
    io.in(roomName).emit('updateMembers', rooms[roomName].members);

    // Start interval fetching if the room has members
    if (rooms[roomName].members.length > 0) {
      startIntervalFetching(roomName);
    }
  });

  // Listen for the 'leaveRoom' event
  socket.on('leaveRoom', (roomName) => {
    if (rooms[roomName]) {
      rooms[roomName].members = rooms[roomName].members.filter(id => id !== socket.id);
      socket.leave(roomName);
      console.log(`User left room: ${roomName}`);

      // Notify all members in the room about the updated member list
      io.in(roomName).emit('updateMembers', rooms[roomName].members);

      // Stop interval fetching if no members are left
      if (rooms[roomName].members.length === 0) {
        stopIntervalFetching(roomName);
      }
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected');
    for (const roomName in rooms) {
      if (rooms[roomName].members.includes(socket.id)) {
        rooms[roomName].members = rooms[roomName].members.filter(id => id !== socket.id);
        io.in(roomName).emit('updateMembers', rooms[roomName].members);

        // Stop interval fetching if no members are left
        if (rooms[roomName].members.length === 0) {
          stopIntervalFetching(roomName);
        }
      }
    }
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
