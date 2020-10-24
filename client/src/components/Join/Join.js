import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { UPDATE_USER, UPDATE_ROOM } from "../../defs/actionTypes";
import { COLOR_LIST } from "../../defs/defs";

import "./Join.css";

export default function SignIn() {
    const dispatch = useDispatch();
    const [name, setName] = useState("");
    const [room, setRoom] = useState("");

    const handleClick = (e) => {
        if (!name || !room) {
            e.preventDefault();
            return;
        }
        const user = { name: name, color: pickColor() };
        dispatch({ type: UPDATE_ROOM, payload: { room: room } });
        dispatch({ type: UPDATE_USER, payload: { user: user } });
    };

    const pickColor = () => {
        const colorIndex = Math.floor(Math.random() * 30) + 1;
        return COLOR_LIST[colorIndex];
    };

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div>
                    <input
                        placeholder="Name"
                        className="joinInput"
                        type="text"
                        onChange={(event) => setName(event.target.value)}
                    />
                </div>
                <div>
                    <input
                        placeholder="Room"
                        className="joinInput mt-20"
                        type="text"
                        onChange={(event) => setRoom(event.target.value)}
                    />
                </div>
                <Link onClick={handleClick} to={"/chat"}>
                    <button className={"button mt-20"} type="submit">
                        Sign In
                    </button>
                </Link>
            </div>
        </div>
    );
}
