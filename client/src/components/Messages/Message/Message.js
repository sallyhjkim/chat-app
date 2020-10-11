import React from "react";
import { useSelector } from "react-redux";

import "./Message.css";

import ReactEmoji from "react-emoji";

const Message = ({ message: { text, user }, name }) => {
    let isSentByCurrentUser = false;

    const { color } = useSelector((state) => ({
        color: state.user.get("userColor"),
    }));

    const trimmedName = name.trim().toLowerCase();

    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }
    const populateUserIcon = (username) => {
        return username.toUpperCase().slice(0, 2);
    };

    return isSentByCurrentUser ? (
        <div className="messageContainer justifyEnd">
            <div className="userThumb"></div>
            <div className="messageBox backgroundBlue">
                <p className="messageText colorWhite">
                    {ReactEmoji.emojify(text)}
                </p>
            </div>
        </div>
    ) : (
        <div className="messageContainer justifyStart">
            <div className="userThumb">
                <span
                    style={{
                        border: `1px solid ${color}`,
                        background: `${color}`,
                    }}
                >
                    {populateUserIcon(user)}
                </span>
            </div>
            <div className="messageBox backgroundLight">
                <p className="messageText colorDark">
                    {ReactEmoji.emojify(text)}
                </p>
            </div>
        </div>
    );
};

export default Message;
