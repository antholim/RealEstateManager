import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import styles from './styles/Login.module.css';
import { fetchPost } from '../../../services/FetchService';

const Login = () => {
  const [username, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetchPost("/api/v1/login", {
      body : { 
        username: username, 
        password: password 
      }
    })
    console.log(response)
    console.log('Login Submitted:', { username: username, password: password });
  };

  return (
    <Container maxWidth="sm" className={styles.container}>
      <Paper elevation={3} className={styles.paper}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            label="Username"
            type="string"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth className={styles.button}>
            Login
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Login;