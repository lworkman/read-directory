import React from 'react';
import CodeButton from './code-button.jsx';

function CodeSelector(props){

    let types = props.fileTypes;
    let elements = [];

    types.forEach(function(element){
        elements.push(<li key={element} className='code-select-item' ><CodeButton clickFunction={props.clickEvent} key={element} value={element}/></li>);
    })

    return <ul>{elements}</ul>;
}


export default CodeSelector;
