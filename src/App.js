import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Produtos from './components/Produtos';
import Carrinho from './components/Carrinho';
import { CarrinhoProvider } from './components/CarrinhoContext';

function App() {
    return (
        <CarrinhoProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/produtos" element={<Produtos />} />
                    <Route path="/carrinho" element={<Carrinho />} />
                </Routes>
            </Router>
        </CarrinhoProvider>
    );
}

export default App;
