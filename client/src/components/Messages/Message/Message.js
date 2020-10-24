import React from "react";
import ReactEmoji from "react-emoji";

import "./Message.css";

const Message = ({ message: { text, name, icon }, user }) => {
    let isSentByCurrentUser = false;
    const trimmedName = name.trim().toLowerCase();

    if (user.name === trimmedName) {
        isSentByCurrentUser = true;
    }

    const populateUserIcon = () => {
        return name.toUpperCase().slice(0, 2);
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
                        border: `1px solid ${icon}`,
                        background: `${icon}`,
                    }}
                >
                    {populateUserIcon()}
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
