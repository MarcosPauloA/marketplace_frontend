import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCarrinho } from './CarrinhoContext';
import { Container, Typography, Button, Box, Card, CardMedia, CardContent, CardActions, Dialog, DialogTitle, DialogContent } from '@mui/material';
import ProdutoForm from './ProdutoForm';

const Produtos = () => {
    const [produtos, setProdutos] = useState([]);
    const [produtoSelecionado, setProdutoSelecionado] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const { adicionarAoCarrinho } = useCarrinho();

    React.useEffect(() => {
        axios.get('https://marketplace-28r6.onrender.com/api/produtos')
            .then(response => setProdutos(response.data))
            .catch(error => console.error("Erro: ", error));
    }, []);

    const handleSave = (produto) => {
        setProdutos(prev => {
            const existe = prev.find(p => p.id === produto.id);
            if (existe) {
                return prev.map(p => p.id === produto.id ? produto : p);
            } else {
                return [...prev, produto];
            }
        });
        setOpenDialog(false);
        setProdutoSelecionado(null);
    };

    const handleDelete = (id) => {
        axios.delete(`https://marketplace-28r6.onrender.com/api/produtos/${id}`)
            .then(() => setProdutos(prev => prev.filter(produto => produto.id !== id)))
            .catch(error => console.error("Erro ao deletar produto: ", error));
    };

    const openForm = (produto) => {
        setProdutoSelecionado(produto);
        setOpenDialog(true);
    };

    return (
        <Container style={{ padding: '20px', backgroundColor: 'lightblue' }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h4">Lista de Produtos</Typography>
                <Box>
                    <Button variant="contained" color="primary" onClick={() => openForm(null)}>
                        Criar Produto
                    </Button>
                    <Link to="/carrinho" style={{ textDecoration: 'none', marginLeft: '10px' }}>
                        <Button variant="contained" color="secondary" startIcon={<span role="img" aria-label="cart">🛒</span>}>
                            Ir para o Carrinho
                        </Button>
                    </Link>
                </Box>
            </Box>
            <Box display="flex" flexWrap="wrap" justifyContent="space-around">
                {produtos.map(produto => (
                    <Card key={produto.id} sx={{ maxWidth: 345, margin: '20px' }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={produto.imagemUrl}
                            alt={produto.nome}
                        />
                        <CardContent>
                            <Typography variant="h5" component="div">
                                {produto.nome}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {produto.descricao}
                            </Typography>
                            <Typography variant="h6" component="div" color="text.primary">
                                R${produto.preco.toFixed(2)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary" variant="contained" onClick={() => adicionarAoCarrinho(produto)}>
                                Adicionar ao Carrinho
                            </Button>
                            <Button size="small" color="secondary" variant="contained" onClick={() => openForm(produto)}>
                                Editar
                            </Button>
                            <Button size="small" color="error" variant="contained" onClick={() => handleDelete(produto.id)}>
                                Deletar
                            </Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>{produtoSelecionado ? 'Editar Produto' : 'Criar Produto'}</DialogTitle>
                <DialogContent>
                    <ProdutoForm produtoAtual={produtoSelecionado} onSave={handleSave} onCancel={() => setOpenDialog(false)} />
                </DialogContent>
            </Dialog>
        </Container>
    );
};

export default Produtos;
