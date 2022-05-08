import PropTypes from 'prop-types';

import { useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Button, CardActions, CardContent, Divider, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// assets
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

// ==============================|| DASHBOARD DEFAULT - ACTIVITY CARD ||============================== //

const ActivityCard = ({ isLoading }) => {
    const theme = useTheme();
    const event = useSelector((state) => state.event);

    const listRecentTransfers = event.transfer.map((transfer, index) => {
        let backgroundColor = theme.palette.success.light;
        let color = theme.palette.success.dark; 
        let operation = 'Transfer';
        
        if (transfer.to === '0x0000000000000000000000000000000000000000') {
            backgroundColor = theme.palette.orange.light;
            color = theme.palette.orange.dark;
            operation = 'Burn';
        }
        
        return (
            <>
            <Grid container direction="column">
                <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle1" color="inherit">
                                {transfer._to}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Grid container alignItems="center" justifyContent="space-between">
                                <Grid item>
                                    <Typography variant="subtitle1" color="inherit">
                                        {transfer.amount} RTS
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            width: 16,
                                            height: 16,
                                            borderRadius: '5px',
                                            backgroundColor: backgroundColor,
                                            color: {color},
                                            marginLeft: 1.875
                                        }}
                                    >
                                        <KeyboardArrowDownOutlinedIcon fontSize="small" color="inherit" />
                                    </Avatar>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item>
                    <Typography variant="subtitle2" sx={{ color: {color} }}>
                        {operation}
                    </Typography>
                </Grid>
            </Grid>
            <Divider sx={{ my: 1.5 }} />
            </>
        );
    });

    return (
        <>
            {isLoading ? (
                <SkeletonPopularCard />
            ) : (
                <MainCard content={false}>
                    <CardContent>
                        <Grid container spacing={gridSpacing}>
                            <Grid item xs={12}>
                                <Grid container alignContent="center" justifyContent="space-between">
                                    <Grid item>
                                        <Typography variant="h4">Recent Activity</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ height: '25rem', overflow: 'auto' }}>
                                {listRecentTransfers}
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    );
};

ActivityCard.propTypes = {
    isLoading: PropTypes.bool
};

export default ActivityCard;
