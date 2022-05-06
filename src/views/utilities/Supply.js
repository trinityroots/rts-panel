// import web3 stuff
import { tokenContractAddress } from 'store/constant';
import { tokenAbi } from 'store/constant';
import { ethers } from "ethers";

import { Grid } from '@mui/material';

import { useState } from 'react';
import { useSelector } from 'react-redux';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { FormGroup, Switch, InputLabel, OutlinedInput, FormControl, Button, FormControlLabel } from '@mui/material'
import AnimateButton from 'ui-component/extended/AnimateButton';

// ==============================|| TYPOGRAPHY ||============================== //

const Supply = () => {
    const [receiverAddress, setReceiverAddress] = useState("");
    const [mintAmount, setMintAmount] = useState("");
    const [checkedBurn, setCheckedBurn] = useState(false);
    const account = useSelector((state) => state.account);

    const handleAddressChange = (event) => {
        setReceiverAddress(event.target.value);
    }

    const handleAmountChange = (event) => {
        setMintAmount(event.target.value);
    }

    const isFloat = (n) => {
        return parseFloat(n.match(/^-?\d*(\.\d+)?$/))>=0;
    }

    const mintToken = () => {
        if( account.accountAddress ) {
            const provider = new ethers.providers.Web3Provider( window.ethereum );
            const signer = provider.getSigner();
            const tokenContract = new ethers.Contract( tokenContractAddress, tokenAbi, signer);
            if ( !isFloat( mintAmount ) ){
                alert("Input must be a float greater than 0 e.g. 0.01");
                return false;
            }
            const amount = ethers.utils.parseUnits(mintAmount, 18);
            if ( checkedBurn ) {
                tokenContract.burn(receiverAddress, amount)
                    .then(console.log)
                    .catch((err) => alert(err.data.message));
            }
            else {
                tokenContract.mint(receiverAddress, amount)
                    .then(console.log)
                    .catch((err) => alert(err.data.message));
            }
        }
        else {
            alert("You must first sign in!");
        }

    }

    const handleCheck = (event) => {
        setCheckedBurn(event.target.checked);
    }

    return (
        <MainCard title="RTS Supply Control">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={0} sm={0} md={4} lg={4}/>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <SubCard title="Modify Supply">
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-supply-account">Account Address</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-supply-account"
                                        type="string"
                                        name="supply-account"
                                        onChange={handleAddressChange}
                                        label="Account Address"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-supply-amount">Amount</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-supply-amount"
                                        type="string"
                                        name="supply-amount"
                                        onChange={handleAmountChange}
                                        label="Amount"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormGroup>
                                    <FormControlLabel control={<Switch   
                                        checked={checkedBurn}
                                        onChange={handleCheck}
                                        color="secondary"/>
                                    } label="Burn" />
                                </FormGroup>
                            </Grid>
                            <Grid item>
                                <AnimateButton>
                                    <Button
                                        onClick={mintToken}
                                        disableElevation
                                        fullWidth
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="secondary"
                                    >
                                        Execute
                                    </Button>
                                </AnimateButton>
                            </Grid>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={0} sm={0} md={4} lg={4}/>
            </Grid>
        </MainCard>
    );
}

export default Supply;
