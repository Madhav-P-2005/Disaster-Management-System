import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const onSubmit = (data) => {
        axios.post("http://localhost:8000/api/token/", data)
            .then((res) => {
                localStorage.setItem("access_token", res.data.access);
                localStorage.setItem("refresh_token", res.data.refresh);
                setError("");
                navigate("/profile");
                // TODO: Redirect to dashboard or protected page
            })
            .catch((err) => {
                setError("Invalid email or password");
            });
    };

    return (
        <div>
            <h1>Login Form</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register("email", { required: "Email Address is required", maxLength: 50, minLength: 3 })}
                    type="email"
                    placeholder="Email Address"
                    aria-invalid={errors.email ? "true" : "false"}
                />
                {errors.email && <span>{errors.email.message}</span>}
                <input
                    {...register("password", { required: "Password is required" })}
                    type="password"
                    placeholder="Password"
                />
                {errors.password && <span>{errors.password.message}</span>}
                <input type="submit" />
                {error && <p style={{ color: "red" }}>{error}</p>}
            </form>
        </div>
    );
};

export default Login;