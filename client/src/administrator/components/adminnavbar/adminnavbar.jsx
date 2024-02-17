/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useLocation } from "react-router-dom";
import logo from "../../../assets/img/logo-nav.png";

import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, Navbar, Image } from "react-bootstrap";

function AdminNavbar() {
  const location = useLocation();

  const linksData = [
    { path: "/admin/", title: "Products" },
    { path: "/admin/createproduct", title: "Create product/service" },
    { path: "/admin/instructors", title: "Instructors" },
    { path: "/admin/categories", title: "Categories" },
    { path: "/admin/clientinfo", title: "Client info" },
    { path: "/admin/dashboard", title: "Dashboard" },
  ];

  const links = [];
  for (const linkData of linksData) {
    const active = location.pathname === linkData.path;
    links.push(
      <LinkContainer key={linkData.path} to={linkData.path}>
        <Nav.Link
          active={active}
          className={`rounded fw-bold px-2 mx-1 my-md-1 ${
            active ? "bg-primary" : ""
          }`}
        >
          {linkData.title}
        </Nav.Link>
      </LinkContainer>
    );
  }
  return (
    <Navbar collapseOnSelect bg="secondary" expand="lg">
      <Container>
        <LinkContainer to={"/home"}>
          <Navbar.Brand>
            <Image
              src={logo}
              alt="Home"
              className="border border-2 border-light"
              roundedCircle
            />
          </Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="navbar-options" />
        <Navbar.Collapse id="navbar-options">
          <Nav className="ms-auto">{links}</Nav>
        </Navbar.Collapse>
        <input type="search" placeholder="Search" aria-label="Search" />
        <button type="submit">Search</button>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;
