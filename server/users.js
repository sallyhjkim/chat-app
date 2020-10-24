const users = [];

const addUser = ({ id, user, room }) => {
    name = user.name.trim().toLowerCase();
    room = room.trim().toLowerCase();

    const existingUser = users.find(
        (activeUser) => activeUser.room === room && activeUser.name === name
    );

    if (existingUser) {
        return { error: "Username is taken!" };
    }

    const userInfo = { id, user, room };
    users.push(userInfo);

    return { userInfo };
};

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const getUser = (id) => {
    return users.find((user) => user.id === id);
};

const getUsersInRoom = (room) => {
    users.filter((user) => user.room === room);
};

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
