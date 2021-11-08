import React from "react";
import Signup from "./Authentication/Signup";
import Login from "./Authentication/Login";
import Dashboard from "./Dashboard";
import ForgotPassword from "./Authentication/ForgotPassword";
import PrivateRoute from "./Authentication/PrivateRoute";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../Contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UpdateProfile from "./UpdateProfile";
import BasicForm from "./Forms/BasicForm.js";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <AuthProvider>
          <Router>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/update-profile"
                element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                }
              />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/basic-form" element={<BasicForm />} />
            </Routes>
          </Router>
        </AuthProvider>
      </div>
    </Container>
  );
}

export default App;
