import React from 'react';
import LabeledArc from './Arc.jsx';
import * as d3 from 'd3';

export default class Piechart extends React.Component {
    constructor(props) {
        super(props);

        this.pie = d3.pie().value((d) => d.value);
        let colorScale = d3.scaleOrdinal().domain(Object.keys(this.props.colors))
                                           .range(Object.values(this.props.colors));
        this.colors = label => colorScale(label);
    }
    componentWillMount() {
        this.updateColors(this.props);
    }
    componentWillReceiveProps(newProps) {
        this.updateColors(newProps);
    }
    updateColors(props) {
        let colorScale = d3.scaleOrdinal().domain(Object.keys(props.colors))
                                          .range(Object.values(props.colors));
        this.colors = label => colorScale(label);
    }

    arcGenerator = (d, i) => <LabeledArc key={`arc-${i}`}
                                         data={d}
                                         innerRadius={this.props.innerRadius}
                                         outerRadius={this.props.outerRadius}
                                         color={this.colors(d.data.label)}/>;
    render() {
        let pie = this.pie(this.props.data);
        let translate = `translate(${this.props.x+this.props.offset}, ${this.props.y+this.props.offset})`;

        return (<svg width={(this.props.x+this.props.offset)*2}
                                        height={(this.props.y+this.props.offset)*2}>
                    <g transform={translate}>{pie.map((d,i) => this.arcGenerator(d,i))}</g>
                </svg>)
    }
}