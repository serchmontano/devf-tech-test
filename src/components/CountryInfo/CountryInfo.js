import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Avatar, Card, CardContent, CardHeader, CardMedia, Container, Divider, Grid, Typography } from '@material-ui/core';

import AppLayout from '../common/AppLayout';
import { getCountryCases, getCountryVaccines } from '../../services/covidServices';
import { useStyles } from './CountryInfo.styles';
import { getCountryInfo } from '../../services/countryServices';
import { Skeleton } from '@material-ui/lab';

const CountryInfo = () => {
    const classes = useStyles();

    let { countryName } = useParams();
    const [casesInfo, setCasesInfo] = useState({});
    const [vaccineInfo, setVaccineInfo] = useState({});
    const [countryInfo, setCountryInfo] = useState({});
    const [servicesLoaded, setServicesLoaded] = useState(false)

    useEffect(async () => {
        setCasesInfo(await getCountryCases(countryName));
        setVaccineInfo(await getCountryVaccines(countryName));
        setCountryInfo(await getCountryInfo(countryName))
        setServicesLoaded(true)
    }, [countryName])

    const emptyCountryInfo = () => {
        setCasesInfo({})
        setVaccineInfo({})
        setCountryInfo({})
        setServicesLoaded(false)
    }

    const CountryInfo = () => {
        return <Grid container spacing={3}>
            <Grid item sm={6} xs={12}>
                <Card>
                    <CardHeader
                        avatar={<Avatar aria-label='country' className={classes.avatar}>
                            {vaccineInfo.abbreviation}
                        </Avatar>}
                        title={countryName}
                        subheader={`Última actualización ${vaccineInfo.updated}`} />
                    {Object.keys(countryInfo).length === 0
                        ? <Skeleton variant="circle" height={400} className={classes.logo} />
                        : <CardMedia
                            image={countryInfo.coatOfArms && countryInfo.coatOfArms.svg}
                            title={countryName}
                            className={classes.logo} />}
                    <CardContent>
                        <Divider />
                        <div className={classes.info}>
                            <Typography variant='subtitle1' component='p'>Población</Typography>
                            {Object.keys(vaccineInfo).length === 0
                                ? <Skeleton variant="text" className={classes.textSkeleton} />
                                : <Typography>{vaccineInfo.population}</Typography>}
                        </div>
                        <Divider />
                        <div className={classes.info}>
                            <Typography variant='subtitle1' component='p'>Área</Typography>
                            {Object.keys(vaccineInfo).length === 0
                                ? <Skeleton variant="text" className={classes.textSkeleton} />
                                : <Typography>{vaccineInfo.sq_km_area} km2</Typography>}
                        </div>
                        <Divider />
                        <div className={classes.info}>
                            <Typography variant='subtitle1' component='p'>Vacunas administradas</Typography>
                            {Object.keys(vaccineInfo).length === 0
                                ? <Skeleton variant="text" className={classes.textSkeleton} />
                                : <Typography>{vaccineInfo.administered}</Typography>}
                        </div>
                        <Divider />
                        <div className={classes.info}>
                            <Typography variant='subtitle1' component='p'>Vacunados completamente</Typography>
                            {Object.keys(vaccineInfo).length === 0
                                ? <Skeleton variant="text" className={classes.textSkeleton} />
                                : <Typography>{vaccineInfo.people_vaccinated}</Typography>}
                        </div>
                        <Divider />
                        <div className={classes.info}>
                            <Typography variant='subtitle1' component='p'>Vacunados parcialmente</Typography>
                            {Object.keys(vaccineInfo).length === 0
                                ? <Skeleton variant="text" className={classes.textSkeleton} />
                                : <Typography>{vaccineInfo.people_partially_vaccinated}</Typography>}
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item sm={6} xs={12}>
                <Card>

                </Card>
            </Grid>
        </Grid>;
    }

    return (
        <AppLayout country={countryName} casesInfo={casesInfo} emptyCountryInfo={emptyCountryInfo}>
            <Container maxWidth='xl'>
                {CountryInfo()}
            </Container>
        </AppLayout>
    )
}

export default CountryInfo
