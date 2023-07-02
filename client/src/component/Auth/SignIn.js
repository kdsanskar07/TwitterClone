import React from "react";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import styles from "./Auth.module.css";
import TextWrapper from "../utills/TextWrapper/TextWrapper";
import FormControls from "../utills/FormControls/FormControls";
import { NavLink, useHistory } from "react-router-dom";
import { sendSignInData } from "../../services";

function SignIn(props) {
  let history = useHistory();

  const signInData = {
    email: "",
    password: "",
  };

  const signInValidation = Yup.object({
    email: Yup.string()
      .email("Enter valid email address")
      .required("Please enter email"),
    password: Yup.string()
      .min(6, "Password must be 6-10 character long")
      .max(10, "Password must be 6-10 character long")
      .required("Please enter password"),
  });

  const signInSubmit = async (data, { resetForm }) => {
    resetForm(signInData);
    try {
      const responseData = await sendSignInData(data);
      console.log(data);
      localStorage.setItem("token", responseData.data.login.token);
      localStorage.setItem("userId", responseData.data.login.userId);
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.Auth}>
      <div className={styles.FormTitle}>
        <TextWrapper textLabel="Sign in to Twitter" isFlexStart={false} />
      </div>
      <Formik
        initialValues={signInData}
        validationSchema={signInValidation}
        onSubmit={signInSubmit}
      >
        {(formik) => {
          return (
            <Form className={styles.AuthForm}>
              <FormControls
                type="email"
                isError={formik.errors.email}
                isTouched={formik.touched.email}
              />
              <FormControls
                type="password"
                isError={formik.errors.password}
                isTouched={formik.touched.password}
              />
              <button type="submit">
                <TextWrapper textLabel="Login" />
              </button>
            </Form>
          );
        }}
      </Formik>
      <div className={styles.BlockLine}></div>
      <div className={styles.ChangeAuthPage}>
        <div>
          <TextWrapper textLabel="Don't have account?" isFlexStart={true} />
        </div>
        <NavLink exact activeClassName={styles.ActiveLink} to="/signup">
          <div className={styles.ChangeAuthPageValue}>
            <TextWrapper textLabel="Sign up" isFlexStart={true} />
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default SignIn;
