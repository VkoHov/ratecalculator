import React, {Component} from 'react';
import CurrencySelect from "./CurrencySelect/CurrencySelect";
import Convert from "./Convert/Convert";
import './App.css';


class App extends Component {
    constructor() {
        super();
        this.componentDidMount = this.componentDidMount.bind(this);
        this.changeCurrency = this.changeCurrency.bind(this);
        this.state = {
            currency: "USD",
            toAMD: 0,
            isLoad: false,
            currencyObj: {},
            currencyArr: ["USD", "EUR", "RUB", "GBP"],
        }
    }
    changeCurrency(event){
        this.setState({
            currency: event.target.value,
        })
    }
    componentDidMount() {

        for (let i = 0; i < this.state.currencyArr.length; i++) {
            fetch("http://cb.am/latest.json.php?currency=" + this.state.currencyArr[i])
                .then(response => response.json())
                .then(data => {
                        let obj = {...this.state.currencyObj}
                        obj[this.state.currencyArr[i]] = data[this.state.currencyArr[i]];
                        this.setState({
                            currencyObj: obj,
                        })
                        if (Object.keys(this.state.currencyObj).length === 4) {
                            this.setState({
                                isLoad: true,
                            })
                        }
                    }
                )
        }
    }

    render() {
        return (
            (this.state.isLoad &&
                <div className="App">
                    <h1 className='headline'>Rate calculator</h1>
                    <CurrencySelect currency={this.state.currency} amount={this.state.currencyObj[this.state.currency]} change={this.changeCurrency}/>
                    <Convert currency={this.state.currency} amount={this.state.currencyObj[this.state.currency]}/>
                </div>) || <div className='loader'><p className='loader-text'>Loader...</p></div>
        );
    }
}

export default App;
