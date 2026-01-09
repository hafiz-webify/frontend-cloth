import React, { useState, useEffect } from "react";
import { Table, Button, Form, Container, Row, Col } from "react-bootstrap";
import API from "../api/api";
import AppNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

function FabricDetails() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState(""); // YYYY-MM-DD
  const [form, setForm] = useState({
    date: "",
    items: "",
    party: "",
    daying: "",
    biltiNo: "",
    total: "",
    base: ""
  });
  const [editingId, setEditingId] = useState(null);

  const fetchRecords = async () => {
    const res = await API.get("/fabric");
    setRecords(res.data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) await API.put(`/fabric/${editingId}`, form);
      else await API.post("/fabric", form);

      setForm({
        date: "",
        items: "",
        party: "",
        daying: "",
        biltiNo: "",
        total: "",
        base: ""
      });
      setEditingId(null);
      fetchRecords();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (record) => {
    setForm({
      date: record.date,
      items: record.items,
      party: record.party,
      daying: record.daying,
      biltiNo: record.biltiNo,
      total: record.total,
      base: record.base
    });
    setEditingId(record._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      await API.delete(`/fabric/${id}`);
      fetchRecords();
    }
  };

  // ✅ DATE-ONLY FILTER
  const filteredRecords = search
    ? records.filter((r) => r.date === search)
    : records;

  return (
    <>
      <AppNavbar />
      <Container className="my-4">
        <h3>Fabric Details</h3>

        {/* 🔍 DATE SEARCH */}
        <SearchBar
          type="date"
          value={search}
          onChange={setSearch}
          placeholder="Search by date"
        />

        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>Date</th>
              <th>Items</th>
              <th>Party</th>
              <th>Daying</th>
              <th>Bilti No</th>
              <th>Total</th>
              <th>Base</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((r) => (
              <tr key={r._id}>
                <td>{r.date}</td>
                <td>{r.items}</td>
                <td>{r.party}</td>
                <td>{r.daying}</td>
                <td>{r.biltiNo}</td>
                <td>{r.total}</td>
                <td>{r.base}</td>
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
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </Col>
            <Col md={2}>
              <Form.Control
                placeholder="Items"
                name="items"
                value={form.items}
                onChange={handleChange}
              />
            </Col>
            <Col md={2}>
              <Form.Control
                placeholder="Party"
                name="party"
                value={form.party}
                onChange={handleChange}
              />
            </Col>
            <Col md={2}>
              <Form.Control
                placeholder="Daying"
                name="daying"
                value={form.daying}
                onChange={handleChange}
              />
            </Col>
            <Col md={1}>
              <Form.Control
                placeholder="Bilti No"
                name="biltiNo"
                value={form.biltiNo}
                onChange={handleChange}
              />
            </Col>
            <Col md={1}>
              <Form.Control
                placeholder="Total"
                name="total"
                value={form.total}
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

export default FabricDetails;
