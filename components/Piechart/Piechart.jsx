import React from 'react';
import LabeledArc from './Arc.jsx';
import * as d3 from 'd3';

export default class Piechart extends React.Component {
    constructor(props) {
        super(props);

        this.pie = d3.pie().value((d) => d.value);
        this.colors = d3.scaleOrdinal(d3.schemeCategory10);
    }
    arcGenerator = (d, i) => <LabeledArc key={`arc-${i}`}
                                         data={d}
                                         innerRadius={this.props.innerRadius}
                                         outerRadius={this.props.outerRadius}
                                         color={this.colors(i)}/>;
    render() {
        let pie = this.pie(this.props.data);
        let translate = `translate(${this.props.x}, ${this.props.y})`;

        return (<svg width={250} height={250}>
                    <g transform={translate}>{pie.map((d,i) => this.arcGenerator(d,i))}</g>
                </svg>)
    }
}