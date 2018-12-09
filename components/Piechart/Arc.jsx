import React from 'react';
import * as d3 from 'd3';

export class Arc extends React.Component {
    constructor(props) {
        super(props);

        this.factor = 1.14;

        this.arc = d3.arc();
        this.f = parseInt(window.getComputedStyle(document.querySelector('body')).getPropertyValue('font-size'));

        this.state = {
            innerRadius: this.props.innerRadius,
            outerRadius: this.props.outerRadius
        }
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
    mouseOn = () => {
        this.setState({innerRadius: this.props.innerRadius * this.factor,
                       outerRadius: this.props.outerRadius * this.factor});
    };

    mouseOff = () => {
        this.setState({innerRadius: this.props.innerRadius,
                       outerRadius: this.props.outerRadius});
    };


    render() {
        this.updateD3(this.state);
        return <path d={this.arc(this.props.data)} style={{fill: this.props.color}}/>
                     // onMouseEnter={this.mouseOn} onMouseLeave={this.mouseOff} onClick={this.mouseOn}/>;
    }
}

export default class LabeledArc extends Arc {
    render() {
        let [x, y] = this.arc.centroid(this.props.data);
        let h = Math.sqrt(x*x+y*y);
        let labelX = x/h*(this.props.outerRadius+2*this.f), labelY = y/h*(this.props.outerRadius+2*this.f);

        return (<g onMouseEnter={this.mouseOn} onMouseLeave={this.mouseOff} onClick={this.mouseOn}>
            {super.render()}
            <text x={labelX} y={labelY} textAnchor="middle">
                {this.props.data.data.label}</text>
            </g>)
    }
}