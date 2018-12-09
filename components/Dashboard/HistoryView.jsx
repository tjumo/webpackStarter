import React from 'react';
import {Table} from 'react-bootstrap';
import DateSpan from './DateSpan.jsx'
import moment from "moment";
import SingleOutflow from "./SingleOutflow.jsx";

export default class HistoryView extends React.Component {
    constructor(props) {
        super(props);
    }


    belongsToPeriodInQuestion(elem) {
        let outflowAfterMinDate = moment(elem.date,"YYYY-MM-DD") >= moment(this.props.minDate,'YYYY-MM-DD');
        let outflowBeforeMaxDate = moment(elem.date,"YYYY-MM-DD") <= moment(this.props.maxDate,'YYYY-MM-DD');
        return ( outflowAfterMinDate && outflowBeforeMaxDate);
    }

    render() {
        let filteredOutflows = this.props.outflows.filter(elem => this.belongsToPeriodInQuestion(elem));

        let outflowItems = filteredOutflows.map((item,i) => <SingleOutflow date={item.date} key={`outflow-${i}`}
                                                                           name={item.name} amount={item.amount}
                                                                           label={item.label} color={item.color}
                                                                           id={`outflow-${item.id}`}
                                                                           labels={this.props.labels}
                                                                           addLabel={this.props.newLabelHandler}
                                                                           labels={this.props.labels}/>);

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
            </tbody>
        </Table>:
        <><br/><span style={{color: "red", fontWeight: "bold"}}>No historical outflows in selected date span!</span></>}
    </div>);}
}