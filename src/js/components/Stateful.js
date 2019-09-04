import React, {Component} from 'react';
class Stateful extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: "Minesweeper"
        }
    }
    render() {
        return (
            <h1>{this.state.title}</h1>
        )
    }
}

export default Stateful;
