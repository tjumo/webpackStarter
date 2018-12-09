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
                <div className={"text-center col-sm-9"}>
                    <Piechart data={this.props.dataPrep(filteredOutflows)} colors={this.props.colors} x={200} y={200}
                              outerRadius={200} innerRadius={80} offset={75}/></div> :
                <><br/><span style={{color: "red", fontWeight: "bold"}}>No historical outlays in selected date span!</span></>}
        </div>);}



}