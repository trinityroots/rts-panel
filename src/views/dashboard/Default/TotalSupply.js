// import web3 stuff
import { tokenContractAddress } from 'store/constant';
import { tokenAbi } from 'store/constant';
import { ethers } from "ethers";

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

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

// ==============================|| DASHBOARD - TOTAL INCOME LIGHT CARD ||============================== //

const TotalSupply = ({ isLoading }) => {
    const theme = useTheme();

    const [totalSupply, setTotalSupply] = useState("");
    const event = useSelector((state) => state.event);
    const account = useSelector((state) => state.account);

    const getTotalSupply = async () => {
        if (typeof window.ethereum !== "undefined") {
            const provider = new ethers.providers.Web3Provider( window.ethereum );
            const tokenContract = new ethers.Contract( tokenContractAddress, tokenAbi, provider);
            let _totalSupply = await tokenContract.totalSupply();
            _totalSupply = ethers.utils.formatEther(_totalSupply).toString();
            setTotalSupply(_totalSupply);
        }
    }
    
    useEffect(() => {
        console.log('Calculating Total Supply');
        getTotalSupply();
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
                                    primary={<Typography variant="h4">{totalSupply} RTS</Typography>}
                                    secondary={
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                color: theme.palette.grey[500],
                                                mt: 0.5
                                            }}
                                        >
                                            Total Supply
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

TotalSupply.propTypes = {
    isLoading: PropTypes.bool
};

export default TotalSupply;
