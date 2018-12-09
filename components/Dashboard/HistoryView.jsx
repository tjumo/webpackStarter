import React from 'react';
import {Table,Button} from 'react-bootstrap';
import DateSpan from './DateSpan.jsx'
import moment from "moment";
import SingleOutflow from "./SingleOutflow.jsx";
import Icon from './Icon.jsx';

export default class HistoryView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newOutflow: false
        }
    }


    belongsToPeriodInQuestion(elem) {
        let outflowAfterMinDate = moment(elem.date,"YYYY-MM-DD") >= moment(this.props.minDate,'YYYY-MM-DD');
        let outflowBeforeMaxDate = moment(elem.date,"YYYY-MM-DD") <= moment(this.props.maxDate,'YYYY-MM-DD');
        return ( outflowAfterMinDate && outflowBeforeMaxDate);
    }

    deleteNewOutflow = () => {
        this.setState({newOutflow: false});

    };

    clickAdd = () => {
        this.setState({newOutflow: true});
    };

    addHandler = (id, date, name, amount, label) => {
        if (typeof this.props.newOutflowHandler === 'function') {
            // console.log('add Handler at HistoryView triggered');
            // console.log(id, date, name, amount, label);
            this.props.newOutflowHandler(id, date, name, amount, label);
        }
        this.setState({newOutflow: false});
    };

    sortByDate = (item1,item2) => (moment(item1.date,'YYYY-MM-DD') <= moment(item2.date,'YYYY-MM-DD')? -1 : 1)

    render() {
        let filteredOutflows = this.props.outflows.filter(elem => this.belongsToPeriodInQuestion(elem));
        filteredOutflows.sort(this.sortByDate);

        let outflowItems = filteredOutflows.map(item => <SingleOutflow date={item.date} key={`outflow-${item.id}`}
                                                                       name={item.name} amount={item.amount}
                                                                       label={item.label}
                                                                       id={`outflow-${item.id}`} edit={false}
                                                                       labels={this.props.labels}
                                                                       addLabel={this.props.newLabelHandler}
                                                                       saveHandler={this.props.saveHandler}
                                                                       deleteHandler={this.props.deleteHandler}/>);

        let newId = Math.max.apply(undefined, this.props.outflows.map(elem=>elem.id)) + 1;

        return (<div>
        <DateSpan minDate={this.props.minDate} maxDate={this.props.maxDate} handler={this.props.dateHandler}/>
        {filteredOutflows.length>0? <Table>
            <thead>
            <tr>
                <th scope={"col"}>Date</th>
                <th scope={"col"}>Name</th>
                <th scope={"col"}>Amount</th>
                <th scope={"col"}>Label</th>
                <th scope={"col"}> </th>
                <th scope={"col"}> </th>
            </tr>
            </thead>
            <tbody>
            {outflowItems}
            {this.state.newOutflow? <SingleOutflow date={moment().format('YYYY-MM-DD')}
                                                   name={""} amount={0} label={this.props.outflowLabel}  edit={true}
                                                   labels={this.props.labels} addLabel={this.props.newLabelHandler}
                                                   id={`outflow-${newId}`} saveHandler={this.addHandler}
                                                   deleteHandler={this.deleteNewOutflow}/>
            : <tr><td /> <td /><td /><td />
                    <td>
                        <Icon className={'far fa-plus-square'} size={2} click={this.clickAdd} name={"Add"}/>
                    </td>
                    <td />
                    </tr>}
            </tbody>
        </Table>:
        <><br/><span style={{color: "red", fontWeight: "bold"}}>No historical outflows in selected date span!</span></>}
    </div>);}
}