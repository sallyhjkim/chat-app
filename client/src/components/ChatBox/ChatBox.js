import React from "react";

import Messages from "../Messages/Messages";

const ChatBox = ({ messages, name }) => (
    <Messages messages={messages} name={name} />
);

export default ChatBox;
