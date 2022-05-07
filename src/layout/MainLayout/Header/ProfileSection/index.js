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

    //create text for sign in button
    const createButtonText = (account) => {
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
        return text;
    }

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
        const buttonText = createButtonText( account );
        setConnectButtonText( buttonText );
        setAccountAddress( account );

        //add event listener for account change
        window.ethereum.on('accountsChanged', function (accounts) {
            const account = accounts[0];
            const buttonText = createButtonText( account );
            setConnectButtonText( buttonText );
            setAccountAddress( account );
        });
        //add event listener for network change
        // window.ethereum.on('networkChanged', function (networkId) {
        //     // Time to reload your interface with the new networkId
        // })
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
