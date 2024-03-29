// import web3 stuff
import { tokenContractAddress } from 'store/constant';
import { tokenAbi } from 'store/constant';
import { ethers } from "ethers";

import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { SET_NEW_TRANSFER, SET_NEW_NOTIFICATION, CLEAR_ALL_NOTIFICATION } from 'store/actionsEvent';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Avatar,
    Box,
    Button,
    ButtonBase,
    CardActions,
    Chip,
    ClickAwayListener,
    Divider,
    Grid,
    Paper,
    Popper,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    Badge
} from '@mui/material';

// third-party
import PerfectScrollbar from 'react-perfect-scrollbar';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import Transitions from 'ui-component/extended/Transitions';
import NotificationList from './NotificationList';

// assets
import { IconBell } from '@tabler/icons';

// ==============================|| NOTIFICATION ||============================== //

const NotificationSection = () => {
    const theme = useTheme();

    const dispatch = useDispatch();
    const account = useSelector((state) => state.account);
    const event = useSelector((state) => state.event);

    const [newTransfer, setNewTransfer] = useState(event.transfer);
    const [tokenContract, setTokenContract] = useState(null);
    const [invisible, setInvisible] = useState(true);
    const invisibleRef = useRef();
    invisibleRef.current = invisible;

    const transferCallback = async (from, to, amount) => {
        const time = new Date().getTime();
        console.log('New transfer event on:' + time);
        const _from =
            from[0] +
            from[1] +
            from[2] +
            from[3] +
            from[4] +
            from[5] +
            "..." +
            from[38] +
            from[39] +
            from[40] +
            from[41];
        const _to =
            to[0] +
            to[1] +
            to[2] +
            to[3] +
            to[4] +
            to[5] +
            "..." +
            to[38] +
            to[39] +
            to[40] +
            to[41];
        setNewTransfer({
            from: from,
            to: to,
            _from:_from, 
            _to:_to, 
            amount:parseFloat(ethers.utils.formatEther(amount).toString()), 
            time:time
        });
    }
    
    const initializeListeners = () => {
        const provider = new ethers.providers.Web3Provider( window.ethereum );
        setTokenContract(new ethers.Contract( tokenContractAddress, tokenAbi, provider ));
    }

    useEffect(() => {
        dispatch({ type: SET_NEW_TRANSFER, newTransfer });
        if (!(newTransfer instanceof Array)){
            if (newTransfer.to.toLowerCase() === account.accountAddress.toLowerCase()){
                dispatch({ type: SET_NEW_NOTIFICATION, newTransfer });
                if (invisibleRef.current) {
                    handleBadgeVisibility();
                }
            }
        } 
    }, [dispatch, newTransfer]);
    
    useEffect(() => {
        if ( account.accountAddress && !tokenContract){
            initializeListeners();
        }
    }, [account.accountAddress, tokenContract]);

    useEffect(() => {
        if ( account.accountAddress && tokenContract){
            tokenContract.on("Transfer", transferCallback);
        }
    }, [tokenContract]);

    const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('');
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);

    const handleToggle = () => {
        if (event.notification.length){
            setOpen((prevOpen) => !prevOpen);
            setInvisible(true);
        }
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setOpen(false);
    };

    const prevOpen = useRef(open);
    useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }
        prevOpen.current = open;
    }, [open]);

    const handleChange = (event) => {
        if (event?.target.value) setValue(event?.target.value);
    };

    const handleBadgeVisibility = () => {
        setInvisible(!invisible);
    };

    const clearNotification = () => {
        const emptyTransfer = [];
        dispatch({ type: CLEAR_ALL_NOTIFICATION, emptyTransfer });
        setOpen((prevOpen) => !prevOpen);
    };

    return (
        <>
            <Box
                sx={{
                    ml: 2,
                    mr: 3,
                    [theme.breakpoints.down('md')]: {
                        mr: 2
                    }
                }}
            >
                <ButtonBase sx={{ borderRadius: '12px' }}>
                <Badge
                    color="primary" 
                    badgeContent=" "
                    variant="dot"
                    invisible={invisible}
                >
                    <Avatar
                        variant="rounded"
                        sx={{
                            ...theme.typography.commonAvatar,
                            ...theme.typography.mediumAvatar,
                            transition: 'all .2s ease-in-out',
                            background: theme.palette.dark.main,
                            color: '#ffc107',
                            '&[aria-controls="menu-list-grow"],&:hover': {
                                background: '#ffc107',
                                color: theme.palette.dark.main
                            }
                        }}
                        ref={anchorRef}
                        aria-controls={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={handleToggle}
                        color="inherit"
                    >
                        <IconBell stroke={1.5} size="1.3rem" />
                    </Avatar>
                </Badge>
                </ButtonBase>
            </Box>
            <Popper
                placement={matchesXs ? 'bottom' : 'bottom-end'}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [matchesXs ? 5 : 0, 20]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                                    <Grid container direction="column" spacing={2}>
                                        <Grid item xs={12}>
                                            <Grid container alignItems="center" justifyContent="space-between" sx={{ pt: 2, px: 2 }}>
                                                <Grid item>
                                                    <Stack direction="row" spacing={2}>
                                                        <Typography variant="subtitle1">All Notifications</Typography>
                                                    </Stack>
                                                </Grid>
                                                <Grid item>
                                                    <Typography onClick={clearNotification} variant="subtitle2" color="primary">
                                                        Clear All
                                                    </Typography>
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <PerfectScrollbar
                                                style={{ height: '100%', maxHeight: 'calc(100vh - 205px)', overflowX: 'hidden' }}
                                            >
                                                <Grid container direction="column" spacing={2}>
                                                    <Grid item xs={12} p={0}>
                                                        <Divider sx={{ my: 0 }} />
                                                    </Grid>
                                                </Grid>
                                                <NotificationList />
                                            </PerfectScrollbar>
                                        </Grid>
                                    </Grid>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};

export default NotificationSection;
