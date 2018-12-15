import React from 'react';
import BubbleChart from '@weknow/react-bubble-chart-d3';
import DateSpan from '../Header/DateSpan.jsx';
import moment from "moment";

export default class BubblechartView extends React.Component {
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
        if (this.props.view === 'compact') {
            let labels = new Set(filteredOutflows.map(elem => elem.label));
            var data = [];
            for (let label of labels) {
                // console.log(label);
                let sum = filteredOutflows.reduce((prev,curr) => {
                    if (curr.label === label) {
                        return prev+curr.amount
                    } else {
                        return prev
                    }
                },0);
                // console.log(sum);
                let color = filteredOutflows.find(elem => elem.label === label).color;
                data.push({color: color, value: sum, label: label});
            }
        } else {
            var data = filteredOutflows.map(elem => {
                return {label: elem.name, value: elem.amount, color: elem.color}
            });
        }

        let toRender = data.length>0?<BubbleChart data={data} showLegend={false} width={900} height={500}
                                                  graph={{zoom: 0.5, offsetX: 0.15, offsetY: 0.0}}
                                                  labelFont={{color: 'aliceblue',
                                                      size: 11, weight: 'bold', family: 'Arial'}}
                                                  valueFont={{color: 'aliceblue',
                                                      size: 12, weight: 'lighter', family: 'Arial'}}/> :
            <><br/><span style={{color: "red", fontWeight: "bold"}}>
                    No historical outlays in selected date span!</span></>;
        return (toRender);
}
}