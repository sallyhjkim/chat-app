import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import { ENDPOINT } from "../../defs/defs";
import "./Login.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleLogin = () => {
        if (username && password) {
            fetch(`http://${ENDPOINT}/login`, {
                method: "POST",
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
                mode: "cors",
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    let msgCode = data.msgCode;
                    if (msgCode === "FAILED") {
                        setUsername("");
                        setPassword("");
                        alert(
                            "Login failed. Please check your username and password."
                        );
                    } else if (msgCode === "SUCCESS") {
                        window.location.assign(
                            `${window.location.origin}/join`
                        );
                    }
                });
        }
    };

    const handleSignIn = () => {
        console.log("todo!");
    };

    return (
        <div className="loginOuterContainer">
            <div className="loginInnerContainer">
                <h1 className="heading">Login</h1>
                <div>
                    <input
                        value={username}
                        placeholder="USER NAME"
                        className="loginInput"
                        type="text"
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div>
                    <input
                        value={password}
                        placeholder="PASSWORD"
                        className="loginInput mt-20"
                        type="password"
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button
                    onClick={handleLogin}
                    className={"button mt-20"}
                    type="submit"
                >
                    LogIn
                </button>
                <Link onClick={handleSignIn} to={"/signIn"}>
                    <button className={"button mt-20"} type="button">
                        Sign In
                    </button>
                </Link>
            </div>
        </div>
    );
};
export default Login;
