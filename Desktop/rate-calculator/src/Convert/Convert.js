import React, { Component } from 'react';
import './Convert.css';

class Convert extends Component {
    constructor(){
        super();
        this.inpChange = this.inpChange.bind(this);
        this.state = {
            inpValue: 0,
        }
    }
    inpChange(event){
        this.setState({
            inpValue: event.target.value,
        })
    }
    render(){
        return(
            <div className='convert-box'>
                <p className='convert-input-headline'>
                    input/text (Focus)
                </p>
                <input className='convert-input' onChange={this.inpChange} type="text"/>
                <p className='result-text'>
                    AMD = {(this.state.inpValue / this.props.amount + '').substring(0,4)} {this.props.currency}
                </p>
            </div>
        )
    }

}

export default Convert;