import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from 'react-scroll';
import "./ProfileNavbar.css";
import logo from "../assets/PClogo.png";

export default function ProfileNavbar() {
  return (
    <Navbar bg="white" expand="lg" data-bs-theme="dark" sticky="top">
      <Container fluid className="navbar-container">
        <Navbar.Brand href="#home">
          <img
            src={logo}
            width="60"
            height="60"
            className="logo d-inline-block align-top"
            alt="PC-logo" />
          Pranav Chhabra
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <Link to="work" spy={true} smooth={true} offset={-70} duration={500} className="nav-link" activeClass="active"><span>Work</span></Link>
          <Link to="resume" spy={true} smooth={true} offset={-70} duration={500} className="nav-link" activeClass="active"><span>Resume</span></Link>
          <Link to="skills" spy={true} smooth={true} offset={-70} duration={500} className="nav-link" activeClass="active"><span>Skills</span></Link>
          <Link to="contact" spy={true} smooth={true} offset={-70} duration={500} className="nav-link" activeClass="active"><span>Contact</span></Link>
        </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
