import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { useCarrinho } from './CarrinhoContext';

const Produtos = () => {
    const [produtos, setProdutos] = React.useState([]);
    const { adicionarAoCarrinho } = useCarrinho();

    React.useEffect(() => {
        axios.get('http://localhost:8080/api/produtos')
            .then(response => {
                console.log('Resposta da requisição:', response);
                setProdutos(response.data);
            })
            .catch(error => console.error("Erro: ", error));
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <Link to="/carrinho">
                <button style={{ padding: '10px 20px', fontSize: '16px', float: 'right' }}>
                    🛒 Ir para o Carrinho
                </button>
            </Link>
            <h1>Lista de Produtos</h1>
            {produtos.map(produto => (
                <div key={produto.id} style={{ borderBottom: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                    <img src={produto.imagemUrl} alt={produto.nome} style={{ maxWidth: '100px', marginRight: '10px' }} />
                    <div style={{ display: 'inline-block', verticalAlign: 'top' }}>
                        <h2>{produto.nome}</h2>
                        <p>{produto.descricao}</p>
                        <p><strong>{produto.preco}</strong></p>
                        <button onClick={() => adicionarAoCarrinho(produto)} style={{ padding: '5px 10px', fontSize: '14px' }}>
                            Adicionar ao Carrinho
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Produtos;
