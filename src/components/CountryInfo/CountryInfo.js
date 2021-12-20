import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { Container, Typography } from '@material-ui/core';

import AppLayout from '../common/AppLayout';
import { getCountryCases, getCountryVaccines } from '../../services/covidServices';

const CountryInfo = () => {
    let { countryName } = useParams();
    const [casesInfo, setCasesInfo] = useState({});
    const [vaccineInfo, setVaccineInfo] = useState({});

    useEffect(async () => {
        setCasesInfo(await getCountryCases(countryName));
        setVaccineInfo(await getCountryVaccines(countryName));
    }, [])

    return (
        <AppLayout country={countryName} casesInfo={casesInfo}>
            <Container maxWidth='xl'>
                <Typography variant='h5' component={'h1'}>
                    Información de {vaccineInfo.country}
                </Typography>
                <Typography variant='subtitle1' component={'h2'}>
                    Última actualización <b>{vaccineInfo.updated}</b>
                </Typography>
            </Container>
        </AppLayout>
    )
}

export default CountryInfo
