import React, { Component, useEffect, useState } from 'react';
import api from '../../services/api';
import './styles.css';
import { Link } from 'react-router-dom';

const Main = () => {

    const [products, setProducts] = useState([]);
    const [productInfo, setProductInfo] = useState({});
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async (page = 1) => {
        const response = await api.get(`/products?page=${page}`);

        const { docs, ...productInfo } = response.data;

        setProducts(docs);
        setProductInfo(productInfo);
    };

    const prevPage = () => {
        
        if(page === 1) return;
        
        const pageNumber = page - 1;
        setPage(pageNumber);
        loadProducts(pageNumber)
    }

    const nextPage = () => {
        if(page === productInfo.pages) return;

        const pageNumber = page + 1;
        setPage(pageNumber);
        loadProducts(pageNumber)
    }

    return (
        <div className='product-list'>
            <h1>Contagem de produtos: {products.length}</h1>
            {products.map((item) => {
                return (
                    <article key={item._id}>
                        <strong>{item.title}</strong>
                        <p>{item.description}</p>
                        <Link to={`/products/${item._id}`}>Acessar</Link>
                    </article>
                )
            })}
            <div className="actions">
                <button onClick={prevPage} >Anterior</button>
                <button onClick={nextPage}>Próximo</button>
            </div>
        </div>
    );
}

export default Main;
