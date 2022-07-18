import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NavDropdown, Button, Navbar, Nav, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
export default function NavbarHeader() {

  const data = useSelector((res) => res.auth.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT", payload: true });
  };

  const MyLink = ({ text, moveTo }) => (
    <Link to={moveTo} style={{ textDecoration: "none", color: "white" }}>
      {text}
    </Link>
  );

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          {" "}
          <MyLink text="CASH APP" moveTo={"/"} />{" "}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <MyLink text="Login" moveTo="/login" />
            </Nav.Link>
            <Nav.Link>
              <MyLink text="Games" moveTo="/games" />
            </Nav.Link>
          </Nav>
          {data?.user?.name && (
            <Nav>
              <NavDropdown
                title={data?.user?.name}
                id="collasible-nav-dropdown"
                className="mt-3"
              >
                <NavDropdown.Item href="#action/3.1">Home</NavDropdown.Item>
                <NavDropdown.Item onClick={handleLogout}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>

              <Nav.Link eventKey={2} href="#memes">
                <img
                  src={data?.user?.imageUrl}
                  style={{ height: 50, width: 50, borderRadius: "50%" }}
                />
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
