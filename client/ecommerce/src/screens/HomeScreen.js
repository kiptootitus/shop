import React, { useState, useEffect } from 'react'
import { Container } from 'react-bootstrap';
import axios from "axios";
import { Row, Col } from "react-bootstrap";

function HomeScreen () {
    const [products, setProducts] = useState( [] )

    useEffect( () => {
        async function fetchproducts () {
            const {data} = await axios.get( '/api/products/' )
            setProducts(data)
        }

        fetchproducts()
    }, [] );


    return (
        <Container>
            <br>
                <h1><Products</h1>
                <Row>
                    {products.map((product)=>(
                        <Col key={ }>


                        </Col>
                    ))}
                </Row>


        </Container>
)

}

export default HomeScreen