import { useHttp } from "../hooks/httphook"

const CurrenciesService = () => {

    const {request} = useHttp();

    const getCurrency = async (from, to) => {
        const res = await request(`https://api.fastforex.io/fetch-one?from=${from}&to=${to}&api_key=09976e1f60-1767a20ee9-raiyw3`)
        return res
    }

    const getAllCurrency = async (base) => {
        const res = await request(`https://api.fastforex.io/fetch-all?from=${base}&api_key=09976e1f60-1767a20ee9-raiyw3`)
        return res
    }

    const getMultiCurrency = async (base) => {
        const res = await request(`https://api.fastforex.io/fetch-multi?from=${base}&to=UAH%20EUR%20GBP%20CAD%20PLN&api_key=09976e1f60-1767a20ee9-raiyw3`)
        return res
    }
    const getCurrencyTitles = async () => {
        const res = await request('https://api.fastforex.io/currencies?api_key=09976e1f60-1767a20ee9-raiyw3')
        return res
    }

    

    return {getCurrency, getAllCurrency, getMultiCurrency, getCurrencyTitles}
}

export default CurrenciesService