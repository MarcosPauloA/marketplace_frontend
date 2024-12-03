import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';

const Home = () => {
    return (
        <Box 
            sx={{ 
                backgroundColor: 'lightblue', 
                minHeight: '100vh', 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'center', 
                alignItems: 'center'
            }}
        >
            <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
                <Typography variant="h3" component="h3" gutterBottom>
                    Bem-vindo ao Marketplace Local
                </Typography>
                <Typography variant="body1">
                    Descubra os melhores produtos da sua região!
                </Typography>
                <Box my={4}>
                    <Link to="/produtos" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" size="large">
                            Ver Produtos
                        </Button>
                    </Link>
                </Box>
            </Container>
        </Box>
    );
};

export default Home;
