import React from "react";
import CodeSelector from "./code-selector.jsx";
import CodeTreeFolder from "./code-tree-folder.jsx";

function CodeWindow(props){

    let element;

    switch(props.type){
        case 'file-tree':
            element = <div className='file-tree-panel'><ul className='list'><CodeTreeFolder clickEvent={props.clickEvent} paths={props.destinationLinks} name={props.destinationLinks['url']}/></ul></div>;
        break;
        case 'selector':
            element = <div className='code-selector'><CodeSelector fileTypes={props.fileTypes} clickEvent={props.clickEvent}/></div>;
        break;
        case 'code-display':
            element = <div className='right-panel'><pre><code>{props.codeToDisplay}</code></pre></div>;
        break;
    }

    return element;
}

export default CodeWindow;