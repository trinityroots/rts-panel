// import web3 stuff
import { rbacTransparentContractAddress } from 'store/constant';
import { rbacAbi } from 'store/constant';
import { minterRole, burnerRole, adminRole } from 'store/constant';
import { ethers } from "ethers";

import { Grid } from '@mui/material';

import { useState } from 'react';
import { useSelector } from 'react-redux';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { gridSpacing } from 'store/constant';
import { FormGroup, Switch, InputLabel, OutlinedInput, FormControl, Button, FormControlLabel } from '@mui/material'
import AnimateButton from 'ui-component/extended/AnimateButton';

// ==============================|| TYPOGRAPHY ||============================== //

const AccessControl = () => { 
    const [receiverAddress, setReceiverAddress] = useState("");
    const [role, setRole] = useState("");
    const [checkedRevoke, setCheckedRevoke] = useState(false);
    const account = useSelector((state) => state.account);

    const roleMap = {
        burner: burnerRole,
        minter: minterRole,
        admin: adminRole
    };

    const handleAddressChange = (event) => {
        setReceiverAddress(event.target.value);
    }

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    }

    const roleChange = () => {
        if( account.accountAddress ) {
            const provider = new ethers.providers.Web3Provider( window.ethereum );
            const signer = provider.getSigner();
            const rbacContract = new ethers.Contract( rbacTransparentContractAddress, rbacAbi, signer);
            let _role = '';
            if ( role === 'admin' ) {
                _role = roleMap.admin;
            }
            if ( role === 'minter' ) {
                _role = roleMap.minter;
            }
            if ( role === 'burner' ) {
                _role = roleMap.burner;
            }
            if ( checkedRevoke ) {
                if (receiverAddress.toLowerCase() === account.accountAddress.toLowerCase()){
                    rbacContract.erc20RenounceRole(_role, receiverAddress)
                    .then(console.log)
                    .catch((err) => alert(err.data.message));
                }else{
                    rbacContract.erc20RevokeRole(_role, receiverAddress)
                    .then(console.log)
                    .catch((err) => alert(err.data.message));
                }

            }
            else {
                rbacContract.erc20GrantRole(_role, receiverAddress)
                    .then(console.log)
                    .catch((err) => alert(err.data.message));
            }
        }
        else {
            alert("You must first sign in!");
        }

    }

    const handleCheck = (event) => {
        setCheckedRevoke(event.target.checked);
    }

    return (
        <MainCard title="RTS Access Control">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={0} sm={0} md={3} lg={3}/>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    {/* <SubCard title="Modify Roles"> */}
                        <Grid container direction="column" spacing={1}>
                            <Grid item>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-grant-bytes32">Role: admin, burner, minter</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-grant-bytes32"
                                        type="string"
                                        name="grant-bytes-role"
                                        onChange={handleRoleChange}
                                        label="Role: admin, burner, minter"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormControl fullWidth>
                                    <InputLabel htmlFor="outlined-adornment-grant-account">Account Address</InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-grant-account"
                                        type="string"
                                        name="grant-account"
                                        onChange={handleAddressChange}
                                        label="Account Address"
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <FormGroup>
                                    <FormControlLabel control={<Switch   
                                        checked={checkedRevoke}
                                        onChange={handleCheck}
                                        color="primary"/>
                                    } label="Revoke" />
                                </FormGroup>
                            </Grid>
                            <Grid item>
                                <AnimateButton>
                                    <Button
                                        onClick={roleChange}
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
                    {/* </SubCard> */}
                </Grid>
                <Grid item xs={0} sm={0} md={3} lg={3}/>
            </Grid>
        </MainCard>
    );
}

export default AccessControl;
