import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Avatar, Card, CardContent, CardHeader, CardMedia, CircularProgress, Container, Divider, Grid, Typography } from '@material-ui/core';

import AppLayout from '../common/AppLayout';
import { getCountryCases, getCountryHistory, getCountryVaccines } from '../../services/covidServices';
import { useStyles } from './CountryInfo.styles';
import { getCountryInfo } from '../../services/countryServices';
import { Skeleton } from '@material-ui/lab';
import { VictoryArea, VictoryChart } from 'victory';

const CountryInfo = () => {
    const classes = useStyles();

    let { countryName } = useParams();
    const [casesInfo, setCasesInfo] = useState({});
    const [vaccineInfo, setVaccineInfo] = useState({});
    const [countryInfo, setCountryInfo] = useState({});

    const [deceasedInfo, setDeceasedInfo] = useState([])
    const [confirmedInfo, setConfirmedInfo] = useState([])

    const [servicesLoaded, setServicesLoaded] = useState(false)

    useEffect(() => {
        async function servicesCall() {
            setCasesInfo(await getCountryCases(countryName));
            setVaccineInfo(await getCountryVaccines(countryName));
            setCountryInfo(await getCountryInfo(countryName));

            setConfirmedInfo(await getCountryHistory(countryName, 'Confirmed'))
            setDeceasedInfo(await getCountryHistory(countryName, 'Deaths'))

            setServicesLoaded(true)
        }

        servicesCall()
    }, [countryName])

    const emptyCountryInfo = () => {
        setCasesInfo({})
        setVaccineInfo({})
        setCountryInfo({})

        setConfirmedInfo([])
        setDeceasedInfo([])

        setServicesLoaded(false)
    }

    let countryFound = servicesLoaded &&
        (vaccineInfo && Object.keys(vaccineInfo).length) > 0 &&
        (countryInfo && Object.keys(countryInfo).length > 0);

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
                    {countryInfo && Object.keys(countryInfo).length === 0
                        ? <Skeleton variant="circle" height={400} className={classes.logo} />
                        : <CardMedia
                            image={countryInfo.coatOfArms && countryInfo.coatOfArms.svg}
                            title={countryName}
                            className={classes.logo} />}
                    <CardContent>
                        <Divider />
                        <div className={classes.info}>
                            <Typography variant='subtitle1' component='p'>Población</Typography>
                            {vaccineInfo && Object.keys(vaccineInfo).length === 0
                                ? <Skeleton variant="text" className={classes.textSkeleton} />
                                : <Typography>{vaccineInfo.population}</Typography>}
                        </div>
                        <Divider />
                        <div className={classes.info}>
                            <Typography variant='subtitle1' component='p'>Área</Typography>
                            {vaccineInfo && Object.keys(vaccineInfo).length === 0
                                ? <Skeleton variant="text" className={classes.textSkeleton} />
                                : <Typography>{vaccineInfo.sq_km_area} km2</Typography>}
                        </div>
                        <Divider />
                        <div className={classes.info}>
                            <Typography variant='subtitle1' component='p'>Vacunas administradas</Typography>
                            {vaccineInfo && Object.keys(vaccineInfo).length === 0
                                ? <Skeleton variant="text" className={classes.textSkeleton} />
                                : <Typography>{vaccineInfo.administered}</Typography>}
                        </div>
                        <Divider />
                        <div className={classes.info}>
                            <Typography variant='subtitle1' component='p'>Vacunados completamente</Typography>
                            {vaccineInfo && Object.keys(vaccineInfo).length === 0
                                ? <Skeleton variant="text" className={classes.textSkeleton} />
                                : <Typography>{vaccineInfo.people_vaccinated}</Typography>}
                        </div>
                        <Divider />
                        <div className={classes.info}>
                            <Typography variant='subtitle1' component='p'>Vacunados parcialmente</Typography>
                            {vaccineInfo && Object.keys(vaccineInfo).length === 0
                                ? <Skeleton variant="text" className={classes.textSkeleton} />
                                : <Typography>{vaccineInfo.people_partially_vaccinated}</Typography>}
                        </div>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item sm={6} xs={12}>
                <Card className={classes.card}>
                    <Typography variant='h5' align='center'>Confirmados</Typography>
                    {confirmedInfo.length > 0 ? (
                        <VictoryChart>
                            <VictoryArea
                                style={{
                                    data: { fill: "green" }
                                }}
                                data={confirmedInfo}

                            />
                        </VictoryChart>
                    ) : (
                        <Skeleton variant='rect' height={400} />
                    )}
                </Card>
                <Card className={classes.card}>
                    <Typography variant='h5' align='center'>Muertos</Typography>
                    {deceasedInfo.length > 0 ? (
                        <VictoryChart>
                            <VictoryArea
                                style={{
                                    data: { fill: "orange" }
                                }}
                                data={deceasedInfo}
                            />
                        </VictoryChart>
                    ) : (
                        <Skeleton variant='rect' height={400} />
                    )}
                </Card>
            </Grid>
        </Grid>
    }

    return (
        <AppLayout country={countryName} casesInfo={casesInfo} emptyCountryInfo={emptyCountryInfo}>
            <Container maxWidth='xl'>
                {countryFound ? <CountryInfo /> : (
                    <div className={classes.spinner} >
                        <Typography variant='h4' align='center'>Buscando información del país</Typography>
                        <CircularProgress color="secondary" />
                        <Typography variant='h5' align='center'>*Si tarda mucho ingresa el nombre del país en inglés o revisa si esta escrito correctamente</Typography>
                    </div>
                )}
            </Container>
        </AppLayout>
    )
}

export default CountryInfo
