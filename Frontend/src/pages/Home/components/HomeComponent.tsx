import { Typography, Button, Container, Paper, Grid, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './styles/HomeComponent.module.css';

const HomeComponent = () => {
  return (
    <Container maxWidth="lg" className={styles.container}>
      <Paper elevation={3} className={styles.paper}>
        {/* Hero Section */}
        <Box className={styles.hero}>
          <Typography variant="h2" align="center" gutterBottom className={styles.title}>
            Welcome to RealEstate Manager
          </Typography>
          <Typography variant="h5" align="center" className={styles.subtitle}>
            Manage your properties efficiently with our powerful real estate management tools.
          </Typography>
          <Box className={styles.ctaButtons}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              component={Link}
              to="/login"
              className={styles.button}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              color="primary"
              size="large"
              component={Link}
              to="/register"
              className={styles.button}
            >
              Register
            </Button>
          </Box>
        </Box>

        {/* Features Section */}
        <Box className={styles.features}>
          <Typography variant="h4" align="center" gutterBottom className={styles.sectionTitle}>
            Features
          </Typography>
          <Grid container spacing={4} className={styles.grid}>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} className={styles.featureCard}>
                <Typography variant="h6" gutterBottom>
                  Property Management
                </Typography>
                <Typography variant="body1">
                  Easily add, update, and manage properties with our intuitive interface.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} className={styles.featureCard}>
                <Typography variant="h6" gutterBottom>
                  Tenant Tracking
                </Typography>
                <Typography variant="body1">
                  Keep track of tenants, leases, and payments in one place.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={2} className={styles.featureCard}>
                <Typography variant="h6" gutterBottom>
                  Reporting & Analytics
                </Typography>
                <Typography variant="body1">
                  Generate detailed reports and insights for better decision-making.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Call to Action Section */}
        <Box className={styles.ctaSection}>
          <Typography variant="h4" align="center" gutterBottom className={styles.sectionTitle}>
            Ready to Get Started?
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            component={Link}
            to="/register"
            className={styles.button}
          >
            Sign Up Now
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default HomeComponent;