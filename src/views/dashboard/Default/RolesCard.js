import { rbacTransparentContractAddress } from 'store/constant';
import { rbacAbi } from 'store/constant';
import { minterRole, burnerRole, adminRole } from 'store/constant';
import { ethers } from "ethers";

import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import { useSelector} from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { CardContent, Divider, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// ==============================|| DASHBOARD DEFAULT - ROLES CARD ||============================== //

const RolesCard = ({ isLoading }) => {
    const theme = useTheme();
    const [admins, setAdmins] = useState([]);
    const [minters, setMinters] = useState([]);
    const [burners, setBurners] = useState([]);

    const getRoles = async () => {
        const provider = new ethers.providers.Web3Provider( window.ethereum );
        const signer = provider.getSigner();
        const rbacContract = new ethers.Contract( rbacTransparentContractAddress, rbacAbi, signer);
        
        let admins = await rbacContract.getRoleList(adminRole);
        let minters = await rbacContract.getRoleList(minterRole);
        let burners = await rbacContract.getRoleList(burnerRole);
        
        setAdmins(admins);
        setMinters(minters);
        setBurners(burners);
    }

    useEffect(() => {
        console.log('Getting Roles');
        getRoles();
    }, []);

    const listAdmins = admins.map((admin, index) => {
        let color = theme.palette.success.dark;
        
        return (
            <>
            <Grid container direction="column">
                <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle2" color="inherit">
                                {admin}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider sx={{ my: 1.5 }} />
            </>
        );
    });

    const listMinters = minters.map((minter, index) => {
        let color = theme.palette.success.dark;
        
        return (
            <>
            <Grid container direction="column">
                <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle2" color="inherit">
                                {minter}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
            <Divider sx={{ my: 1.5 }} />
            </>
        );
    });

    const listBurners = burners.map((burner, index) => {
        let color = theme.palette.success.dark;
        
        return (
            <>
            <Grid container direction="column">
                <Grid item>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Typography variant="subtitle2" color="inherit">
                                {burner}
                            </Typography>
                        </Grid>
                    </Grid>
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
                                        <Typography variant="h4">Roles</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ height: '25rem', overflow: 'auto' }}>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    Administrators
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 1.5 }} />
                                <Grid item xs={12}>
                                    {listAdmins}
                                </Grid>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    Minters
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 1.5 }} />
                                <Grid item xs={12}>
                                    {listMinters}
                                </Grid>
                                <Grid container direction="column">
                                    <Grid item>
                                        <Grid container alignItems="center" justifyContent="space-between">
                                            <Grid item>
                                                <Typography variant="subtitle1" color="inherit">
                                                    Burners
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ my: 1.5 }} />
                                <Grid item xs={12}>
                                    {listBurners}
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    );
};

RolesCard.propTypes = {
    isLoading: PropTypes.bool
};

export default RolesCard;
