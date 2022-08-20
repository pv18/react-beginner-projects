import React, {useEffect, useRef, useState} from 'react';
import {Block} from './Block';
import './index.scss';
import axios from 'axios';
import {DefaultCurrencies, Rates, ResponseType} from './types';

function App() {
    const [fromCurrency, setFromCurrency] = useState<DefaultCurrencies>('RUB')
    const [toCurrency, setToCurrency] = useState<DefaultCurrencies>('USD')
    const [fromPrice, setFromPrice] = useState<number>(0)
    const [toPrice, setToPrice] = useState<number>(1)
    // const [rates, setRates] = useState<Rates | {}>({})
    const ratesRef = useRef<Rates | {}>({})


    useEffect(() => {
        axios.get<ResponseType>('https://cdn.cur.su/api/latest.json')
            .then(res => {
                // setRates(res.data.rates)
                ratesRef.current = res.data.rates
                onChangeToPrice(1)
            })
            .catch(err => {
                console.warn(err)
                alert('Нe удалось получить информацию')
            })
    }, [])

    const onChangeFromPrice = (value: number) => {
        const rate = Object.assign(ratesRef.current)
        const price = value / rate[fromCurrency]
        const result = price * rate[toCurrency]
        // @ts-ignore
        setToPrice(result.toFixed(3))
        setFromPrice(value)
    }

    const onChangeToPrice = (value: number) => {
        const rate = Object.assign(ratesRef.current)
        const result = rate[fromCurrency] / rate[toCurrency] * value
        // @ts-ignore
        setFromPrice(result.toFixed(3))
        setToPrice(value)
    }

    useEffect(() => {
        onChangeFromPrice(fromPrice)
    }, [fromCurrency])

    useEffect(() => {
        onChangeToPrice(toPrice)
    }, [toCurrency])

    return (
        <div className="App">
            <Block value={fromPrice}
                   currency={fromCurrency}
                   onChangeValue={onChangeFromPrice}
                   onChangeCurrency={setFromCurrency}
            />
            <Block value={toPrice}
                   currency={toCurrency}
                   onChangeValue={onChangeToPrice}
                   onChangeCurrency={setToCurrency}
            />
        </div>
    );
}

export default App;