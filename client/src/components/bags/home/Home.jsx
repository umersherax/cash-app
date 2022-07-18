import React, { useState } from "react";
import { Card, Button, Modal, Col, Container, Alert } from "react-bootstrap";
import Payment from "./Payment";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const data = useSelector((res) => res.auth.user);
  const redirect = useNavigate();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleModal = () => {
    if (!data.token) {
      setShow(true);
    }else{
      setShowModal(true);
    }
  };

  const handleContinue = () => {
    redirect("/login");
  }
  return (
    <Container fluid className="mt-5">
      <Alert key={"warning"} variant={"warning"}>
        12,304 people have already participated
      </Alert>

      <Col style={{ marginBottom: 100 }} xs={12} md={6} lg={4}>
        <Card style={{ height: "557px", border: "none" }}>
          <Card.Img
            variant="top"
            src="airpods.png"
            style={{ height: "376px" }}
          />
          <Card.Body>
            <Card.Title
              style={{
                color: "#FA5400",
                fontSize: "16px",
                fontWeight: "500px",
              }}
            >
              Apple
            </Card.Title>
            <Card.Title
              style={{
                color: "#111111",
                fontSize: "16px",
                fontWeight: "500px",
              }}
            >
              Airpods Max
            </Card.Title>

            <Card.Title
              style={{
                color: "#757575",
                fontSize: "16px",
                fontWeight: "500px",
              }}
            >
              <p>
                PKR <del>150,000 Lakh</del>{" "}
              </p>
            </Card.Title>
            <Card.Text
              style={{
                color: "#111111",
                fontSize: "18px",
                fontWeight: "1500px",
              }}
            >
              PKR 1000
            </Card.Text>
          </Card.Body>
          <Button onClick={() => handleModal(true)}>Buy now</Button>
        </Card>
      </Col>
      {showModal && (
        <Payment showModal={showModal} closeModal={() => setShowModal(false)} />
      )}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please login in order to take participate</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleContinue}>
            Continue
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
