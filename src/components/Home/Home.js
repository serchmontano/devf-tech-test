import React, { useState, useEffect } from 'react'

import { Button, Container, Typography } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton';
import { scaleLinear } from 'd3-scale';

import AppLayout from '../common/AppLayout'
import CountryMap from './CountryMap'
import { useStyles } from './Home.styles';

import { getWorldCases, getWorldHistory } from '../../services/covidServices'
import { CASES_STATUS } from '../../utils/constants';

const colorScale = scaleLinear()
    .domain([0, 1])
    .range(["#ffeaea", "#ff3333"]);

const Home = () => {
    const classes = useStyles();

    const [status, setStatus] = useState('confirmed')
    const [data, setData] = useState([]);

    useEffect(async () => {
        setData(await getWorldCases())
    }, [status])

    return (
        <AppLayout>
            <Container maxWidth='md' className={classes.homeContainer}>
                {data.length > 0 ? (
                    <>
                        <Typography variant='h5' component={'h1'} align='center'>Personas {CASES_STATUS[status]}</Typography>
                        <div className={classes.mapButtons}>
                            <Button
                                disabled={status === 'confirmed'}
                                onClick={() => {
                                    setData([])
                                    setStatus('confirmed')
                                }}
                                variant="contained"
                                color="primary"
                            >
                                Confirmados
                            </Button>
                            <Button
                                disabled={status === 'deaths'}
                                onClick={() => {
                                    setData([])
                                    setStatus('deaths')
                                }}
                                variant="contained"
                                color="primary"
                            >
                                Muertos
                            </Button>
                            <Button
                                disabled={status === 'recovered'}
                                onClick={() => {
                                    setData([])
                                    setStatus('recovered')
                                }}
                                variant="contained"
                                color="primary"
                            >
                                Recuperados
                            </Button>
                        </div>
                        <Typography variant='subtitle1'>* Para tener mas datos de un país dale click en el mapa o escribe su nombre en el cuadro de busqueda</Typography>
                        <CountryMap data={data} status={status} />
                        <div className={classes.mapIndicators}>
                            <div style={{ width: 24, heigth: 24, borderRadius: 12, backgroundColor: colorScale(0) }} />
                            <div style={{ width: 24, heigth: 24, borderRadius: 12, backgroundColor: colorScale(0.25) }} />
                            <div style={{ width: 24, heigth: 24, borderRadius: 12, backgroundColor: colorScale(0.5) }} />
                            <div style={{ width: 24, heigth: 24, borderRadius: 12, backgroundColor: colorScale(0.75) }} />
                            <div style={{ width: 24, heigth: 24, borderRadius: 12, backgroundColor: colorScale(1) }} />
                        </div>
                        <div className={classes.mapInfo}>
                            <Typography variant={'caption'} component={'p'} align={'center'}>Menor % de personas {CASES_STATUS[status]} / población total</Typography>
                            <Typography variant={'caption'} component={'p'} align={'center'}>Mayor % de personas {CASES_STATUS[status]} / población total</Typography>
                        </div>
                    </>
                ) : (
                    <Skeleton variant="rect" className={classes.mapSkeleton} />
                )}
            </Container>
        </AppLayout>
    )
}

export default Home
