import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Bem-vindo ao Marketplace Local</h1>
            <p>Descubra os melhores produtos da sua região!</p>
            <Link to="/produtos">
                <button style={{ padding: '10px 20px', fontSize: '16px' }}>Ver Produtos</button>
            </Link>
        </div>
    );
};

export default Home;
