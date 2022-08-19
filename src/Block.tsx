import React, {ChangeEvent, useState} from 'react';

export const defaultCurrencies = ['RUB', 'USD', 'EUR', 'GBP'];

type BlockType = {
    value?: number
    currency?: string
    onChangeValue?: (e: ChangeEvent<HTMLInputElement>) => void
    onChangeCurrency?: (cur: string) => void
}

export const Block = ({value, currency, onChangeValue, onChangeCurrency}: BlockType) => {
    const [count, setCount] = useState<number>(0)

    return (
        <div className="block">
            <ul className="currencies">
                {defaultCurrencies.map((cur) => (
                    <li
                        // onClick={() => onChangeCurrency(cur)}
                        onClick={() => {
                        }}
                        className={currency === cur ? 'active' : ''}
                        key={cur}>
                        {cur}
                    </li>
                ))}
                <li>
                    <svg height="50px" viewBox="0 0 50 50" width="50px">
                        <rect fill="none" height="50" width="50"/>
                        <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 "/>
                    </svg>
                </li>
            </ul>
            <input
                // onChange={(e) => onChangeValue(e.target.value)}
                onChange={(e) => {
                }}
                value={value}
                type="number"
                placeholder={`${count}`}
            />
        </div>
    )

}