import React from 'react';

function CodeButton(props){

    function clickFunctionHandler(){
        props.clickFunction(props.value);
    }


    let name = props.value.split('/');

    name = name[name.length-1];
    return (<button className='code-select-item' onClick={clickFunctionHandler}>{name}</button>);
}

export default CodeButton;