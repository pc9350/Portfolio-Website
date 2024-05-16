import React, { useState, useEffect } from "react";
import { Button, Container, Col, Row, Form, FormGroup } from "react-bootstrap";
import { toast, ToastContainer, Bounce } from "react-toastify";
import "./Contact.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const apiEndpoint =
      "https://vt58ndyul2.execute-api.us-east-1.amazonaws.com/Prod/sendemail";

      const requestBody = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        bodyText: formData.message,
      };
    
      const dataToSend = {
        httpMethod: "POST",
        path: "/sendemail",
        body: JSON.stringify(requestBody)
      };

    fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataToSend),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        toast.success("Message sent successfully!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          message: "",
        });
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("An error occurred while sending the message.");
      });
  };

  return (
    <Container fluid id="contact" className="contact">
      <Row className="align-items-stretch contact-</FormGroup>row">
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
                  <Form.Control
                    type="text"
                    placeholder="First name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup controlId="formEmail">
                  <Form.Control
                    type="email"
                    placeholder="Email address"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
              </Col>
              <Col xs={12} sm={6}>
                <FormGroup controlId="formLastName">
                  <Form.Control
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </FormGroup>
                <FormGroup controlId="formPhoneNumber">
                  <Form.Control
                    type="text"
                    placeholder="Phone number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                  />
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
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="messageArea"
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="sendMessage">
                  Send Message
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
            <i className="fa-solid fa-location-dot"></i>
            <div className="personal-details">
              <p className="heading">Address</p>
              <p>Madison, WI</p>
            </div>
          </div>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}
