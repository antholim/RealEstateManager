import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper } from '@mui/material';
import styles from './styles/Register.module.css';
import { fetchPost } from '../../../services/FetchService';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Check if passwords match whenever either password field changes
  const validatePasswords = (pass, confirmPass) => {
    if (confirmPass && pass !== confirmPass) {
      setPasswordError('Passwords do not match');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validatePasswords(newPassword, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    validatePasswords(password, newConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Final validation before submission
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (!password || !confirmPassword) {
      setPasswordError('Please fill in both password fields');
      return;
    }

    try {
      const response = await fetchPost("/api/v1/register", {
        body: {
          email: email,
          username: username,
          password: password,
        }
      });
      console.log(response);
      console.log('Registration Submitted:', { username: username, email: email });
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };

  return (
    <Container maxWidth="sm" className={styles.container}>
      <Paper elevation={3} className={styles.paper}>
        <Typography variant="h4" align="center" gutterBottom>
          Register
        </Typography>
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <TextField
            label="Username"
            type="text"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <TextField
            label="Confirm Password"
            type="password"
            fullWidth
            margin="normal"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            error={!!passwordError}
            helperText={passwordError}
            required
          />
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            fullWidth 
            className={styles.button}
            disabled={!!passwordError || !password || !confirmPassword}
          >
            Register
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default Register;