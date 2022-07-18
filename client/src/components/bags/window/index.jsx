import React from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import Home from "../home";
import Filters from "../filters";
import Title from "../title";
import Navbar from "../nav";
import Banner from "../banner";
import JazzCash from "../JazzCash";
import Google from "../Google";

export default function index() {
  return (
    <div>
      <Navbar />
      <Banner />
      <div className=" mt-5 px-lg-5 px-2">
        <Title />
        <Row>
          <Col xs lg="2">
            <Filters />
          </Col>
          <Col>
            <Home />
          </Col>
        </Row>
      </div>
    </div>
  );
}
