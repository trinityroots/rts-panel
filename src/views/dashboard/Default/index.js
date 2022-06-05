import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import YourBalance from './YourBalance';
import TotalSupply from './TotalSupply';
import PercentOwnership from './PercentOwnership';
import ActivityCard from './ActivityCard';
import RolesCard from './RolesCard';
import BurnCard from './BurnCard';
import { gridSpacing } from 'store/constant';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <YourBalance isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <TotalSupply isLoading={isLoading} />
                    </Grid>
                    <Grid item lg={4} md={12} sm={12} xs={12}>
                        <PercentOwnership isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12} sm={12} md={4}>
                        <BurnCard isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <ActivityCard isLoading={isLoading} />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <RolesCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Dashboard;
