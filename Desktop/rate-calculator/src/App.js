import React, {Component} from 'react';
import CurrencySelect from "./CurrencySelect/CurrencySelect";
import Convert from "./Convert/Convert";
import './App.css';
import BitcoinInfo from "./BitcoinInfo/BitcoinInfo";
import ReactLoading from 'react-loading';

class App extends Component {
    constructor() {
        super();
        this.componentDidMount = this.componentDidMount.bind(this);
        this.changeCurrency = this.changeCurrency.bind(this);
        this.clickToggle = this.clickToggle.bind(this);
        this.state = {
            currency: "USD",
            toAMD: 0,
            isLoad: false,
            currencyObj: {},
            showBitcoinTab: false,
        }
    }

    clickToggle() {
        this.setState({
            showBitcoinTab: !this.state.showBitcoinTab,
        })
    }

    changeCurrency(event) {
        this.setState({
            currency: event.target.value,
        })
    }

    componentDidMount() {

        fetch("http://cb.am/latest.json.php")
            .then(response => response.json())
            .then(data => {
                    this.setState({
                        currencyObj: data,
                        isLoad: true,
                    })
                }
            )
    }

    render() {
        return (
            (this.state.isLoad &&
                <div className="App">
                    <h1 className='headline'>Rate calculator</h1>
                    <CurrencySelect currency={this.state.currency} amount={this.state.currencyObj[this.state.currency]}
                                    change={this.changeCurrency}/>
                    <Convert currency={this.state.currency} amount={this.state.currencyObj[this.state.currency]}/>
                    <p className='bitcoin-headline text-purple-style'
                       onClick={this.clickToggle}>{(this.state.showBitcoinTub && 'Hide ') || 'Show '}Bitcoin rate</p>
                    {this.state.showBitcoinTab && <BitcoinInfo/>}
                </div>) || <div className='loader'><p className='loader-text'>Loader</p><ReactLoading type={'bubbles'} color={'white'} height={70} width={130} /></div>
        );
    }
}

export default App;
