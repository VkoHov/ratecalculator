import React, {Component} from 'react';
import ReactLoading from 'react-loading';
import './BitcoinInfo.css';

class BitcoinInfo extends Component {
    constructor() {
        super();
        this.componentDidMount = this.componentDidMount.bind(this);
        this.bitcoinFetch = this.bitcoinFetch.bind(this);
        this.componentWillUnmount = this.componentWillUnmount.bind(this);
        this.shouldComponentUpdate = this.shouldComponentUpdate.bind(this);
        this.state = {
            setIntKey: '',
            bitcoinRate: 0,
            isloading: true,
        }
    }

    bitcoinFetch(){
        this.setState({
            isloading: true,
            bitcoinRate: 0,
        })
        fetch(" http://cb.am/latest.json.php?coins&currency=BTC")
            .then(response => response.json())
            .then(data => {
                this.setState({
                    bitcoinRate: data['BTC'],
                    isloading: false,
                })
            })
    }
    shouldComponentUpdate(nextProps, nextState){
        return nextState.bitcoinRate !== this.state.bitcoinRate;
    }

    componentDidMount(){
        this.bitcoinFetch();
        let key = setInterval(this.bitcoinFetch,180000);
        this.setState({
            setIntKey: key,
        })
    }
    componentWillUnmount(){
        clearInterval(this.state.setIntKey);
    }
    render() {
        return (
            <div className='bitcoin-box'>
               <div className='bitcoin-info-box'>
                    <hr className='gray-line'/>
                    <p className='bitcoin-info-titel'>Current Bitcoin rate:</p>
                    <p className='rate'>{(!this.state.isloading && this.state.bitcoinRate) || <ReactLoading type={'spinningBubbles'} color={'black'} height={20} width={20} />}</p>
                    <p className='refresh-text text-purple-style' onClick={this.bitcoinFetch}>Refresh</p>
                    <p className='bitcoin-rate-des'>(BTC rate automatically will be updated every 3 minutes)</p>
                </div>
            </div>
        )
    }
}

export default BitcoinInfo;