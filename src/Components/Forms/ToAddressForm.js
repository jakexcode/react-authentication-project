import React from "react";
import {
  Button,
  Form,
  Modal,
  Tab,
  Tabs,
  Row,
  Col,
  Stack,
} from "react-bootstrap";
import { Formik} from "formik";
import * as Yup from "yup";

const toAddressSchema = Yup.object().shape({
  name: Yup.string().required(),
  company: Yup.string().required(),
});

const formik = useFormik({
   initialValues = {
    name: "",
    company: "",
    phone_number: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
  }, onSubmit: values => {
    alert(JSON.stringify(values, null, 2))
  }
});



export default function ToAddressForm(props) {
  return (
    <Formik >
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" placeholder="Enter your name" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Company</Form.Label>
            <Form.Control type="company" placeholder="Company" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formGridPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control type="phone_number" placeholder="888-888-8888" />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Address</Form.Label>
          <Form.Control type = "address1" placeholder="1234 Main St" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control type = "address2" placeholder="Apartment, studio, or floor" />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridCity">
            <Form.Label>City</Form.Label>
            <Form.Control type = "city" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>State</Form.Label>
            <Form.Control type = "state" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control type = "zip" />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control type = "country"/>
          </Form.Group>
        </Row>

        <Stack direction="horizontal">
          <Button variant="secondary" type="reset">
            Reset
          </Button>
          <Button className="ms-auto" variant="primary" type="">
            Submit
          </Button>
        </Stack>
      </Form>
    </Formik>
  );
}
