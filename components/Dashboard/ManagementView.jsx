import moment from 'moment';
import React from 'react';
import Piechart from '../Piechart/Piechart.jsx';
import NewOutflow from './NewOutflow.jsx';

class SingleOutflow extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (<li>
            <div>Date: {this.props.date}</div>
            <div>Name: {this.props.name}</div>
            <div>Amount: {this.props.amount}</div>
            <div style={{color: this.props.color}}><b>Label: {this.props.label}</b></div>
        </li>)
    }
}

export default class OutflowManagement extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            outflows: [],
            total: 0,
            minDate: moment().subtract(3,'days').format('YYYY-MM-DD'),
            maxDate: '2018-12-24',
            colors: {}
        }
    }

    dataPrep(arr) {
        let labels = new Set(arr.map(elem => elem.label));
        // console.log(labels);
        let data = [];
        for (let i=0;i<labels.length;i++) {
            let label = labels[i];
            let filtered = arr.filter(outflow => outflow.label === label);
            let sum = filtered.reduce((prev,curr) => prev+curr.amount,0);
            // console.log(`processed ${label}, extracted ${filtered.length} items which add up to ${sum}`);
            data.push({value: sum, label: label});
        }
        // console.log(data);
        return data;
    }

    handleDate = e => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        });
    }

    submitHandler = (amount,date,name,label,color) => {
        let outflow = {amount: parseInt(amount,10),
            date: date,
            name: name,
            label: label,
            color: color};
        let colors = this.state.colors;
        colors[label] = color;
        this.setState({
            outflows: [...this.state.outflows,outflow],
            colors: colors,
            total: this.state.total + parseInt(amount,10)     //TODO: zrobic  z tego jsona i axios
        });
    };


    belongsToPeriodInQuestion(elem) {
        let outflowAfterMinDate = moment(elem.date,"YYYY-MM-DD") > moment(this.state.minDate,'YYYY-MM-DD');
        let outflowBeforeMaxDate = moment(elem.date,"YYYY-MM-DD") < moment(this.state.maxDate,'YYYY-MM-DD');
        return ( outflowAfterMinDate && outflowBeforeMaxDate);
    }

    render() {
        let filteredOutflows = this.state.outflows.filter(elem => this.belongsToPeriodInQuestion(elem));



        let outflowItems = filteredOutflows.map((item,i) => <SingleOutflow date={item.date}
                                                                           name={item.name}
                                                                           amount={item.amount}
                                                                           label={item.label}
                                                                           key={i} color={item.color}/>);

        return(<div>
            <form>
                <label htmlFor={"minDate"}> From:</label>
                <input type={'date'} value={this.state.minDate} onChange={this.handleDate} name={'minDate'} />
                <label htmlFor={"maxDate"}> To:</label>
                <input type={'date'} value={this.state.maxDate} onChange={this.handleDate} name={'maxDate'} />
            </form>
            <NewOutflow submitHandler={this.submitHandler}/>
            <Piechart data={this.dataPrep(filteredOutflows)} colors={this.state.colors}
                      x={100} y={100} outerRadius={100} innerRadius={0} offset={75}/>
            <ul>
                {outflowItems}
            </ul>

        </div>)
    }
}
