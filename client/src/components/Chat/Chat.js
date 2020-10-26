import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import io from "socket.io-client";

import ChatBox from "../ChatBox/ChatBox";
import InfoBar from "../InfoBar/InfoBar";
import Input from "../Input/Input";
import { ENDPOINT } from "../../defs/defs";
import "./Chat.css";

let socket;

const Chat = () => {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const { user, room } = useSelector((state) => ({
        room: state.room.get("room"),
        user: state.user.get("user"),
    }));

    useEffect(() => {
        socket = io(ENDPOINT);
        if (user.name) {
            socket.emit("join", { user: user, room }, (error) => {
                if (error) {
                    alert(error);
                }
            });
        } else {
            window.location.assign(window.location.origin);
        }
    }, []);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages((messages) => [...messages, message]);
        });
    }, []);

    const sendMessage = (event) => {
        event.preventDefault();
        if (message) {
            socket.emit("sendMessage", message, () => setMessage(""));
        }
    };

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} />
                <ChatBox messages={messages} user={user} />
                <Input
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    );
};

export default Chat;
