import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-scroll";
import "./ProfileNavbar.css";
import logo from "../assets/PClogo.png";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export default function ProfileNavbar() {
  const [isSticky, setIsSticky] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Navbar
      expand="lg"
      data-bs-theme={theme === 'dark' ? 'dark' : 'light'}
      className={`navbar ${isSticky ? "sticky" : ""}`}
      sticky="top"
    >
      <Container fluid className="navbar-container">
        <Navbar.Brand
          href="#home"
          onClick={() => {
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            });
          }}
        >
          <img
            src={logo}
            width="60"
            height="60"
            className="logo d-inline-block align-top"
            alt="PC-logo"
          />
          Pranav Chhabra
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Link
              to="resume"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="nav-link"
              activeClass="active"
            >
              <span>Resume</span>
            </Link>
            <Link
              to="work"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="nav-link"
              activeClass="active"
            >
              <span>Work</span>
            </Link>
            <Link
              to="skills"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="nav-link"
              activeClass="active"
            >
              <span>Skills</span>
            </Link>
            <Link
              to="contact"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              className="nav-link"
              activeClass="active"
            >
              <span>Contact</span>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
