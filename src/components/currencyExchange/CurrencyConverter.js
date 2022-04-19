import CurrenciesService from "../../services/CurrenciesService";
import { useState, useEffect } from 'react'
import './currencyConverter.scss'


const CurrencyConverter = () => {


    const [data, setData] = useState([]);
    const [title, setTitle] = useState([]);
    const [rate, setRate] = useState();
    const [amount, setAmount] = useState(1)
    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();
    const [fromToAmount, setFromToAmount] = useState(true);


    const {getCurrency, getMultiCurrency, getCurrencyTitles} = CurrenciesService();
    
    let toAmount, fromAmount
    if (fromToAmount) {
        fromAmount = amount
        toAmount = (amount * rate).toFixed(2)
    } else {
        toAmount = amount
        fromAmount = (amount / rate).toFixed(2)
    }

    useEffect(() => {
        getMultiCurrency('USD')
        .then(data => {
            setData([data.base, ...Object.keys(data.results)])
            const firstCurrency = Object.keys(data.results)[0];
            setToCurrency(firstCurrency)
            setFromCurrency(data.base)
            setRate(data.results[firstCurrency])
        })
        getCurrencyTitles()
        .then(data => {
            setTitle(Object.entries(data.currencies))
        })

    }, [])

    useEffect(() => {
        if (fromCurrency != null && toCurrency != null) {
            getCurrency(fromCurrency, toCurrency)
            .then(data => {
                setRate(data.result[toCurrency])
            })
        }
    }, [fromCurrency, toCurrency])

    const handleFrom = (e) => {
        setAmount(e.target.value);
        setFromToAmount(true)
    }

    
    const handleTo = (e) => {
        setAmount(e.target.value);
        setFromToAmount(false)
    }
    const options = data.map((item, i) => {
        const filter = title.filter(el => el[0] === item)
        return (
            <option key={i} value={item}>{item} - {filter[0][1]}</option>
 
        )
    })

    return (
        <div className="converter">
            <div className="title">
                <h3>Type amount and choose currency</h3>
            </div>
            <div className="currency">
                <div className="option">
                    <input name="currency-input" 
                    type="number"
                    value={fromAmount}
                    onChange={e => handleFrom(e)}/>
                    <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                        {options}
                    </select>
                </div>
                <div className="equals">=</div>
                <div className="option">
                    <input name="value"
                    type="number" 
                    value={toAmount}
                    onChange={e => handleTo(e)}/>
                    <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                        {options}
                    </select>
                </div>
            </div>
        </div>


    )
}

export default CurrencyConverter