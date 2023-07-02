import React, { useState } from "react";
import PropTypes from "prop-types";
import { Field, ErrorMessage } from "formik";
import {
  MdEmail,
  MdSecurity,
  MdVisibility,
  MdVisibilityOff,
} from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import styles from "./FormControls.module.css";

FormControls.propTypes = {
  type: PropTypes.string,
  isError: PropTypes.string,
  isTouched: PropTypes.bool,
};

function FormControls(props) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(true);

  const emailControl = () => {
    return (
      <React.Fragment>
        <label htmlFor="email">Email</label>
        <div
          className={styles.InputArea}
          style={
            props.isError && props.isTouched
              ? { border: "0.5px solid red", marginBottom: ".5vh" }
              : null
          }
        >
          <div>
            <MdEmail />
          </div>
          <Field
            className={styles.InputEmail}
            type="email"
            id="email"
            name="email"
            placeholder="Email"
          />
        </div>
        <ErrorMessage
          name="email"
          component="div"
          className={styles.AuthError}
        />
      </React.Fragment>
    );
  };

  const descriptionControl = () => {
    return (
      <React.Fragment>
        <Field
          as="textarea"
          className={styles.InputDescription}
          type={"text"}
          id="description"
          name="description"
          placeholder="What's Happening?"
        />
      </React.Fragment>
    );
  };

  const passwordControl = () => {
    return (
      <React.Fragment>
        <label htmlFor="password">Password</label>
        <div
          className={styles.InputArea}
          style={
            props.isError && props.isTouched
              ? { border: "0.5px solid red", marginBottom: ".5vh" }
              : null
          }
        >
          <div>
            <MdSecurity />
          </div>
          <Field
            className={styles.InputPassword}
            type={isPasswordVisible ? "password" : "text"}
            id="password"
            name="password"
            placeholder="Password"
          />
          {isPasswordVisible ? (
            <MdVisibilityOff
              className={styles.PasswordVisibility}
              onClick={() => setIsPasswordVisible(false)}
            />
          ) : (
            <MdVisibility
              className={styles.PasswordVisibility}
              onClick={() => setIsPasswordVisible(true)}
            />
          )}
        </div>
        <ErrorMessage
          name="password"
          component="div"
          className={styles.AuthError}
        />
      </React.Fragment>
    );
  };

  const nameControl = () => {
    return (
      <React.Fragment>
        <label htmlFor="name">Full Name</label>
        <div
          className={styles.InputArea}
          style={
            props.isError && props.isTouched
              ? { border: "0.5px solid red", marginBottom: ".5vh" }
              : null
          }
        >
          <div>
            <FaUserTie />
          </div>
          <Field
            className={styles.InputName}
            type="text"
            id="name"
            name="name"
            placeholder="Full Name"
          />
        </div>
        <ErrorMessage
          name="name"
          component="div"
          className={styles.AuthError}
        />
      </React.Fragment>
    );
  };

  const userIdControl = () => {
    return (
      <React.Fragment>
        <label htmlFor="userId">User Name</label>
        <div
          className={styles.InputArea}
          style={
            props.isError && props.isTouched
              ? { border: "0.5px solid red", marginBottom: ".5vh" }
              : null
          }
        >
          <div>
            <FaUserTie />
          </div>
          <Field
            className={styles.InputName}
            type="text"
            id="userId"
            name="userId"
            placeholder="User Name"
          />
        </div>
        <ErrorMessage
          name="userId"
          component="div"
          className={styles.AuthError}
        />
      </React.Fragment>
    );
  };

  const controls = () => {
    switch (props.type) {
      case "email":
        return emailControl();
      case "password":
        return passwordControl();
      case "name":
        return nameControl();
      case "tweetDescription":
        return descriptionControl();
      case "userId":
        return userIdControl();
      default:
        return null;
    }
  };

  return controls();
}

export default FormControls;
