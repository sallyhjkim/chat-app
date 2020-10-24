const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const router = require("./router");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// app.use(cors());
app.use(router);

io.on("connect", (socket) => {
    socket.on("join", ({ user, room }, callback) => {
        const { error, userInfo } = addUser({ id: socket.id, user, room });

        if (error) return callback(error);

        socket.join(userInfo.room);

        socket.emit("message", {
            name: "admin",
            text: `${userInfo.user.name}, welcome to room ${userInfo.room}.`,
        });
        socket.broadcast.to(user.room).emit("message", {
            name: "admin",
            text: `${userInfo.user.name} joined the meeting.`,
        });

        io.to(userInfo.room).emit("roomData", {
            room: userInfo.room,
            users: getUsersInRoom(userInfo.room),
        });

        callback();
    });

    socket.on("sendMessage", (message, callback) => {
        const userInfo = getUser(socket.id);
        io.to(userInfo.room).emit("message", {
            name: userInfo.user.name,
            text: message,
            icon: userInfo.user.color,
        });

        callback();
    });

    socket.on("disconnect", () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit("message", {
                name: "admin",
                text: `${user.name} has left the meeting.`,
            });
            io.to(user.room).emit("roomData", {
                room: user.room,
                users: getUsersInRoom(user.room),
            });
        }
    });
});

server.listen(process.env.PORT || 5000, () =>
    console.log(`Server has started.`)
);
