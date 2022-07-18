import React from "react";
import { Navbar, Container, Button, Form,Nav, NavDropdown, FormControl } from "react-bootstrap";
export default function index() {

    const submit = (e) => {
        e.preventDefault();
        alert("hello world")
    }

  return (
    <div className="d-lg-block d-none">
      <Navbar expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Logo</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          {/* <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mx-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">New Release</Nav.Link>
              <Nav.Link href="#action2">Men</Nav.Link>
              <Nav.Link href="#action2">Women</Nav.Link>
              <Nav.Link href="#action2">Kids</Nav.Link>
              <Nav.Link href="#action2">Upto 30% off</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Something else here
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form className="d-flex" onSubmit={submit}>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
          </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </div>
  );
}
