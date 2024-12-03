import React from 'react';
import { useCarrinho } from './CarrinhoContext';
import { Container, Typography, Box, Button, Card, CardContent, CardActions, CardMedia } from '@mui/material';

const Carrinho = () => {
    const { carrinho, removerDoCarrinho, valorTotal } = useCarrinho();

    return (
        <Container style={{ padding: '20px' }}>
            <Typography variant="h4" gutterBottom>Carrinho de Compras</Typography>
            {carrinho.length === 0 ? (
                <Typography variant="h6" color="textSecondary">Seu carrinho está vazio.</Typography>
            ) : (
                <Box>
                    {carrinho.map(produto => (
                        <Card key={produto.id} sx={{ display: 'flex', marginBottom: '10px' }}>
                            <CardMedia
                                component="img"
                                sx={{ width: 151 }}
                                image={produto.imagemUrl}
                                alt={produto.nome}
                            />
                            <CardContent>
                                <Typography component="div" variant="h5">{produto.nome}</Typography>
                                <Typography variant="body2" color="textSecondary" component="div">
                                    {produto.descricao}
                                </Typography>
                                <Typography variant="h6" color="textPrimary" component="div">
                                    R${produto.preco.toFixed(2)}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" color="secondary" variant="contained" onClick={() => removerDoCarrinho(produto.id)}>
                                    Remover
                                </Button>
                            </CardActions>
                        </Card>
                    ))}
                    <Typography variant="h5" component="div" style={{ marginTop: '20px' }}>
                        Total: R${valorTotal.toFixed(2)}
                    </Typography>
                </Box>
            )}
        </Container>
    );
};

export default Carrinho;
