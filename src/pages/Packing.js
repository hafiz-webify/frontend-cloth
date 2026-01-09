import React, { useState, useEffect } from "react";
import { Table, Button, Form, Container, Row, Col } from "react-bootstrap";
import API from "../api/api";
import AppNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

function Packing() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState(""); // for search (by date)
  const [form, setForm] = useState({
    date: "",
    latNo: "",
    volumeNo: "",
    quantity: "",
    aGrade: "",
    bGrade: "",
    shirtFabric: "",
    duppataFabric: "",
    embName: "",
    baseParty: "",
    dayingName: "",
    variant: ""
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all packing records
  const fetchRecords = async () => {
    const res = await API.get("/packing");
    setRecords(res.data);
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  // Handle form change
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Add / Edit submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/packing/${editingId}`, form);
      } else {
        await API.post("/packing", form);
      }
      setForm({
        date: "",
        latNo: "",
        volumeNo: "",
        quantity: "",
        aGrade: "",
        bGrade: "",
        shirtFabric: "",
        duppataFabric: "",
        embName: "",
        baseParty: "",
        dayingName: "",
        variant: ""
      });
      setEditingId(null);
      fetchRecords();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit record
  const handleEdit = (record) => {
    setForm({ ...record });
    setEditingId(record._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Delete record
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      await API.delete(`/packing/${id}`);
      fetchRecords();
    }
  };

  // 🔍 FILTER RECORDS (by date)
  const filteredRecords = search
    ? records.filter((r) => r.date === search)
    : records;

  return (
    <>
      <AppNavbar />
      <Container className="my-4">
        <h3>Packing Records</h3>

        {/* 🔍 SEARCH BAR */}
        <SearchBar
          type="date"
          value={search}
          onChange={setSearch}
          placeholder="Search by date"
        />

        {/* Table */}
        <Table striped bordered hover responsive className="mt-3">
          <thead>
            <tr>
              <th>Date</th><th>Lat No</th><th>Volume No</th><th>Quantity</th>
              <th>A Grade</th><th>B Grade</th><th>Shirt Fabric</th><th>Duppata Fabric</th>
              <th>Emb Name</th><th>Base Party</th><th>Daying Name</th><th>Variant</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map(r => (
              <tr key={r._id}>
                <td>{r.date}</td><td>{r.latNo}</td><td>{r.volumeNo}</td><td>{r.quantity}</td>
                <td>{r.aGrade}</td><td>{r.bGrade}</td><td>{r.shirtFabric}</td><td>{r.duppataFabric}</td>
                <td>{r.embName}</td><td>{r.baseParty}</td><td>{r.dayingName}</td><td>{r.variant}</td>
                <td>
                  <Button size="sm" variant="warning" onClick={() => handleEdit(r)}>Edit</Button>{' '}
                  <Button size="sm" variant="danger" onClick={() => handleDelete(r._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* Add / Edit Form */}
        <Form onSubmit={handleSubmit} className="mt-4">
          <Row>
            <Col md={3}><Form.Control type="date" placeholder="Date" name="date" value={form.date} onChange={handleChange} required /></Col>
            <Col md={2}><Form.Control placeholder="Lat No" name="latNo" value={form.latNo} onChange={handleChange} required /></Col>
            <Col md={2}><Form.Control placeholder="Volume No" name="volumeNo" value={form.volumeNo} onChange={handleChange} required /></Col>
            <Col md={1}><Form.Control placeholder="Quantity" name="quantity" value={form.quantity} onChange={handleChange} required /></Col>
          </Row>
          <Row className="mt-2">
            <Col md={1}><Form.Control placeholder="A Grade" name="aGrade" value={form.aGrade} onChange={handleChange} /></Col>
            <Col md={1}><Form.Control placeholder="B Grade" name="bGrade" value={form.bGrade} onChange={handleChange} /></Col>
            <Col md={2}><Form.Control placeholder="Shirt Fabric" name="shirtFabric" value={form.shirtFabric} onChange={handleChange} /></Col>
            <Col md={2}><Form.Control placeholder="Duppata Fabric" name="duppataFabric" value={form.duppataFabric} onChange={handleChange} /></Col>
            <Col md={2}><Form.Control placeholder="Emb Name" name="embName" value={form.embName} onChange={handleChange} /></Col>
            <Col md={2}><Form.Control placeholder="Base Party" name="baseParty" value={form.baseParty} onChange={handleChange} /></Col>
          </Row>
          <Row className="mt-2">
            <Col md={2}><Form.Control placeholder="Daying Name" name="dayingName" value={form.dayingName} onChange={handleChange} /></Col>
            <Col md={2}><Form.Control placeholder="Variant" name="variant" value={form.variant} onChange={handleChange} /></Col>
            <Col md={2}><Button type="submit">{editingId ? "Update" : "Add"} Record</Button></Col>
          </Row>
        </Form>
      </Container>
      <Footer />
    </>
  );
}

export default Packing;
