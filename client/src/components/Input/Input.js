import React from "react";

import "./Input.css";
import sendIcon from "../../icons/send.png";

const Input = ({ setMessage, sendMessage, message }) => (
    <form className="form">
        <input
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={({ target: { value } }) => setMessage(value)}
            onKeyPress={(event) =>
                event.key === "Enter" ? sendMessage(event) : null
            }
        />
        {/* <button className="sendButton" onClick={e => sendMessage(e)}>Send</button> */}
        <label className="sendButton" for="sendbtn">
            <input type="button" id="sendbtn" onClick={(e) => sendMessage(e)} />
            <span className="sendButtonSpan">
                <img
                    className="sendButtonImg"
                    alt="Online Icon"
                    src={sendIcon}
                />
            </span>
        </label>
    </form>
);

export default Input;
