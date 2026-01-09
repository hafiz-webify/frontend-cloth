import React, { useEffect, useState } from "react";
import { Table, Button, Form, Row, Col, Alert, Container } from "react-bootstrap";
import API from "../api/api";
import AppNavbar from "../components/Navbar";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";

function Reports() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState(""); // search input

  const [form, setForm] = useState({
    embroideryRemaining: "",
    fresh: "",
    bGrade: "",
    baseWise: ""
  });

  // Fetch reports
  const fetchReports = async () => {
    try {
      const res = await API.get("/reports");
      setReports(res.data);
    } catch {
      setError("Failed to load reports");
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await API.put(`/reports/${editingId}`, form);
      } else {
        await API.post("/reports", form);
      }

      setForm({
        embroideryRemaining: "",
        fresh: "",
        bGrade: "",
        baseWise: ""
      });
      setEditingId(null);
      fetchReports();
    } catch {
      setError("Save failed");
    }
  };

  // Edit
  const handleEdit = (item) => {
    setForm({
      embroideryRemaining: item.embroideryRemaining,
      fresh: item.fresh,
      bGrade: item.bGrade,
      baseWise: item.baseWise
    });
    setEditingId(item._id);
  };

  // Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this report?")) return;
    await API.delete(`/reports/${id}`);
    fetchReports();
  };

  // 🔍 Filter reports by search (any field)
  const filteredReports = reports.filter((r) =>
    Object.values(r)
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <AppNavbar />
      <Container className="mt-4">
        <h3 className="mb-3">Reports</h3>

        {error && <Alert variant="danger">{error}</Alert>}

        {/* SEARCH BAR */}
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder="Search reports..."
        />

        {/* TABLE */}
        <Table bordered striped hover responsive className="mt-3">
          <thead>
            <tr>
              <th>Embroidery Remaining</th>
              <th>Fresh</th>
              <th>B Grade</th>
              <th>Base Wise</th>
              <th width="160">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((r) => (
              <tr key={r._id}>
                <td>{r.embroideryRemaining}</td>
                <td>{r.fresh}</td>
                <td>{r.bGrade}</td>
                <td>{r.baseWise}</td>
                <td>
                  <Button size="sm" variant="warning" onClick={() => handleEdit(r)}>
                    Edit
                  </Button>{" "}
                  <Button size="sm" variant="danger" onClick={() => handleDelete(r._id)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        {/* FORM UNDER TABLE */}
        <Form onSubmit={handleSubmit} className="mt-4">
          <Row className="g-2">
            <Col md={3}>
              <Form.Control
                placeholder="Embroidery Remaining"
                value={form.embroideryRemaining}
                onChange={(e) => setForm({ ...form, embroideryRemaining: e.target.value })}
                required
              />
            </Col>
            <Col md={3}>
              <Form.Control
                placeholder="Fresh"
                value={form.fresh}
                onChange={(e) => setForm({ ...form, fresh: e.target.value })}
                required
              />
            </Col>
            <Col md={3}>
              <Form.Control
                placeholder="B Grade"
                value={form.bGrade}
                onChange={(e) => setForm({ ...form, bGrade: e.target.value })}
                required
              />
            </Col>
            <Col md={2}>
              <Form.Control
                placeholder="Base Wise"
                value={form.baseWise}
                onChange={(e) => setForm({ ...form, baseWise: e.target.value })}
                required
              />
            </Col>
            <Col md={1}>
              <Button type="submit" className="w-100">
                {editingId ? "Update" : "Add"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
      <Footer />
    </>
  );
}

export default Reports;
