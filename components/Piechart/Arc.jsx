import React from 'react';
import * as d3 from 'd3';

export class Arc extends React.Component {
    constructor(props) {
        super(props);

        this.arc = d3.arc();
    }
    componentWillMount() {
        this.updateD3(this.props);
    }
    componentWillReceiveProps(newProps) {
        this.updateD3(newProps);
    }
    updateD3(newProps) {
        this.arc.innerRadius(newProps.innerRadius);
        this.arc.outerRadius(newProps.outerRadius);
    }
    render() {
        return <path d={this.arc(this.props.data)} style={{fill: this.props.color}} />;
    }
}

export default class LabeledArc extends Arc {
    render() {
        let [labelX, labelY] = this.arc.centroid(this.props.data);

        return (<g>
            {super.render()}
            <text x={labelX} y={labelY} textAnchor="middle">{this.props.data.data.label}</text>
            </g>)
    }
}