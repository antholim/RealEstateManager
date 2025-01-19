import styles from './styles/MyBuilding.module.css';
import { Button } from '@mui/material';

function MyBuilding() {
    return (
        <div>
            <h1>My Building</h1>
            <Button
                variant="contained"
                color="primary"
                fullWidth
                size="large" // Adjust button size
                style={{ marginTop: '16px' }}
                sx={{ width: '250px' }}>Create new building
            </Button>
            <div className={styles.buildingCard}>asd</div>
        </div>
    );
}

export default MyBuilding;