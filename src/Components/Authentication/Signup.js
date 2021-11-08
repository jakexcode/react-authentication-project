import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";

const initialValues = {
  email: "",
  password: "",
  passwordConfirm: "",
};

const emailAddresses = [
  //fetch from backend for a list of email addresses already in use
];

const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .notOneOf(emailAddresses, "Email is already taken")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be more than 6 characters")
    .required("Password is required")
    .matches(/(?=.*?[A-Z])/, "Must contain a capital letter")
    .matches(
      /(?=.*?[#?!@$ %^&*-])/,
      "Must include at least 1 special character"
    )
    .matches(/(?=.*?[0-9])/, "Must include at least 1 digit"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must be the same")
    .required("Required"),
});

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
    } catch (error) {
      console.log(error);
      setError("Failed to create an account");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4"> Sign Up </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Formik initialValues={initialValues} validationSchema={signupSchema}>
            {/* Callback function containing Formik state and helpers that handle common form actions */}
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email </Form.Label>
                  <Form.Control
                    autoComplete="off"
                    ref={emailRef}
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    className={touched.email && errors.email ? "error" : null}
                  />
                  {touched.email && errors.email ? (
                    <div className="text-danger">{errors.email}</div>
                  ) : null}
                </Form.Group>
                <Form.Group id="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    ref={passwordRef}
                    placeholder="Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    className={
                      touched.password && errors.password ? "error" : null
                    }
                  />
                  {touched.password && errors.password ? (
                    <div className="text-danger">{errors.password}</div>
                  ) : null}
                </Form.Group>
                <Form.Group id="password_confirm">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="passwordConfirm"
                    ref={passwordConfirmRef}
                    placeholder="Confirm Password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.passwordConfirm}
                    className={
                      touched.passwordConfirm && errors.passwordConfirm
                        ? "error"
                        : null
                    }
                  />
                  {touched.passwordConfirm && errors.passwordConfirm ? (
                    <div className="text-danger">{errors.passwordConfirm}</div>
                  ) : null}
                </Form.Group>
                <Button disabled={loading} className="w-100 mt-4" type="submit">
                  Sign Up
                </Button>
              </Form>
            )}
          </Formik>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login"> Log In </Link>
      </div>
    </>
  );
}
