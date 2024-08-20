import React from 'react'
import { Container } from 'react-bootstrap'
import Header from "./components/Header";
import Footer from "./components/Footer";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";

export default function App() {
    return (

        <>
        <Router>
            <Header />
            <Routes>
                <Route exact path="/" element={<HomeScreen/>}></Route>
            </Routes>
            <Routes>
                <Route exact path="/login" element={<LoginScreen/> }></Route>
            </Routes>
            <Routes>
            <Route exact path="/signup" element={<SignupScreen/> }></Route>
            </Routes>
        </Router>
            <Footer />
</>

)

}