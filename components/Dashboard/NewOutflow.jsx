import React from "react";
import moment from "moment";

const colorGenerator = () => {
    let red = Math.floor(Math.random()*256);
    let green = Math.floor(Math.random()*256);
    let blue = Math.floor(Math.random()*256);
    return [red,green,blue];
};

const colorSimilarity = (red,green,blue,red2,green2,blue2) => {
    return (Math.abs(red-red2) * Math.abs(green-green2) * Math.abs(blue-blue2) < 1000 );
};

const colorHashToNum = (hash) => {
    let red = parseInt(hash.substr(1,3),16);
    let green = parseInt(hash.substr(3,5),16);
    let blue = parseInt(hash.substr(5,7),16);
    return [red,green,blue];
};

const colorNumToHash = (red,green,blue) => {
    return `#${red.toString(16)}${green.toString(16)}${blue.toString(16)}`
};

export default class NewOutflow extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: 0,
            date: moment().format('YYYY-MM-DD'),
            name: '',
            label:'Choose a label',
            labels: {Food: "#FF320F",
                Bills: "#00833D",
                Restaurants: "#004CCA",
                Transportation: "#52528C",
                Tickets: "#fff85b",
                Clothing: "#e55120",
                Toys: "#a9347e",
                Gifts: "#bada55"}
        }

    }
    handleNameChange = (e) => {
        this.setState({
            name: e.target.value
        });
    };

    handleChangeAmount = (e) => {
        this.setState({
            amount: e.target.value
        });
    };

    handleDateChange = (e) => {
        this.setState({
            date: e.target.value
        });
    };

    handleSelected = (e) => {
        let label = e.currentTarget.value;
        if (label === "Add new label") {
            let newLabel = prompt('Name it');
            if (Object.keys(this.state.labels).includes(newLabel)) {
                alert(`The label ${newLabel} already exists`);
                //TODO: przerobić sprawdzenie na case-insensitive.
            } else {
                let distinct = false;
                while (!distinct) {
                    var [newRed,newGreen,newBlue] = colorGenerator();
                    let oldColorsSimilarity = Object.values(this.state.labels).map(elem => {
                        let [red,green,blue] = colorHashToNum(elem);
                        return colorSimilarity(red,green,blue,newRed,newGreen,newBlue)
                    });
                    distinct = oldColorsSimilarity.every(elem => !elem);
                }

                let labels = this.state.labels;
                labels[newLabel] = colorNumToHash(newRed,newGreen,newBlue);
                this.setState({
                    labels: labels,
                    label: newLabel
                });
            }
        } else {
            this.setState({
                label: label
            });
        }

    };

    handleSubmit = (e) => {
        e.preventDefault();
        if (typeof this.props.submitHandler === 'function') {
            this.props.submitHandler(this.state.amount,this.state.date,this.state.name,this.state.label,
                this.state.labels[this.state.label]);
        }
        this.setState({
            amount: 0,
            name: '',
            date: moment().format('YYYY-MM-DD'),
            label: 'Choose a label'
        })
    };


    render() {
        let Labels = Object.keys(this.state.labels).map((e,i) => {
            return <option key={i}>{e}</option>
        });

        return (
            <form action="" onSubmit={this.handleSubmit}>
                <input onChange={this.handleChangeAmount} value={this.state.amount} type="number"/>
                <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
                <input type="date" value={this.state.date} onChange={this.handleDateChange} />
                <select onChange={this.handleSelected} value={this.state.label}>
                    <option disabled={true} defaultValue={true}>Choose a label</option>
                    {Labels}
                    <option>Add new label</option>
                </select>
                <button>Submit outflow</button>
            </form>

        );
    }
}