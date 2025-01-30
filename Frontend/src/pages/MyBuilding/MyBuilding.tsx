import { useState } from 'react';
import styles from './styles/MyBuilding.module.css';
import { Button } from '@mui/material';
import CreateBuilding from '../CreateBuilding/CreateBuilding';

function MyBuilding() {
    const [showCreateBuilding, setShowCreateBuilding] = useState(false);
    return (
        <div>
            <h1>My Building</h1>
            <Button
                onClick={
                    ()=> {
                        setShowCreateBuilding(()=>true);
                    }
                }
                variant="contained"
                color="primary"
                fullWidth
                size="large" // Adjust button size
                style={{ marginTop: '16px' }}
                sx={{ width: '250px' }}>Create new building
            </Button>
            {showCreateBuilding && <CreateBuilding/>}
            <div className={styles.buildingCard}>asd</div>
        </div>
    );
}

export default MyBuilding;