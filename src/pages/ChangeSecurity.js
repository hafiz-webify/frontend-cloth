import React, { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import API from "../api/api";
import AppNavbar from "../components/Navbar";
import Footer from "../components/Footer";

function ChangeSecurity() {
  const [currentId, setCurrentId] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newId, setNewId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/admin/change", {
        currentId, currentPassword, newId, newPassword
      });
      setMessage(res.data.message || "Updated successfully");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to update");
    }
  };

  return (
    <>
      <AppNavbar />
      <Container className="my-4">
        <h3>Change Admin Credentials</h3>
        {message && <Alert variant="info">{message}</Alert>}
        <Form onSubmit={handleSubmit} className="mt-3">
          <Form.Group className="mb-3">
            <Form.Label>Current ID</Form.Label>
            <Form.Control type="text" value={currentId} onChange={e => setCurrentId(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Current Password</Form.Label>
            <Form.Control type="password" value={currentPassword} onChange={e => setCurrentPassword(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New ID</Form.Label>
            <Form.Control type="text" value={newId} onChange={e => setNewId(e.target.value)} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>New Password</Form.Label>
            <Form.Control type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} required />
          </Form.Group>
          <Button type="submit">Update</Button>
        </Form>
      </Container>
      <Footer />
    </>
  );
}

export default ChangeSecurity;
