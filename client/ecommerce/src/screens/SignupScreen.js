import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function SignupScreen() {
  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Card>
              <Card.Header as="h3" className="text-center bg-black text-light">
                Sign Up
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group className="mb-3"  controlId="fname">
                    <Form.Label>{" "}<span><i className="fa fa-user"></i></span>{" "}First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your First Name" required/>
                  </Form.Group>
                  <Form.Group className="mb-3"  controlId="lname">
                    <Form.Label>{" "}<span><i class="fa fa-user"></i></span>{" "}Last Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter your Last Name" required/>
                  </Form.Group>
                  <Form.Group className="mb-3"  controlId="email">
                    <Form.Label><span><i class="fa fa-email"></i></span>Email</Form.Label>
                    <Form.Control type="text" placeholder="example@gmail.com"required/>
                  </Form.Group>
                  <Form.Group className="mb-3"  controlId="pass1">
                    <Form.Label><span><i class=" "></i></span>Password</Form.Label>
                    <Form.Control type="text" placeholder="Enter your Password" required/>
                  </Form.Group>
                  <Form.Group className="mb-3"  controlId="pass2">
                    <Form.Label><span><i class=" "></i></span>Confirm Password</Form.Label>
                  </Form.Group>  
                  <Form.Control type="text" placeholder="Confirm your Password" required/>
                </Form>
                <Button variant="green" type="submit" className="btn-block bg-green text-center ">
                  Sign Up
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </>
  );
}

export default SignupScreen;
