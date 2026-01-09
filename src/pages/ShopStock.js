import React, { useState, useEffect } from "react";
import { Table, Button, Form, Container, Row, Col } from "react-bootstrap";
import API from "../api/api";
import AppNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

function ShopStock() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState(""); // search input
  const [form, setForm] = useState({ date: "", shopNo: "", quantity: "", pandiName: "", volumeNo: "" });
  const [editingId, setEditingId] = useState(null);

  const fetchRecords = async () => {
    const res = await API.get("/shop-stock");
    setRecords(res.data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) await API.put(`/shop-stock/${editingId}`, form);
      else await API.post("/shop-stock", form);
      setForm({ date: "", shopNo: "", quantity: "", pandiName: "", volumeNo: "" });
      setEditingId(null);
      fetchRecords();
    } catch (err) { console.error(err); }
  };

  const handleEdit = (record) => {
    setForm({
      date: record.date,
      shopNo: record.shopNo,
      quantity: record.quantity,
      pandiName: record.pandiName,
      volumeNo: record.volumeNo
    });
    setEditingId(record._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      await API.delete(`/shop-stock/${id}`);
      fetchRecords();
    }
  };

  // 🔍 Filter records by search input (search works on all fields)
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
        <h3>Shop Stock Records</h3>

        {/* 🔍 SEARCH BAR */}
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search shop stock by date or any field..."
        />

        {/* TABLE */}
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>Date</th>
              <th>Shop No</th>
              <th>Quantity</th>
              <th>Pandi Name</th>
              <th>Volume No</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map(r => (
              <tr key={r._id}>
                <td>{r.date}</td>
                <td>{r.shopNo}</td>
                <td>{r.quantity}</td>
                <td>{r.pandiName}</td>
                <td>{r.volumeNo}</td>
                <td>
                  <Button size="sm" variant="warning" onClick={() => handleEdit(r)}>Edit</Button>{" "}
                  <Button size="sm" variant="danger" onClick={() => handleDelete(r._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* FORM */}
        <Form onSubmit={handleSubmit} className="mt-4">
          <Row className="mb-2">
            <Col md={2}><Form.Control type="date" name="date" value={form.date} onChange={handleChange} required /></Col>
            <Col md={2}><Form.Control placeholder="Shop No" name="shopNo" value={form.shopNo} onChange={handleChange} required /></Col>
            <Col md={2}><Form.Control placeholder="Quantity" name="quantity" value={form.quantity} onChange={handleChange} required /></Col>
            <Col md={3}><Form.Control placeholder="Pandi Name" name="pandiName" value={form.pandiName} onChange={handleChange} /></Col>
            <Col md={3}><Form.Control placeholder="Volume No" name="volumeNo" value={form.volumeNo} onChange={handleChange} /></Col>
          </Row>
          <Button type="submit">{editingId ? "Update" : "Add"} Record</Button>
        </Form>
      </Container>
      <Footer />
    </>
  );
}

export default ShopStock;
