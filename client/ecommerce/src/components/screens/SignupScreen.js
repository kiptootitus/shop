import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { vendorRegister } from "../../actions/UserAction";
import Loader from "../Loader";
import Message from "../Message";


function SignupScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [first_name, setFname] = useState("");
    const [last_name, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [show, changeShow] = useState(false); // Toggle password visibility

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const submitHandler = (e) => {
        e.preventDefault();

        // Basic validation
        if (password.length < 6) {
            toast.error("Password should be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        // Dispatch vendorRegister action
        dispatch(vendorRegister(first_name, last_name, email, password, confirmPassword));
    };

    // If the user has successfully registered, redirect to login page
    if (userInfo) {
        toast.success("Registration Successful");
        navigate("/login");
    } else if (error) {
        toast.error(error);
    }


    const togglePasswordVisibility = () => {
        changeShow(!show);
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}></Col>
                <Col md={4}>
                    <Card>
                        <Card.Header as="h3" className="text-center bg-black text-light">
                            Sign Up
                        </Card.Header>
                        <Card.Body>
                            {error && <p className="text-danger">{error}</p>}
                            {loading && <p>Loading...</p>}
                            <Form onSubmit={submitHandler}>
                                <Form.Group className="mb-3" controlId="fname">
                                    <Form.Label>
                                        <i className="fa fa-user" aria-hidden="true"></i> First
                                        Name
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your First Name"
                                        value={first_name}
                                        onChange={(e) => setFname(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="lname">
                                    <Form.Label>
                                        <i className="fa fa-user"></i> Last Name
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your Last Name"
                                        value={last_name}
                                        onChange={(e) => setLname(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>
                                        <i className="fa fa-envelope"></i> Email
                                    </Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="example@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>
                                        <i className="fa fa-lock"></i> Password
                                    </Form.Label>
                                    <Form.Control
                                        type={show ? "text" : "password"}
                                        placeholder="Enter your Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <i
                                        className={show ? "fa fa-eye" : "fa fa-eye-slash"}
                                        onClick={togglePasswordVisibility}
                                        style={{
                                            cursor: "pointer",
                                            position: "absolute",
                                            right: "10px",
                                            top: "38px",
                                        }}
                                    ></i>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="confirmPassword">
                                    <Form.Label>
                                        <i className="fa fa-lock"></i> Confirm Password
                                    </Form.Label>
                                    <Form.Control
                                        type={show ? "text" : "password"}
                                        placeholder="Confirm your Password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <div className="d-grid gap-2">
                                    <Button
                                        className="btn btn-md btn-success"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        {loading ? "Signing Up..." : "Signup"}
                                    </Button>
                                </div>
                            </Form>

                            <Row className="py-3">
                                <Col>
                                    Already a User? <Link to="/login">Login</Link>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}></Col>
            </Row>
        </Container>
    );
}

export default SignupScreen;
