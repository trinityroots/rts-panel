// import web3 stuff
import { tokenContractAddress } from 'store/constant';
import { tokenAbi } from 'store/constant';
import { ethers } from "ethers";

import { Grid } from '@mui/material';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { InputLabel, OutlinedInput, FormControl, Button, Typography, Link } from '@mui/material'
import AnimateButton from 'ui-component/extended/AnimateButton';

// ==============================|| TYPOGRAPHY ||============================== //

const Transfer = () => {

    const [receiverAddress, setReceiverAddress] = useState("");
    const [transferAmount, setTransferAmount] = useState("");
    const [displayBalance, setDisplayBalance] = useState("-");
    const account = useSelector((state) => state.account);
    const event = useSelector((state) => state.event);

    const handleAddressChange = (event) => {
        setReceiverAddress(event.target.value);
    }

    const handleAmountChange = (event) => {
        console.log(event);
        setTransferAmount(event.target.value);
    }

    const isFloat = (n) => {
        return parseFloat(n.match(/^-?\d*(\.\d+)?$/))>=0;
    }

    const sendTransfer = () => {
        if( account.accountAddress ) {
            const provider = new ethers.providers.Web3Provider( window.ethereum );
            const signer = provider.getSigner();
            const tokenContract = new ethers.Contract( tokenContractAddress, tokenAbi, signer);
            if ( !isFloat( transferAmount ) ){
                alert("Input must be a float greater than 0 e.g. 0.01");
                return false;
            }
            const amount = ethers.utils.parseUnits(transferAmount, 18);
            tokenContract.transfer(receiverAddress, amount)
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
            setDisplayBalance(_totalBalance );
        }
    }

    const useMax = () => {
        if( account.accountAddress ) {
            setTransferAmount(displayBalance);
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
        <MainCard title="Transfer RTS">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={0} sm={0} md={4} lg={4}/>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    {/* <SubCard title="Transfer"> */}
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-transfer-account">Account Address</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-transfer-account"
                                        type="string"
                                        name="transfer-account"
                                        onChange={handleAddressChange}
                                        label="Account Address"
                                        value={receiverAddress}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                    <Typography>Balance: {displayBalance} RTS <Link onClick={useMax}>Use Max</Link></Typography>
                            </Grid>
                            <Grid item>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-transfer-amount">Amount</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-transfer-amount"
                                        type="string"
                                        name="transfer-amount"
                                        onChange={handleAmountChange}
                                        label="Amount"
                                        value={transferAmount}
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
                                        onClick={sendTransfer}
                                    >
                                        Send
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

export default Transfer;
