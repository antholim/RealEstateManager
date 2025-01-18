import React, {useState} from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {REACT_APP_ENDPOINT_BASE_URL} from "../../../../variables"
import { TextField, Button } from '@mui/material';

function RegisterComponent() {
    const {register, handleSubmit} = useForm();
    const onSubmit = async (data:any) => {
        try {
            await axios.post(`${REACT_APP_ENDPOINT_BASE_URL}/register`, {
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
                dateOfBirth: data.dateOfBirth,
                phoneNumber: data.phoneNumber
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error('Error : ', error);
        }
    }
    return (
        <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Email"
        type="email"
        {...register('email', { required: true })}
        placeholder="Email"
        fullWidth
        margin="normal"
        variant="outlined"
        size="small" // Adjust size
        sx={{ width: '250px' }}
      />
      <TextField
        label="Password"
        type="password"
        {...register('password', { required: true })}
        placeholder="Password"
        fullWidth
        margin="normal"
        variant="outlined"
        size="small" // Adjust size
        sx={{ width: '250px' }}
      />
      <TextField
        label="First Name"
        type="text"
        {...register('firstName', { required: true })}
        placeholder="First name"
        fullWidth
        margin="normal"
        variant="outlined"
        size="small" // Adjust size
        sx={{ width: '250px' }}
      />
      <TextField
        label="Last Name"
        type="text"
        {...register('lastName', { required: true })}
        placeholder="Last name"
        fullWidth
        margin="normal"
        variant="outlined"
        size="small" // Adjust size
        sx={{ width: '250px' }}
      />
      <TextField
        label="Date of Birth"
        type="text"
        {...register('dateOfBirth', { required: true })}
        placeholder="YYYY-MM-DD"
        fullWidth
        margin="normal"
        variant="outlined"
        size="small" // Adjust size
        sx={{ width: '250px' }}
      />
      <TextField
        label="Phone Number"
        type="text"
        {...register('phoneNumber', { required: true })}
        placeholder="Phone number"
        fullWidth
        margin="normal"
        variant="outlined"
        size="small" // Adjust size
        sx={{ width: '250px' }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large" // Adjust button size
        style={{ marginTop: '16px' }}
        sx={{ width: '250px' }}
      >
        Register
      </Button>
    </form>
        </>
    )
} export default RegisterComponent;