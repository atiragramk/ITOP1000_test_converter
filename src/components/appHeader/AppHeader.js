import { useState, useEffect } from "react"

import CurrenciesService from "../../services/CurrenciesService";
import './appHeader.scss'
const AppHeader = () => {

    const [rateUSD, setRateUSD] = useState();
    const [rateEUR, setRateEUR] = useState();
    const [rateGBP, setRateGBP] = useState();
    const {getCurrency} = CurrenciesService();



    useEffect(() => {
        getCurrency('USD', 'UAH')
        .then(data => {
            setRateUSD((data.result.UAH).toFixed(2))
        })
        getCurrency('EUR', 'UAH')
        .then(data => {
            setRateEUR((data.result.UAH).toFixed(2))
        })
        getCurrency('GBP', 'UAH')
        .then(data => {
            setRateGBP((data.result.UAH).toFixed(2))
        })
    }, [])

    
    return (
        <header className="app-header">
            <div className="app-title">
                <h1>Currency Converter Online</h1>
            </div>
            <div className="app-currency">
                <span>USD/UAH</span>
                <p>{rateUSD}</p> 
            </div>
            <div className="app-currency">
                <span>EUR/UAH</span>
                <p>{rateEUR}</p>
            </div>
            <div className="app-currency">
                <span>GBP/UAH</span>
                <p>{rateGBP}</p>
            </div>
        </header>
    )

}

export default AppHeader;