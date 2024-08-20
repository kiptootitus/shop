import React from 'react'
import {Container} from 'react-bootstrap'
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
    return(

        <>
        <div>
            <Header />
            <Container>
                <h1>HI There welcome to our project</h1>
            </Container>
            <Footer />
        </div>
        </>

    )
    
}