import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import AppLayout from './common/AppLayout';

const CountryInfo = () => {
    let { countryName } = useParams();
    return (
        <AppLayout country={countryName}>
            Hola pais
        </AppLayout>
    )
}

export default CountryInfo
