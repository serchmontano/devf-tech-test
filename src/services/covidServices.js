import { covidAPI } from '../utils/axios'
import covidPaths from '../utils/apiPaths'

export const getWorldCases = async () => {
    try {
        const worldCases = await covidAPI.get(covidPaths.cases)
        if (worldCases.status === 200) {
            return Object.entries(worldCases.data)
        } else {
            return []
        }
    } catch (e) {
        return []
    }
}

export const getWorldHistory = async (status) => {
    try {
        const worldHistory = await covidAPI.get(covidPaths.history, {
            params: {
                status
            }
        })
        if (worldHistory.status === 200) {
            return Object.entries(worldHistory.data)
        } else {
            return []
        }
    } catch (e) {
        return []
    }
}

export const getCountryCases = async (country) => {
    try {
        const countryCases = await covidAPI.get(covidPaths.cases, {
            params: {
                country
            }
        })
        if (countryCases.status === 200) {
            return countryCases.data.All
        } else {
            return {}
        }
    } catch (e) {
        return {}
    }
}

export const getCountryVaccines = async (country) => {
    try {
        const countryVaccination = await covidAPI.get(covidPaths.vacines, {
            params: {
                country
            }
        })
        if (countryVaccination.status === 200) {
            return countryVaccination.data.All
        } else {
            return {}
        }
    } catch (e) {
        return {}
    }
}

export const getCountryHistory = async (country, status) => {
    try {
        const countryHistory = await covidAPI.get(covidPaths.history, {
            params: {
                country,
                status
            }
        })
        if (countryHistory.status === 200) {
            let data = []
            Object.entries(countryHistory.data.All.dates).forEach(element => {
                data.push({x: element[0], y: element[1]})
            })
            return data.reverse()
        } else {
            return []
        }
    } catch (e) {
        return []
    }
}