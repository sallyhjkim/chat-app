const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const router = require("./router");
const pool = require("./db");

const app = express();
const server = http.createServer(app);
const io = socketio(server);
// app.use(cors());
app.use(router);
app.use(express.json());
app.use(cors());

app.post("/signIn", async (req, res) => {
    try {
        const { username, password } = req.body;
        const newUser = await pool.query(
            "INSERT INTO users(user_name, password) VALUES($1, $2)",
            [username, password]
        );
        res.json({ msgCode: "SUCCESS" });
    } catch (err) {
        console.error(err.message);
    }
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const loginedUser = await pool.query(
            "SELECT * FROM users WHERE user_name=$1 and password=$2",
            [username, password]
        );
        const status = loginedUser.rowCount ? "SUCCESS" : "FAILED";
        res.json({ msgCode: status });
    } catch (err) {
        console.error(err.message);
    }
});

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
