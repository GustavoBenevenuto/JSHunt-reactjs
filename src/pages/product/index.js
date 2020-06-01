import React, { Component, useState, useEffect } from 'react';
import './style.css';
import api from '../../services/api';

const Product = (props) => {
    const [product, setProduct] = useState({});

    useEffect(() => {
        loadProduct();
    }, []);

    const loadProduct = async () => {
        const { id } = props.match.params;

        const response = await api.get(`/products/${id}`);

        setProduct(response.data)
    };

    return (
        <div className="product-info">
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>
                URL: <a href={product.url}>{product.url}</a>
            </p>
        </div>
    );
}

export default Product;