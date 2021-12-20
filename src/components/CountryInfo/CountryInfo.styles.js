import { makeStyles } from "@material-ui/core";
import { red } from '@material-ui/core/colors';

export const useStyles = makeStyles((theme) => ({
    avatar: {
        backgroundColor: red[500], 
    },
    logo: {
        height: theme.spacing(50),
        width: '100%',
        backgroundSize: 'contain'
    },
    textSkeleton: {
        width: '150px'
    },
    info: {
        margin: `${theme.spacing(1)}px auto`,
        display: 'flex',
        justifyContent: 'space-between'
    }
}))