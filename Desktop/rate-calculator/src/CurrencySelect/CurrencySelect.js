import React, { Component } from 'react';
import './CurrencySelect.css';

const CurrencySelect = (props) => {
    return (
        <div className='currency-selection'>
            <p className='currency-selection-headline' >Convert AMD to: </p>
            <div className='currency-select-box'>
                <p className='currency-select-text'>Select/Select</p>
                <select className='currency-select-inp' onChange={props.change}>
                    <option value="USD">USD</option>
                    <option value='EUR'>EUR</option>
                    <option value="RUB">RUB</option>
                    <option value="GBP">GBP</option>
                </select>
                <p className='currency-select-result'>(1 {props.currency} = {props.amount} AMD)</p>
            </div>

        </div>
    )
}

export default CurrencySelect;