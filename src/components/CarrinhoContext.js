import React, { createContext, useState, useContext } from 'react';

const CarrinhoContext = createContext();

export const useCarrinho = () => useContext(CarrinhoContext);

export const CarrinhoProvider = ({ children }) => {
    const [carrinho, setCarrinho] = useState([]);

    const adicionarAoCarrinho = (produto) => {
        setCarrinho([...carrinho, produto]);
    };

    const removerDoCarrinho = (id) => {
        setCarrinho(carrinho.filter(produto => produto.id !== id));
    };

    const valorTotal = carrinho.reduce((total, produto) => total + produto.preco, 0);

    return (
        <CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho, removerDoCarrinho, valorTotal }}>
            {children}
        </CarrinhoContext.Provider>
    );
};
