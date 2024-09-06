import React from 'react'
import {Card} from "react-bootstrap"
import {Link} from 'react-router-dom'
function Product({product}) {
  return (
    <Card className='my-3 p-3 rounded'>

        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} />
        </Link>
        <Card.Body>
        <Link to={`/product/${product._id}`} className='text-dark'>
            <Card.Title as="h3">
                {product.productname}
            </Card.Title>
           </Link>


            
        <Card.Text as="h6">
          Kes  {product.price} Rs
        </Card.Text>

        </Card.Body>
    </Card>
  )
}

export default Product