import React, { useRef, useEffect, useState } from "react";
import "./login.css";

import avatar from "../../assets/avatar.svg";
import Layout from "../layout/layout";
import { Checkbox, Alert } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useDispatch } from "react-redux";

const Login = () => {
  const focusRef = useRef(null);
  useEffect(() => {
    focusRef.current.focus();
  }, []);
  const dispatch = useDispatch();
  const [err, setErr] = useState("");
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://cv-builder-server.herokuapp.com/auth/login",
        user
      );
      dispatch({ type: "auth/setToken", payload: res.data });
    } catch (error) {
      setErr(error.response.data);
    }
  };
  return (
    <Layout>
      <div className="login-content">
        <form onSubmit={onSubmit}>
          <img src={avatar} alt="avatar" />
          <h2 style={{ marginBottom: 0 }}>Welcome back!</h2>
          {err !== "" ? (
            <Alert
              style={{ marginBottom: "8px" }}
              message={err}
              showIcon
              type="error"
            />
          ) : null}
          <div className="input-div one">
            <div className="i">
              <UserOutlined />
            </div>
            <div className="div">
              <input
                type="email"
                className="input"
                placeholder="Email"
                ref={focusRef}
                name="email"
                value={user.email}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="input-div pass">
            <div className="i">
              <LockOutlined />
            </div>
            <div className="div">
              <input
                type="password"
                className="input"
                placeholder="Password"
                value={user.password}
                onChange={onChange}
                name="password"
              />
            </div>
          </div>
          <div className="form-func">
            <Checkbox>Remember me</Checkbox>
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
          </div>
          <button className="button login">LOGIN</button>
          <p>Don't have an account?</p>
          <Link to="/register">
            <button className="button register">SIGN UP</button>
          </Link>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
