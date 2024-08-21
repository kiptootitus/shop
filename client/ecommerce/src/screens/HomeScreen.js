import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

function HomeScreen() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const { data } = await axios.get('api/products/');
                console.log('Fetched data:', data);
                setProducts(data.results);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }
        fetchProducts();
    }, []);

    return (
        <Container>
            <br />
            <h1>Products</h1>
            <Row>
                {products.map((product) => (
                    <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                        <h3>{product.name}</h3>
                        <h3>{product.category}</h3>
                        <h4>KShs. {product.price}</h4>
                        <p>{product.description}</p>
                        <img
                            src={product.image}
                            alt={product.name}
                            className="img-fluid"
                            onError={(e) => e.currentTarget.src = '/path/to/fallback/image.jpg'}
                        />                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default HomeScreen;
