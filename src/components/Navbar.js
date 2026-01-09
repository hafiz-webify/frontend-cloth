import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import OffcanvasMenu from "./OffcanvasMenu";

function AppNavbar() {
  const [show, setShow] = React.useState(false);
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>Admin Panel</Navbar.Brand>
          <Button variant="outline-light" onClick={() => setShow(true)}>Menu</Button>
        </Container>
      </Navbar>
      <OffcanvasMenu show={show} handleClose={() => setShow(false)} />
    </>
  );
}

export default AppNavbar;
