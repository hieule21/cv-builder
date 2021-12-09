import React, { useRef, useEffect, useState } from "react";
import "./register.css";

import Layout from "../layout/layout";
import { Alert, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import axios from "axios";
import { Link } from "react-router-dom";

const Register = () => {
  const focusRef = useRef(null);
  useEffect(() => {
    focusRef.current.focus();
  }, []);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState(false);
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
      await axios.post(
        "https://cv-builder-server.herokuapp.com/auth/register",
        user
      );
      setErr("");
      setSuccess(true);
      setUser({
        name: "",
        email: "",
        password: "",
      });
    } catch (error) {
      setSuccess(false);
      setErr(error.response.data);
    }
  };
  return (
    <Layout>
      <div className="login-content">
        <form onSubmit={onSubmit}>
          <h2 className="title">Create Account</h2>
          {err !== "" ? (
            <Alert
              style={{ marginBottom: "12px" }}
              type="error"
              showIcon
              message={err}
            />
          ) : null}
          {success ? (
            <Alert
              message="Register successfully!"
              showIcon
              type="success"
              style={{ marginBottom: "12px" }}
            />
          ) : null}
          <div className="input-div one">
            <div className="i">
              <UserOutlined />
            </div>
            <div className="div">
              <input
                type="text"
                className="input"
                placeholder="Name"
                ref={focusRef}
                required
                name="name"
                value={user.name}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="input-div one">
            <div className="i">
              <MailOutlined />
            </div>
            <div className="div">
              <input
                type="email"
                className="input"
                placeholder="Email"
                required
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
                required
                placeholder="Password"
                name="password"
                value={user.password}
                onChange={onChange}
              />
            </div>
          </div>
          <div className="footer">
            <Checkbox>
              By clicking on Sign up, you agree to CV Builder's{" "}
              <a href="#">Terms and Conditions of Use</a>.
            </Checkbox>
            <p>
              To learn more about how CV Builder collects, uses, shares and
              protects your personal data please read CV Builder's{" "}
              <a href="#">Privacy Policy</a>.
            </p>
          </div>
          <button className="btn login">SIGN UP</button>
          <p>
            Already have an account? <Link to="/login">Log in</Link>.
          </p>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
