import { useForm } from 'react-hook-form';
import axios from 'axios';
import { REACT_APP_ENDPOINT_BASE_URL } from '../../../../variables';
import { TextField, Button } from '@mui/material';


function LoginComponent() {
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data: any) => {
        try {
            const response = await axios.post(`${REACT_APP_ENDPOINT_BASE_URL}/login`, {
                email: data.email,
                password: data.password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            localStorage.setItem('token', response.data.accessToken);
            console.log(response);
        } catch {
            console.log('Error');
        }
    }
    return (
        <>
            <h1>Login</h1>
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
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large" // Adjust button size
                    style={{ marginTop: '16px' }}
                    sx={{ width: '250px' }}
                >
                    Login
                </Button>
            </form>
        </>
    )
} export default LoginComponent;