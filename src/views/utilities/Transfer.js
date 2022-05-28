// import web3 stuff
import { tokenContractAddress, batchOperationContractAddress } from 'store/constant';
import { tokenAbi, batchOperationAbi } from 'store/constant';
import { ethers } from "ethers";

import { Grid } from '@mui/material';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { InputLabel, OutlinedInput, FormControl, Button, Typography, Link, FormControlLabel, FormGroup, Switch } from '@mui/material'
import AnimateButton from 'ui-component/extended/AnimateButton';

// ==============================|| TYPOGRAPHY ||============================== //

const Transfer = () => {

    const [receiverAddress, setReceiverAddress] = useState("");
    const [transferAmount, setTransferAmount] = useState("");
    const [displayBalance, setDisplayBalance] = useState("-");
    const [displayAllowance, setDisplayAllowance] = useState("-");
    const [checkedBatch, setCheckedBatch] = useState(false);
    const [fileArray, setFileArray] = useState([]);
    const [transactionHash, setTransactionHash] = useState("");
    const [showTransactionHash, setShowTransactionHash] = useState(false);

    const account = useSelector((state) => state.account);
    const event = useSelector((state) => state.event);

    const fileReader = new FileReader();

    const handleAddressChange = (event) => {
        setReceiverAddress(event.target.value);
    }

    const handleAmountChange = (event) => {
        setTransferAmount(event.target.value);
    }

    const isFloat = (n) => {
        return parseFloat(n.match(/^-?\d*(\.\d+)?$/))>=0;
    }

    const createBatchTransfer = (arr) => {
        //prepare float values for transactions
        let arrPrep = arr.map((row) => {
            let rowAmount = ethers.utils.parseUnits(row.Amount, 18);
            return [
                row.From,
                row.To,
                rowAmount
            ];
        });
        return arrPrep
    }

    const sendTransfer = () => {
        if( account.accountAddress ) {
            const provider = new ethers.providers.Web3Provider( window.ethereum );
            const signer = provider.getSigner();
            const tokenContract = new ethers.Contract( tokenContractAddress, tokenAbi, signer);
            const batchContract = new ethers.Contract( batchOperationContractAddress, batchOperationAbi, signer);
            if (checkedBatch) {
                if (fileArray.length) {
                    for (let i = 0; i < fileArray.length; i++) {
                        if ( !isFloat( fileArray[i].Amount ) ){
                            alert("Amount must be a float greater than 0 e.g. 0.01");
                            return false;
                        }          
                    }
                    const batchTransfer = createBatchTransfer(fileArray);
                    batchContract.batchTransfer(batchTransfer)
                        .then((hash) => {
                            setTransactionHash(hash.hash);
                        }) 
                        .catch((err) => alert(err.data.message));
                }
                else {
                    alert('No file uploaded');
                }

            }
            else {
                if ( !isFloat( transferAmount ) ){
                    alert("Input must be a float greater than 0 e.g. 0.01");
                    return false;
                }
                const amount = ethers.utils.parseUnits(transferAmount, 18);
                tokenContract.transfer(receiverAddress, amount)
                    .then((hash) => {
                        setTransactionHash(hash.hash);
                    })  
                    .catch((err) => alert(err.data.message));
            }
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

    const getAllowance = async () => {
        if( account.accountAddress ) {
            const provider = new ethers.providers.Web3Provider( window.ethereum );
            const tokenContract = new ethers.Contract( tokenContractAddress, tokenAbi, provider);
            let _totalAllowance = await tokenContract.allowance(account.accountAddress, batchOperationContractAddress);
            _totalAllowance = ethers.utils.formatEther(_totalAllowance).toString();
            setDisplayAllowance( _totalAllowance );
        }
    }

    const useMax = () => {
        if( account.accountAddress ) {
            setTransferAmount(displayBalance);
        }
    }

    function csvToArray(str, delimiter = ",") {
        // slice from start of text to the first \n index
        // use split to create an array from string by delimiter
        let headers = str.slice(0, str.indexOf("\n")).split(delimiter);
        headers = headers.map((h) => h.replace('\n', '').replace('\r', ''));
  
        // slice from \n index + 1 to the end of the text
        // use split to create an array of each csv value row
        const rows = str.slice(str.indexOf("\n") + 1).split("\n");
  
        // Map the rows
        // split values from each row into an array
        // use headers.reduce to create an object
        // object properties derived from headers:values
        // the object passed as an element of the array
        const arr = rows.map(function (row) {
            const values = row.split(delimiter).map((r) => r.replace('\n', '').replace('\r', ''));
            const el = headers.reduce(function (object, header, index) {
                object[header] = values[index];
                return object;
            }, {});
            return el;
        });
  
        // return the array
        return arr;
    }

    const handleFileUpload = async (e) => {
        fileReader.onload = function(e) { 
            let csvArray = csvToArray(e.target.result);
            csvArray.pop()
            setFileArray(csvArray);
        };
        fileReader.readAsText(e.target.files[0]);
    }

    const handleCheck = (event) => {
        setCheckedBatch(event.target.checked);
    }

    useEffect(() => {
        if ( account.accountAddress ){
            console.log('Calculating Balance');
            getBalance();
            console.log('Calculating Allowance');
            getAllowance();
        } else {
            setDisplayBalance('-');
            setDisplayAllowance('-');
        }
    }, [account.accountAddress, event.transfer]);

    useEffect(() => {
        if ( transactionHash.length ) {
            setShowTransactionHash(true);
        }
    }, [transactionHash]);

    return (
        <MainCard title="Transfer RTS">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={0} sm={0} md={3} lg={3}/>
                <Grid item xs={12} sm={12} md={6} lg={6}>
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
                                    <Typography>Allowance: {displayAllowance} RTS (Batch Transfer)</Typography>
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
                                <input
                                    type="file"
                                    accept={".csv"}
                                    onChange={handleFileUpload}
                                    // hidden
                                />
                            </Grid>
                            <Grid item>
                                <FormGroup>
                                    <FormControlLabel control={<Switch   
                                        checked={checkedBatch}
                                        onChange={handleCheck}
                                        color="primary"/>
                                    } label="Batch" />
                                </FormGroup>
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
                            <Grid item>
                                { showTransactionHash ? 
                                    <>
                                        <Typography>
                                            Transaction Hash: {transactionHash}
                                        </Typography>
                                    </>
                                    : null }
                            </Grid>
                        </Grid>
                    {/* </SubCard> */}
                </Grid>
                <Grid item xs={0} sm={0} md={3} lg={3}/>
            </Grid>
        </MainCard>
    );
}

export default Transfer;
