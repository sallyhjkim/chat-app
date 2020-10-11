import React from "react";

import "./InfoMessage.css";

import ReactEmoji from "react-emoji";

const InfoMessage = ({ message: { text } }) => {
    return (
        <div className="messageContainer justifyCenter">
            <p className="infoMessageText">{ReactEmoji.emojify(text)}</p>
        </div>
    );
};

export default InfoMessage;
