import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AppBar, IconButton, InputBase, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import MoreIcon from '@material-ui/icons/MoreVert'
import SearchIcon from '@material-ui/icons/Search'
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import AirlineSeatIndividualSuiteIcon from '@material-ui/icons/AirlineSeatIndividualSuite';
import SignalCellularConnectedNoInternet0BarIcon from '@material-ui/icons/SignalCellularConnectedNoInternet0Bar';

import { useStyles } from './AppLayout.styles'

const AppLayout = (props) => {
    const { country, casesInfo, emptyCountryInfo } = props;

    const classes = useStyles();
    const navigate = useNavigate();

    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
    const [newCountry, setNewCountry] = useState('')

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };
    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const mobileMenuId = 'primary-search-country-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <Typography className={classes.infoSection}>
                    Población: <b style={{marginLeft: '8px'}}>{casesInfo && casesInfo.population}</b>
                </Typography>
            </MenuItem>
            <MenuItem>
                <Typography className={classes.infoSection}>
                    <AirlineSeatIndividualSuiteIcon className={classes.sectionIcon} />
                    {casesInfo && casesInfo.confirmed}
                </Typography>
            </MenuItem>
            <MenuItem>
                <Typography className={classes.infoSection}>
                    <DirectionsRunIcon className={classes.sectionIcon} />
                    {casesInfo && casesInfo.recovered}
                </Typography>
            </MenuItem>
            <MenuItem>
                <Typography className={classes.infoSection}>
                    <SignalCellularConnectedNoInternet0BarIcon className={classes.sectionIcon} />
                    {casesInfo && casesInfo.deaths}
                </Typography>
            </MenuItem>
        </Menu >
    )

    return (
        <>
            <div className={classes.grow}>
                <AppBar position='static' color='secondary'>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="inherit"
                            aria-label="open drawer"
                            onClick={() => navigate('/')}
                        >
                            <HomeIcon />
                        </IconButton>
                        <Typography className={classes.title} variant='h6' noWrap>
                            COVID 19 {country ? `- ${country}` : ''}
                        </Typography>
                        <div className={classes.search}>
                            <InputBase
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                placeholder="Buscar por país..."
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={(e) => setNewCountry(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        emptyCountryInfo()
                                        navigate(`/country/${newCountry}`)
                                        setNewCountry('')
                                    }
                                }}
                                value={newCountry}
                            />
                            <IconButton
                                className={classes.searchIcon}
                                onClick={() => {
                                    emptyCountryInfo()
                                    navigate(`/country/${newCountry}`)
                                    setNewCountry('')
                                }}

                            >
                                <SearchIcon />
                            </IconButton>
                        </div>
                        <div className={classes.grow} />
                        <div className={classes.sectionDesktop}>
                            <Typography className={classes.infoSection}>
                                <AirlineSeatIndividualSuiteIcon className={classes.sectionIcon} />
                                {casesInfo && casesInfo.confirmed}
                            </Typography>
                            <Typography className={classes.infoSection}>
                                <DirectionsRunIcon className={classes.sectionIcon} />
                                {casesInfo && casesInfo.recovered}
                            </Typography>
                            <Typography className={classes.infoSection}>
                                <SignalCellularConnectedNoInternet0BarIcon className={classes.sectionIcon} />
                                {casesInfo && casesInfo.deaths}
                            </Typography>
                        </div>
                        <div className={classes.sectionMobile}>
                            <IconButton
                                aria-label="show more"
                                aria-controls={mobileMenuId}
                                aria-haspopup="true"
                                onClick={handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
            {renderMobileMenu}
            <div className={classes.container}>
                {props.children}
            </div>
        </>
    )
}

export default AppLayout
