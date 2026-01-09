import React, { useState, useEffect } from "react";
import { Table, Button, Form, Container, Row, Col } from "react-bootstrap";
import API from "../api/api";
import AppNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

function EmbroideryDetails() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState({
    embroideryName: "",
    latNo: "",
    base: "",
    sendingDate: "",
    receivingDate: "",
    quantity: "",
    fresh: "",
    bGrade: ""
  });
  const [editingId, setEditingId] = useState(null);

  const fetchRecords = async () => {
    const res = await API.get("/embroidery");
    setRecords(res.data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // ✅ FIXED SUBMIT (embName mapping)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        embName: form.embroideryName, // ✅ backend field
        latNo: form.latNo,
        base: form.base,
        sendingDate: form.sendingDate,
        receivingDate: form.receivingDate,
        quantity: form.quantity,
        fresh: form.fresh,
        bGrade: form.bGrade
      };

      if (editingId) {
        await API.put(`/embroidery/${editingId}`, payload);
      } else {
        await API.post("/embroidery", payload);
      }

      setForm({
        embroideryName: "",
        latNo: "",
        base: "",
        sendingDate: "",
        receivingDate: "",
        quantity: "",
        fresh: "",
        bGrade: ""
      });
      setEditingId(null);
      fetchRecords();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ FIXED EDIT
  const handleEdit = (record) => {
    setForm({
      embroideryName: record.embName || "",
      latNo: record.latNo,
      base: record.base,
      sendingDate: record.sendingDate,
      receivingDate: record.receivingDate,
      quantity: record.quantity,
      fresh: record.fresh,
      bGrade: record.bGrade
    });
    setEditingId(record._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      await API.delete(`/embroidery/${id}`);
      fetchRecords();
    }
  };

  // 🔍 SEARCH FILTER
  const filteredRecords = records.filter((r) =>
    Object.values(r)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <AppNavbar />
      <Container className="my-4">
        <h3>Embroidery Details</h3>

        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search embroidery records..."
        />

        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>Embroidery Name</th>
              <th>Lat No</th>
              <th>Base</th>
              <th>Sending Date</th>
              <th>Receiving Date</th>
              <th>Quantity</th>
              <th>Fresh</th>
              <th>B Grade</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((r) => (
              <tr key={r._id}>
                <td>{r.embName}</td> {/* ✅ FIXED */}
                <td>{r.latNo}</td>
                <td>{r.base}</td>
                <td>{r.sendingDate}</td>
                <td>{r.receivingDate}</td>
                <td>{r.quantity}</td>
                <td>{r.fresh}</td>
                <td>{r.bGrade}</td>
                <td>
                  <Button
                    size="sm"
                    variant="warning"
                    onClick={() => handleEdit(r)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(r._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* FORM */}
        <Form onSubmit={handleSubmit} className="mt-4">
          <Row className="mb-2">
            <Col md={2}>
              <Form.Control
                placeholder="Embroidery Name"
                name="embroideryName"
                value={form.embroideryName}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={1}>
              <Form.Control
                placeholder="Lat No"
                name="latNo"
                value={form.latNo}
                onChange={handleChange}
              />
            </Col>
            <Col md={1}>
              <Form.Control
                placeholder="Base"
                name="base"
                value={form.base}
                onChange={handleChange}
              />
            </Col>
            <Col md={2}>
              <Form.Control
                type="date"
                name="sendingDate"
                value={form.sendingDate}
                onChange={handleChange}
              />
            </Col>
            <Col md={2}>
              <Form.Control
                type="date"
                name="receivingDate"
                value={form.receivingDate}
                onChange={handleChange}
              />
            </Col>
            <Col md={1}>
              <Form.Control
                placeholder="Quantity"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
              />
            </Col>
            <Col md={1}>
              <Form.Control
                placeholder="Fresh"
                name="fresh"
                value={form.fresh}
                onChange={handleChange}
              />
            </Col>
            <Col md={1}>
              <Form.Control
                placeholder="B Grade"
                name="bGrade"
                value={form.bGrade}
                onChange={handleChange}
              />
            </Col>
          </Row>
          <Button type="submit">
            {editingId ? "Update" : "Add"} Record
          </Button>
        </Form>
      </Container>
      <Footer />
    </>
  );
}

export default EmbroideryDetails;
