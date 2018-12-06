import React from 'react';
import Piechart from '../Piechart/Piechart.jsx';
import DateSpan from "./DateSpan.jsx";
import moment from "moment";

export default class PiechartView extends React.Component {
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

        return (<div>
            <DateSpan minDate={this.props.minDate} maxDate={this.props.maxDate} handler={this.props.dateHandler}/>
            {filteredOutflows.length>0?
                <Piechart data={this.props.dataPrep(filteredOutflows)} colors={this.props.colors} x={100} y={100}
                          outerRadius={100} innerRadius={0} offset={75}/> :
                <><br/><span style={{color: "red", fontWeight: "bold"}}>No historical outflows in selected date span!</span></>}
        </div>);}



}