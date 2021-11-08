import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../../Contexts/AuthContext";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";

const initialValues = {
  name: "",
  email: "",
  pasword: "",
};

const signinSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().min(6).required(),
});

export default function BasicForm() {
  return (
    <Card>
      <Card.Body>
        <Formik initialValues={initialValues}>
          {/* Callback function containing Formik state and helpers that handle common form actions */}
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <Form className="mx-auto">
              {console.log(values)}
              <Form.Group controlId="formName">
                <Form.Label>Name :</Form.Label>
                <Form.Control
                  type="text"
                  /* This name property is used to access the value of the form element via values.nameOfElement */
                  name="name"
                  placeholder="Full Name"
                  /* Set onChange to handleChange */
                  onChange={handleChange}
                  /* Set onBlur to handleBlur */
                  onBlur={handleBlur}
                  /* Store the value of this input in values.name, make sure this is named the same as the name property on the form element */
                  value={values.name}
                />
              </Form.Group>
              <Form.Group controlId="formEmail">
                <Form.Label>Email :</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
              </Form.Group>
              <Form.Group controlId="formPhone">
                <Form.Label>Phone :</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  placeholder="Phone"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phone}
                />
              </Form.Group>
              <Form.Group controlId="formPassword">
                <Form.Label>Blog :</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Passswword"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Card.Body>
    </Card>
  );
}
