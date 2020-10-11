import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import InfoMessage from "./InfoMessage/InfoMessage";
import Message from "./Message/Message";

import "./Messages.css";

const Messages = ({ messages, name }) => (
    <ScrollToBottom className="messages">
        {messages.map((message, i) => (
            <div key={i}>
                {message.user === "admin" ? (
                    <InfoMessage message={message} />
                ) : (
                    <Message message={message} name={name} />
                )}
            </div>
        ))}
    </ScrollToBottom>
);

export default Messages;
