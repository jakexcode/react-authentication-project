import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";

const initialValues = {
  name: "",
  email: "",
  password: "",
};

const emailAddresses = [
  //fetch from backend for a list of email addresses already in use
];

const loginSchema = yup.object().shape({
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
});

export default function Logout() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Failed to Log In");
    }
    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4"> Log In </h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Formik initialValues={initialValues} validationSchema={loginSchema}>
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

                <Button disabled={loading} className="w-100 mt-4" type="submit">
                  Log In
                </Button>
              </Form>
            )}
          </Formik>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
