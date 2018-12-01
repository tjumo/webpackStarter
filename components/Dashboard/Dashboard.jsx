import React from 'react';
import moment from 'moment';

class NewOutflow extends React.Component {
    constructor(props) {
        super(props);
        this. state = {
            amount: 0,
            date: moment().format('YYYY-MM-DD'),
            type: ''
        }

    }
    handleTypeChange = (e) => {
        this.setState({
            type: e.target.value
        });
    };

    handleChangeAmount = (e) => {
        this.setState({
            amount: e.target.value
        });
    };

    handleDateChange = (e) => {
        console.log(e.target.value);
        this.setState({
            date: e.target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (typeof this.props.submitHandler == 'function') {
            this.props.submitHandler(this.state.amount,this.state.date,this.state.type);
        }
        this.setState({
            amount: 0,
            type: '',
            date: moment().format("yyyy-mm-dd")
        });
    };


    render() {

        return (
            <form action="" onSubmit={this.handleSubmit}>
                <input onChange={this.handleChangeAmount} value={this.state.amount} type="number"/>
                <input type="text" value={this.state.type} onChange={this.handleTypeChange}/>
                <input type="date" value={this.state.date} onChange={this.handleDateChange} />
                <button>Dodaj</button>
            </form>

        );
    }
}

class SingleOutflow extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<li>
            <div>Date: {this.props.date}</div>
            <div>Type: {this.props.type}</div>
            <div>Amount: {this.props.amount}</div>
            </li>)
    }
}

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            outflows: [],
            total: 0
        }

    }

    submitHandler = (amount,date,type) => {
        let outflow = {amount: amount,
                       date: date,
                       type: type};
        this.setState({
            outflows: [...this.state.outflows,outflow],
            total: this.state.total + amount     // zrobic  z tego jsona i axios
        });
    };

    render() {
        let outflowItems = this.state.outflows.map((item,i) => <SingleOutflow date={item.date} type={item.type} amount={item.amount} key={i}/>);
        return(<div>
            <NewOutflow submitHandler={this.submitHandler}/>
            <ul>
                {outflowItems}
            </ul>

        </div>)
    }


}




