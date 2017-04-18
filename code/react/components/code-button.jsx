import React from 'react';

export default class CodeButton extends React.Component{

    constructor(props){
        super(props);
        this.clickFunction = props.clickFunction;
        this.clickFunctionHandler = this.clickFunctionHandler.bind(this);
    }

    clickFunctionHandler(){
        this.clickFunction(this.props.value);
    }

    render() {

        return (<button onClick={this.clickFunctionHandler}>{this.props.value}</button>);
    }
}
