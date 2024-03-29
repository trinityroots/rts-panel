// import web3 stuff
import { tokenContractAddress, tokenExplorer } from 'store/constant';
import { tokenAbi } from 'store/constant';
import { ethers } from "ethers";

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Link, Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import TotalIncomeCard from 'ui-component/cards/Skeleton/TotalIncomeCard';

// assets
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';

// styles
const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.dark.main,
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

// ==============================|| DASHBOARD - TOTAL INCOME DARK CARD ||============================== //

const YourBalance = ({ isLoading }) => {
    const theme = useTheme();

    const account = useSelector((state) => state.account);
    const event = useSelector((state) => state.event)

    const [accountBalance, setAccountBalance] = useState('-');

    const getBalance = async () => {
        const provider = new ethers.providers.Web3Provider( window.ethereum );
        const tokenContract = new ethers.Contract( tokenContractAddress, tokenAbi, provider);
        let _totalBalance = await tokenContract.balanceOf(account.accountAddress);
        _totalBalance = ethers.utils.formatEther(_totalBalance).toString();
        setAccountBalance( _totalBalance );
    }
    
    useEffect(() => {
        if ( account.accountAddress ){
            console.log('Calculating Balance');
            getBalance();
        } else {
            setAccountBalance('-');
        }
    }, [account.accountAddress, event.transfer]);

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
                                        target="_blank" 
                                        component={Link} 
                                        href={tokenExplorer + tokenContractAddress + '?a=' + account.accountAddress}
                                        variant="rounded"
                                        sx={{
                                            ...theme.typography.commonAvatar,
                                            ...theme.typography.largeAvatar,
                                            backgroundColor: theme.palette.primary[800],
                                            color: '#fff'
                                        }}
                                    >
                                        <TableChartOutlinedIcon fontSize="inherit" />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    sx={{
                                        py: 0,
                                        mt: 0.45,
                                        mb: 0.45
                                    }}
                                    primary={
                                        <Typography variant="h4" sx={{ color: '#fff' }}>
                                            {accountBalance} RTS
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="subtitle2" sx={{ color: 'primary.light', mt: 0.25 }}>
                                            Your Balance
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

YourBalance.propTypes = {
    isLoading: PropTypes.bool
};

export default YourBalance;
