import React from 'react';
import { useCarrinho } from './CarrinhoContext';

const Carrinho = () => {
    const { carrinho, removerDoCarrinho, valorTotal } = useCarrinho();

    return (
        <div style={{ padding: '20px' }}>
            <h2>Carrinho de Compras</h2>
            {carrinho.length === 0 ? (
                <p>Seu carrinho está vazio.</p>
            ) : (
                <div>
                    {carrinho.map(produto => (
                        <div key={produto.id} style={{ marginBottom: '10px' }}>
                            <p>{produto.nome} - {produto.preco}</p>
                            <button onClick={() => removerDoCarrinho(produto.id)}>Remover</button>
                        </div>
                    ))}
                    <h3>Total: {valorTotal}</h3>
                </div>
            )}
        </div>
    );
};

export default Carrinho;
