import React, { useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { vendorRegister } from "../../actions/UserAction";
import Loader from "../Loader";
import Message from "../Message";

function SignupScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [first_name, setFirst_name] = useState("");
    const [last_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
    const [message, setMessage] = useState(""); // To display validation errors

    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    const submitHandler = (e) => {
        e.preventDefault();

        // Basic validation
        if (password.length < 6) {
            setMessage("Password should be at least 6 characters");
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        // Dispatch vendorRegister action
        dispatch(vendorRegister(first_name, last_name, email, password, confirmPassword));
    };

    // Redirect if registration is successful
    if (userInfo) {
        setMessage("Registration Successful");
        navigate("/login");
    } else if (error) {
        setMessage(error);
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword); // Toggle between text and password
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
                            {error && <Message variant="danger">{error}</Message>}
                            {loading && <Loader />}
                            <Form onSubmit={submitHandler}>
                                <Form.Group className="mb-3" controlId="fname">
                                    <Form.Label>
                                        <i className="fa fa-user"></i> First Name
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your First Name"
                                        value={first_name}
                                        onChange={(e) => setFirst_name(e.target.value)}
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
                                        onChange={(e) => setLast_name(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>
                                        <i className="fa fa-envelope"></i> Email
                                    </Form.Label>
                                    <div className="input-group">
                                        <Form.Control
                                            type="email"
                                            placeholder="example@gmail.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                        <span className="input-group-text">
                                            <i className="fa fa-envelope"></i>
                                        </span>
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="password">
                                    <Form.Label>
                                        <i className="fa fa-lock"></i> Password
                                    </Form.Label>
                                    <div className="input-group">
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        <span className="input-group-text">
                                            <i
                                                className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"}
                                                onClick={toggleShowPassword}
                                                style={{ cursor: "pointer" }}
                                            ></i>
                                        </span>
                                    </div>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="confirmPassword">
                                    <Form.Label>
                                        <i className="fa fa-lock"></i> Confirm Password
                                    </Form.Label>
                                    <div className="input-group">
                                        <Form.Control
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Confirm your Password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                        />
                                        <span className="input-group-text">
                                            <i
                                                className={showPassword ? "fa fa-eye" : "fa fa-eye-slash"}
                                                onClick={toggleShowPassword}
                                                style={{ cursor: "pointer" }}
                                            ></i>
                                        </span>
                                    </div>
                                </Form.Group>

                                {message && <Message variant="danger">{message}</Message>}

                                <div className="d-grid gap-2">
                                    <Button className="btn btn-md btn-success" type="submit">
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
