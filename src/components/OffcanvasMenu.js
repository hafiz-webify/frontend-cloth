import React from "react";
import { Offcanvas, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function OffcanvasMenu({ show, handleClose }) {
  const navigate = useNavigate();
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="flex-column">
          <Nav.Link onClick={() => navigate("/home")}>Home</Nav.Link>
         
          <Nav.Link onClick={() => navigate("/packing")}>Packing</Nav.Link>
          <Nav.Link onClick={() => navigate("/shop-stock")}>Shop Stock</Nav.Link>
          <Nav.Link onClick={() => navigate("/embroidery-details")}>Embroidery Details</Nav.Link>
          <Nav.Link onClick={() => navigate("/reports")}>Reports</Nav.Link>
          <Nav.Link onClick={() => navigate("/fabric-details")}>Fabric Details</Nav.Link>
           
                </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default OffcanvasMenu;
