import { useState, useRef, useEffect } from 'react';
import { Button } from "@mui/material";


const ProfileSection = () => {

    const [connectButtonText, setConnectButtonText] = useState("Sign In");

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
    }
    
    return (
        <>
            <Button
                color="secondary"
                onClick={connectAccount}
            >
                {connectButtonText}
            </Button>
        </>
    );
};

export default ProfileSection;
