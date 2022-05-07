// import web3 stuff
import { tokenContractAddress } from 'store/constant';
import { tokenAbi } from 'store/constant';
import { ethers } from "ethers";

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.light,
    overflow: 'hidden',
    position: 'relative',
    '&:after': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(210.04deg, ${theme.palette.primary[200]} -50.94%, rgba(144, 202, 249, 0) 83.49%)`,
        borderRadius: '50%',
        top: -30,
        right: -180
    },
    '&:before': {
        content: '""',
        position: 'absolute',
        width: 210,
        height: 210,
        background: `linear-gradient(140.9deg, ${theme.palette.primary[200]} -14.02%, rgba(144, 202, 249, 0) 77.58%)`,
        borderRadius: '50%',
        top: -160,
        right: -130
    }
}));

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const PercentOwnership = ({ isLoading }) => {
    const theme = useTheme();
    const account = useSelector((state) => state.account);

    const [percentOwnership, setPercentOwnership] = useState("-");

    const getPercentOwnership = async () => {
        const provider = new ethers.providers.Web3Provider( window.ethereum );
        const tokenContract = new ethers.Contract( tokenContractAddress, tokenAbi, provider);
        let _totalBalance = await tokenContract.balanceOf(account.accountAddress);
        let _totalSupply = await tokenContract.totalSupply();
        _totalBalance = parseFloat(ethers.utils.formatEther(_totalBalance).toString());
        _totalSupply = parseFloat(ethers.utils.formatEther(_totalSupply).toString());
        if ( _totalSupply !== 0 ) {
            const _percentOwnership = 100 * (_totalBalance / _totalSupply);
            setPercentOwnership( _percentOwnership.toFixed(2).toString() );
        }
        else {
            setPercentOwnership( '-' );
        }
    }
    
    const initializeListeners = () => {
        const provider = new ethers.providers.Web3Provider( window.ethereum );
        const tokenContract = new ethers.Contract( tokenContractAddress, tokenAbi, provider);
        tokenContract.on("Transfer", async (from, to, amount) => {
            getPercentOwnership();            
        });
    }
    
    useEffect(() => {
        if ( account.accountAddress ){
            getPercentOwnership();
            initializeListeners();
        }
    }, [account.accountAddress]);

    return (
        <>
            {isLoading ? (
                <TotalIncomeCard />
            ) : (
                <CardWrapper border={false} content={false}>
                    <Box sx={{ p: 2 }}>
                        <List sx={{ py: 0 }}>
                            <ListItem alignItems="center" disableGutters sx={{ py: 0 }}>
                                <ListItemAvatar>
                                    <Avatar
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.largeAvatar,
                                            backgroundColor: theme.palette.primary[800],
                                            color: '#fff'
                                        }}
                                    >
                                        <StorefrontTwoToneIcon fontSize="inherit" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45
                                    }}
                                    primary={<Typography variant="h4" sx={{ color: '#fff' }}>{percentOwnership}%</Typography>}
                                    secondary={
                                        <Typography
                                            variant="subtitle2"
                                            sx={{ color: 'primary.light', mt: 0.25 }}
                                        >
                                            Percent Ownership
                                        </Typography>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Box>
                </CardWrapper>
            )}
        </>
    );
};

PercentOwnership.propTypes = {
    isLoading: PropTypes.bool
};

export default PercentOwnership;
