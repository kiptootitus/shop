import React, { useEffect, useState } from "react";
import { Container, Form, Button, Row, Col, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Message from "../Message";
import { vendorLogin } from "../../actions/UserAction";
import Loader from "../Loader";

function LoginScreen() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [show, changeShow] = useState("fa fa-eye-slash"); // Toggle password visibility
    const [message, setMessage] = useState(""); // To display validation errors

    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    const location = useLocation();
    const redirect = location.search ? location.search.split("=")[1] : "/";

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, userInfo, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();

        // Basic validation
        if (!username || !password) {
            setMessage("Please fill in both fields.");
            return;
        }

        if (password.length < 6) {
            setMessage("Password should be at least 6 characters.");
            return;
        }

        // Dispatch UserLogin action
        dispatch(vendorLogin(username, password));
    };

    const showPassword = () => {
        const passwordField = document.getElementById("password");
        if (passwordField.type === "password") {
            passwordField.type = "text";
            changeShow("fa fa-eye");
        } else {
            passwordField.type = "password";
            changeShow("fa fa-eye-slash");
        }
    };

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
                                {message && <Message variant="danger">{message}</Message>}
                                {error && <Message variant="danger">{error}</Message>}
                                {loading && <Loader />}
                                <Form onSubmit={submitHandler}>
                                    <Form.Group className="mb-3" controlId="username">
                                        <Form.Label>
                                            <span><i className="fa fa-user"></i></span> Username
                                        </Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="example@gmail.com"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="password">
                                        <Form.Label>
                                            <span><i className={show} onClick={showPassword}></i></span> Password
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            controlId="password"
                                            placeholder="Enter your password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <div className="d-grid gap-2">
                                        <Button className="btn btn-md btn-success" type="submit">
                                            Sign In
                                        </Button>
                                    </div>
                                </Form>
                                <Row className="py-3">
                                    <Col>
                                        New User? <Link to="/signup">Signup</Link>
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
