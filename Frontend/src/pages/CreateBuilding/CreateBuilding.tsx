import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, MenuItem } from '@mui/material';
import styles from './styles/CreateBuilding.module.css';

const CreateBuilding = () => {
  const [buildingName, setBuildingName] = useState('');
  const [address, setAddress] = useState('');
  const [floors, setFloors] = useState('');
  const [type, setType] = useState('Residential');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Building Form Submitted:', { buildingName, address, floors, type });
  };

  return (
    <Container maxWidth="sm" className={styles.container}>
      <Paper elevation={3} className={styles.paper}>
        <Typography variant="h4" align="center" gutterBottom>
          Add New Building
        </Typography>
        <form onSubmit={handleSubmit} className={styles.form}>
          <TextField
            label="Building Name"
            fullWidth
            margin="normal"
            value={buildingName}
            onChange={(e) => setBuildingName(e.target.value)}
            required
          />
          <TextField
            label="Address"
            fullWidth
            margin="normal"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <TextField
            label="Number of Floors"
            type="number"
            fullWidth
            margin="normal"
            value={floors}
            onChange={(e) => setFloors(e.target.value)}
            required
          />
          <TextField
            select
            label="Type"
            fullWidth
            margin="normal"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          >
            <MenuItem value="Residential">Residential</MenuItem>
            <MenuItem value="Commercial">Commercial</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" color="primary" fullWidth className={styles.button}>
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateBuilding;