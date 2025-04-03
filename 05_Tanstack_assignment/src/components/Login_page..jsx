import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Get_user } from "../api/auth_user";
import { useNavigate } from "react-router-dom";

const Login_page = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    
    localStorage.removeItem("accessToken");

    const mutation = useMutation({
        mutationFn: Get_user,
        onSuccess: (data) => {
            const tk = localStorage.getItem("accessToken");
            queryClient.invalidateQueries(["user"]);
            if (tk) {
                console.log("Login Successful");
                navigate("/dashboard");
            } else {
                alert("Please Enter Valid Credentials");
            }
        },
        onError: () => {},
    });

    const handleLogin = (e) => {
        // e.preventDefault(); // Remove this line if you want the form to submit normally
        mutation.mutate({ username, password });
    };

    return (
        <div>
            <div>Login page</div>

                <div>
                    <label>Username : </label>
                    <input
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <br />
                <div>
                    <label>Password : </label>
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <br />
                <button type="submit" onClick={handleLogin}>Submit</button>
        </div>
    );
};

export default Login_page;