import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@mui/material";
import { SET_ACCOUNT_ADDRESS } from 'store/actionsAccount';


const ProfileSection = () => {

    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);
    const [accountAddress, setAccountAddress] = useState(account.accountAddress);
    const [connectButtonText, setConnectButtonText] = useState("Sign In");

    useEffect(() => {
        dispatch({ type: SET_ACCOUNT_ADDRESS, accountAddress });
    }, [dispatch, accountAddress]);

    //Connect Account Function
    async function connectAccount() {
        if (typeof window.ethereum !== "undefined") {
            console.log("Injected Web3 Wallet is installed!");
        }else{
            alert("You must install metamask!");
        }
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const account = accounts[0];
        const text =
            account[0] +
            account[1] +
            account[2] +
            account[3] +
            account[4] +
            account[5] +
            "..." +
            account[38] +
            account[39] +
            account[40] +
            account[41];
        setConnectButtonText( text );
        setAccountAddress( account );
    }
    
    return (
        <>
            <Button
                color="secondary"
                variant="outlined"
                onClick={connectAccount}
            >
                {connectButtonText}
            </Button>
        </>
    );
};

export default ProfileSection;
