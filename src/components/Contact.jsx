import React from "react";
import {
  Button,
  Container,
  Col,
  Row,
  Form,
  FloatingLabel,
  FormGroup,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { fas, far, fal } from '@awesome.me/kit-KIT_CODE/icons'
import "./Contact.css";

export default function Contact() {

  function handleSubmit(event) {
    event.preventDefault();
    console.log("Form submitted");
  }

  return (
    <Container fluid id="contact" className="contact">
      <Row className="align-items-stretch contact-row" >
        <Col lg={6} md={6} sm={12} className="contact-form-section">
          <h2>Let's work together!</h2>
          <p>
            I design and code stuff that I am interested in and really like
            doing what I do. Just simple Like that!
          </p>

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col xs={12} sm={6}>
                <FormGroup controlId="formFirstName">
                  <Form.Control type="text" placeholder="First name" />
                </FormGroup>
                <FormGroup controlId="formEmail">
                  <Form.Control type="email" placeholder="Email address" />
                </FormGroup>  
              </Col>
              <Col xs={12} sm={6}>
                <FormGroup controlId="formLastName">
                  <Form.Control type="text" placeholder="Last name" />
                </FormGroup>
                <FormGroup controlId="formPhoneNumber">
                  <Form.Control type="text" placeholder="Phone number" />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Form.Group className="mb-3" controlId="formMessagearea">
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Message"
                    className="messageArea"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="sendMessage">
                  {" "}
                  Send Message{" "}
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>

        <Col lg={6} md={6} sm={12} className="contact-info">
              {/* Phone section */}
              <div className="contact-number">
                <i className="fa-solid fa-phone"></i>
                <div className="personal-details">
                  <p className="heading">Phone</p>
                  <p>+1 608 895 1403</p>
                </div>
              </div>

              {/* Email section */}
              <div className="email">
                {/* <img src="https://img.icons8.com/fluency-systems-regular/48/new-post.png" alt="email-icon"/> */}
                <i className="fa-regular fa-envelope"></i>
                <div className="personal-details">
                  <p className="heading">Email</p>
                  <a href="mailto:chhabrapranav2001@gmail.com">
                    chhabrapranav2001@gmail.com
                  </a>
                </div>
              </div>
              {/* Address section */}
              <div className="address">
                {/* <img src="https://img.icons8.com/material-outlined/24/address.png" alt="address-icon"/> */}
                <i className="fa-solid fa-location-dot"></i>
                <div className="personal-details">
                  <p className="heading">Address</p>
                  <p>437 N Frances Street, Madison 53703, WI</p>
                </div>
              </div>
        </Col>
      </Row>
    </Container>
  );
}
