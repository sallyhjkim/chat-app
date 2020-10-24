import React from "react";

import Messages from "../Messages/Messages";

const ChatBox = ({ messages, user }) => (
    <Messages messages={messages} user={user} />
);

export default ChatBox;
