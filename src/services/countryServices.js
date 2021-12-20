import { countryAPI } from '../utils/axios'
import countryPaths from '../utils/apiPaths'

export const getCountryInfo = async (countryName) => {
    countryName = countryName === 'US' ? 'USA' : countryName
    try {
        const countryInfo = await countryAPI.get(`${countryPaths.countryInfo}/${countryName}`)
        if (countryInfo.status === 200) {
            return countryInfo.data[0]
        } else {
            return {}
        }
    } catch (e) {
        return {}
    }
}