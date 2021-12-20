import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
    homeContainer: {
        padding: theme.spacing(4),
        minHeight: `calc(100% - ${theme.spacing(8)}px)`  
    },
    mapSkeleton: {
        width: '100%',
        height: '50vh',
        margin: `${theme.spacing(15)}px auto`,
        borderRadius: theme.spacing(16)
    },
    mapButtons: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
    mapIndicators: {
        display: 'flex',
        justifyContent: 'space-evenly',
        marginBottom: theme.spacing(2),
        height: theme.spacing(3)
    },
    mapInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        height: theme.spacing(3)
    }
}))