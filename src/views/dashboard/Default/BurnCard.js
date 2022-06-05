// import web3 stuff
import { burnInternalContractAddress } from 'store/constant';
import { burnInternalAbi } from 'store/constant';
import { ethers } from "ethers";

import { Grid } from '@mui/material';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import PropTypes from 'prop-types';

// project imports
import { useTheme } from '@mui/material/styles';
import { CardContent, InputLabel, OutlinedInput, FormControl, Button, Typography, Box, ButtonBase, Avatar } from '@mui/material'
import AnimateButton from 'ui-component/extended/AnimateButton';
import { IconCopy } from '@tabler/icons';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonPopularCard from 'ui-component/cards/Skeleton/PopularCard';
import { gridSpacing } from 'store/constant';

// ==============================|| TYPOGRAPHY ||============================== //

const BurnCard = ({ isLoading }) => {
    const [burnAmount, setBurnAmount] = useState("");
    const account = useSelector((state) => state.account);
    const [transactionHash, setTransactionHash] = useState("");
    const [showTransactionHash, setShowTransactionHash] = useState(false);

    const isFloat = (n) => {
        return parseFloat(n.match(/^-?\d*(\.\d+)?$/))>=0;
    }

    const copyHash = () => {
        navigator.clipboard.writeText(transactionHash).then(function() {
            alert('Copying to clipboard was successful!');
          }, function(err) {
            alert('Could not copy text: ', err);
        });
    }

    const burnToken = () => {
        if( account.accountAddress ) {
            const provider = new ethers.providers.Web3Provider( window.ethereum );
            const signer = provider.getSigner();
            const tokenContract = new ethers.Contract( burnInternalContractAddress, burnInternalAbi, signer);
            if ( !isFloat( burnAmount ) ){
                alert("Input must be a float greater than 0 e.g. 0.01");
                return false;
            }
            const amount = ethers.utils.parseUnits(burnAmount, 18);
            tokenContract.burn(amount)
                .then((hash) => {
                    setTransactionHash(hash.hash);
                }) 
                .catch((err) => alert(err.data.message));
        }
        else {
            alert("You must first sign in!");
        }

    }

    const handleAmountChange = (event) => {
        setBurnAmount(event.target.value);
    }

    useEffect(() => {
        if ( transactionHash.length ) {
            setShowTransactionHash(true);
        }
    }, [transactionHash]);

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
                                        <Typography variant="h4">Burn Tokens</Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sx={{ height: '25rem', overflow: 'auto' }}>
                                <Grid container direction="column" spacing={gridSpacing}>
                                    <Grid item>
                                        <FormControl fullWidth>
                                            <InputLabel htmlFor="outlined-adornment-burn-token-amount">Amount</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-burn-token-amount"
                                                type="string"
                                                name="burn-token-amount"
                                                label="Amount"
                                                onChange={handleAmountChange}
                                            />
                                        </FormControl>
                                    </Grid>
                                    <Grid item>
                                        <AnimateButton>
                                            <Button
                                                disableElevation
                                                fullWidth
                                                size="large"
                                                type="submit"
                                                variant="contained"
                                                color="secondary"
                                                onClick={burnToken}
                                            >
                                                Burn
                                            </Button>
                                        </AnimateButton>
                                    </Grid>
                                    <Grid item>
                                        { showTransactionHash ? 
                                            <>
                                                Transaction Hash: <IconCopy onClick={copyHash} stroke={1.5} size="1.3rem" />
                                            </>
                                            : null }
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </MainCard>
            )}
        </>
    );
}

BurnCard.propTypes = {
    isLoading: PropTypes.bool
};

export default BurnCard;