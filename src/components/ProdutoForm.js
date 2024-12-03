import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, Box, Typography } from '@mui/material';

const ProdutoForm = ({ produtoAtual, onSave, onCancel }) => {
    const [produto, setProduto] = useState({
        nome: '',
        descricao: '',
        preco: '',
        imagemUrl: ''
    });

    useEffect(() => {
        if (produtoAtual) {
            setProduto(produtoAtual);
        }
    }, [produtoAtual]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduto({ ...produto, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (produto.id) {
            axios.put(`http://localhost:8080/api/produtos/${produto.id}`, produto)
                .then(response => onSave(response.data))
                .catch(error => console.error("Erro ao atualizar produto: ", error));
        } else {
            axios.post('http://localhost:8080/api/produtos', produto)
                .then(response => onSave(response.data))
                .catch(error => console.error("Erro ao criar produto: ", error));
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6">{produto.id ? 'Atualizar Produto' : 'Criar Produto'}</Typography>
            <TextField label="Nome" name="nome" value={produto.nome} onChange={handleChange} required />
            <TextField label="Descrição" name="descricao" value={produto.descricao} onChange={handleChange} required />
            <TextField label="Preço" name="preco" type="number" value={produto.preco} onChange={handleChange} required />
            <TextField label="URL da Imagem" name="imagemUrl" value={produto.imagemUrl} onChange={handleChange} required />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button type="submit" variant="contained" color="primary">Salvar</Button>
                <Button variant="outlined" color="secondary" onClick={onCancel}>Cancelar</Button>
            </Box>
        </Box>
    );
};

export default ProdutoForm;
