import { alpha, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
            alignItems: 'center'
        },
    },
    search: {
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0.5, 0.5),
        color: 'inherit'
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        marginLeft: theme.spacing(1),
        flex: 1,
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    infoSection: {
        marginRight: theme.spacing(3),
        display: 'flex'
    },
    sectionIcon: {
        marginRight: theme.spacing(1)
    },
    container: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3)
    }
}))