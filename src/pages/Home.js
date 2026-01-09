import React from "react";
import { Container } from "react-bootstrap";
import AppNavbar from "../components/Navbar";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <AppNavbar />
      <Container className="d-flex justify-content-center align-items-center vh-100">
        <h2 className="text-center fst-italic">
          "Quality is remembered long after the price is forgotten."
        </h2>
      </Container>
      <Footer />
    </>
  );
}

export default Home;
