import React, {useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ListProducts } from '../../actions/ProductActions.js';


 export default function HomeScreen() {
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    useEffect(() => {
        dispatch(ListProducts());
    
    }, [dispatch]);

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
