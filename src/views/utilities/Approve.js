// import web3 stuff
import { tokenContractAddress } from 'store/constant';
import { tokenAbi } from 'store/constant';
import { ethers } from "ethers";

import { Grid } from '@mui/material';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { Typography, InputLabel, OutlinedInput, FormControl, Button, FormControlLabel } from '@mui/material'
import AnimateButton from 'ui-component/extended/AnimateButton';

// ==============================|| TYPOGRAPHY ||============================== //

const Approve = () => { 
    const [spenderAddress, setSpenderAddress] = useState("");
    const [spenderAmount, setSpenderAmount] = useState("");
    const [displayBalance, setDisplayBalance] = useState("-");
    const account = useSelector((state) => state.account);
    const event = useSelector((state) => state.event);

    const handleAddressChange = (event) => {
        setSpenderAddress(event.target.value);
    }

    const handleAmountChange = (event) => {
        setSpenderAmount(event.target.value);
    }

    const isFloat = (n) => {
        return parseFloat(n.match(/^-?\d*(\.\d+)?$/))>=0;
    }

    const approval = () => {
        if( account.accountAddress ) {
            const provider = new ethers.providers.Web3Provider( window.ethereum );
            const signer = provider.getSigner();
            const tokenContract = new ethers.Contract( tokenContractAddress, tokenAbi, signer);
            if ( !isFloat( spenderAmount ) ){
                alert("Input must be a float greater than 0 e.g. 0.01");
                return false;
            }
            tokenContract.approve(spenderAddress, spenderAmount)
                .then(console.log)
                .catch((err) => alert(err.data.message));
        }
        else {
            alert("You must first sign in!");
        }

    }

    const getBalance = async () => {
        if( account.accountAddress ) {
            const provider = new ethers.providers.Web3Provider( window.ethereum );
            const tokenContract = new ethers.Contract( tokenContractAddress, tokenAbi, provider);
            let _totalBalance = await tokenContract.balanceOf(account.accountAddress);
            _totalBalance = ethers.utils.formatEther(_totalBalance).toString();
            setDisplayBalance(_totalBalance + ' RTS' );
        }
    }

    useEffect(() => {
        if ( account.accountAddress ){
            console.log('Calculating Balance');
            getBalance();
        } else {
            setDisplayBalance('-');
        }
    }, [account.accountAddress, event.transfer]);

    return (
        <MainCard title="Approvals">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={0} sm={0} md={4} lg={4}/>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    {/* <SubCard title="Modify Roles"> */}
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-approve-spender">Spender Address</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-approve-spender"
                                        type="string"
                                        name="approve-spender"
                                        onChange={handleAddressChange}
                                        label="Spender Address"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-approve-amount">Amount</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-approve-amount"
                                        type="string"
                                        name="approve-amount"
                                        onChange={handleAmountChange}
                                        label="Amount"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <Typography>Balance: {displayBalance}</Typography>
                            </Grid>
                            <Grid item>
                                <AnimateButton>
                                    <Button
                                        onClick={approval}
                                        disableElevation
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Approve
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    {/* </SubCard> */}
                </Grid>
                <Grid item xs={0} sm={0} md={4} lg={4}/>
            </Grid>
        </MainCard>
    );
}

export default Approve;
