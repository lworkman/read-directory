import React from 'react';

export default class CodeSelector extends React.Component{

    constructor(props){
        super(props);
        this.links = props.documentLinks;
        this.clickFunction = props.clickEvent;
    }

    clickClick(URL){
        this.clickFunction(URL);
    }

    render() {
        let elements = [];

        const clickClick = this.clickClick;
        const self = this;

        this.links.forEach(function(element){
            elements.push(<li key={element}><button onClick={clickClick.bind(self,element)} href={element}>{element}</button></li>);
        })

        return (<ul>{elements}</ul>);
    }
}
