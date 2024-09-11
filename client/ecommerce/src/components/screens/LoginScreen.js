import React from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function LoginScreen() {
  return (
    <>
      <Container className="mt-3">
        <Row>
          <Col md={4}></Col>
          <Col md={4}>
            <Card>
              <Card.Header as="h3" className="text-center bg-black text-light">
                Login
              </Card.Header>
              <Card.Body>
                <Form>
                 
                  
                  <Form.Group className="mb-3"  controlId="email">
                    <Form.Label><span><i className="fa fa-email"></i></span>Email</Form.Label>
                    <Form.Control type="text" placeholder="example@gmail.com" required/>
                  </Form.Group>
                  <Form.Group className="mb-3"  controlId="password">
                    <Form.Label><span><i className=" "></i></span>Password</Form.Label>
                    <Form.Control type="text" placeholder="Enter your Password" required/>
                  </Form.Group>
                
                  <div className='d-grid gap-2'>
                    <Button className="btn btn-md btn-success" type="submit">Sign</Button>
                  </div>
                </Form>
                <Row className="py-3">
                  <Col>New User ?
                  <Link to="/signup">Signup</Link>                  
                  </Col>
                </Row>

                
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    </>
  );
}

export default LoginScreen;
