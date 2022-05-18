import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from "@mui/material";
import { SET_ACCOUNT_ADDRESS, SET_ACCOUNT_BUTTON_TEXT } from 'store/actionsAccount';
import { networkId } from 'store/constant';


const ProfileSection = () => {

    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);
    const [accountAddress, setAccountAddress] = useState(account.accountAddress);
    const [connectButtonText, setConnectButtonText] = useState(account.accountButtonText);

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

    useEffect(() => {
        dispatch({ type: SET_ACCOUNT_ADDRESS, accountAddress });
        if ( accountAddress !== null ) {
            const buttonText = createButtonText(accountAddress);
            dispatch({ type: SET_ACCOUNT_BUTTON_TEXT, buttonText });
        } 
        else {
            const buttonText = 'Sign In';
            dispatch({ type: SET_ACCOUNT_BUTTON_TEXT, buttonText });
        }
    }, [dispatch, accountAddress]);

    useEffect(() => {
        setConnectButtonText(account.accountButtonText);
    }, [account.accountButtonText])

    //Connect Account Function
    async function connectAccount() {
        if (window.ethereum.networkVersion !== networkId){
            if (!window.ethereum.networkVersion) {
                logout();
                alert('Ensure that you are logged into MetaMask then try refreshing to page to sign in again');
                return false;
            }
            alert(`You must switch to the correct network! Network ID: ${networkId}`)
            return false;
        }
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        const account = accounts[0];
        const buttonText = createButtonText(account);
        setConnectButtonText( buttonText );
        setAccountAddress( account );

        //add event listener for account change
        window.ethereum.on('accountsChanged', function (accounts) {
            const account = accounts[0];
            const buttonText = createButtonText(account);
            setConnectButtonText( buttonText );
            setAccountAddress( account );
        });
        //add event listener for network change
        window.ethereum.on('networkChanged', function (networkId) {
            logout();
        })
    }

    const logout = () => {
        setAccountAddress( null );
    }

    async function auth () {
        if (typeof window.ethereum !== "undefined") {
            console.log("Injected Web3 Wallet is installed!");
        }else{
            alert("You must install metamask!");
            return false;
        }
        
        if (accountAddress === null){
            await connectAccount();
        }
        else {
            logout();
        }
    }
    
    return (
        <>
            <Button
                color="primary"
                variant="outlined"
                onClick={auth}
            >
                {connectButtonText}
            </Button>
        </>
    );
};

export default ProfileSection;
