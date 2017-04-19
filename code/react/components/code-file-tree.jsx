import React from 'react';

export default class CodeSelector extends React.Component{

    constructor(props){
        super(props);
        this.links = props.documentLinks;
        this.clickFunction = props.clickEvent;

        console.log(this.links);

        //this.recursiveObjectWriter(this.links);
    }

    recursiveObjectWriter(object){
        const badKeys = ['paths','parent','url'];
        Object.keys(object).forEach(function(key){
            if (badKeys.indexOf(key) == -1){
                console.log(object[key]);
                this.recursiveObjectWriter(object[key]);
            }
        },this);
    }

    clickClick(URL){
        this.clickFunction(URL);
    }

    render() {
        // let elements = [];

        // const clickClick = this.clickClick;
        // const self = this;

        // this.links.forEach(function(element){
        //     elements.push(<li key={element}><button onClick={clickClick.bind(self,element)} href={element}>{element}</button></li>);
        // })

        return (<p>heyy</p>);
    }
}
