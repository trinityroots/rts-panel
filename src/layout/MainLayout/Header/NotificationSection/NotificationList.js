// material-ui
import { useTheme, styled } from '@mui/material/styles';

import {
    Avatar,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemSecondaryAction,
    ListItemText,
    Stack,
    Typography
} from '@mui/material';

// assets
import { IconBrandTelegram, IconBuildingStore, IconSend, IconPhoto } from '@tabler/icons';
// import User1 from 'assets/images/users/user-round.svg';

import { useSelector } from 'react-redux';

// styles
const ListItemWrapper = styled('div')(({ theme }) => ({
    cursor: 'pointer',
    padding: 16,
    '&:hover': {
        background: theme.palette.primary.light
    },
    '& .MuiListItem-root': {
        padding: 0
    }
}));

// ==============================|| NOTIFICATION LIST ITEM ||============================== //

const NotificationList = () => {
    const theme = useTheme();

    const event = useSelector((state) => state.event);
    const account = useSelector((state) => state.account);

    const chipSX = {
        height: 24,
        padding: '0 6px'
    };
    const chipErrorSX = {
        ...chipSX,
        color: theme.palette.orange.dark,
        backgroundColor: theme.palette.orange.light,
        marginRight: '5px'
    };

    const chipWarningSX = {
        ...chipSX,
        color: theme.palette.warning.dark,
        backgroundColor: theme.palette.warning.light
    };

    const chipSuccessSX = {
        ...chipSX,
        color: theme.palette.success.dark,
        backgroundColor: theme.palette.success.light,
        height: 28
    };

    const listNotifications = event.notification.map((transfer, index) => {

            return (
                <>
                    <ListItemWrapper>
                        <ListItem alignItems="center">
                            <ListItemAvatar>
                                <Avatar
                                    sx={{
                                        color: theme.palette.primary.dark,
                                        backgroundColor: theme.palette.primary.light,
                                        border: 'none',
                                        borderColor: theme.palette.primary.main
                                    }}
                                >
                                    <IconSend stroke={1.5} size="1.3rem" />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={<Typography variant="subtitle1">New Transfer from {transfer._from}</Typography>} />
                        </ListItem>
                        <Grid container direction="column" className="list-container">
                            <Grid item xs={12} sx={{ pb: 2 }}>
                                <Typography variant="subtitle2">{transfer._from} sent you {transfer.amount} RTS</Typography>
                            </Grid>
                        </Grid>
                    </ListItemWrapper>
                    <Divider />
                </>
            );
    });

    return (
        <List
            sx={{
                width: '100%',
                maxWidth: 330,
                py: 0,
                borderRadius: '10px',
                [theme.breakpoints.down('md')]: {
                    maxWidth: 300
                },
                '& .MuiListItemSecondaryAction-root': {
                    top: 22
                },
                '& .MuiDivider-root': {
                    my: 0
                },
                '& .list-container': {
                    pl: 7
                }
            }}
        >
            {listNotifications}
        </List>
    );
};

export default NotificationList;
