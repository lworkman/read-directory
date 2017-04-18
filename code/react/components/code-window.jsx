import React from "react";
import CodeSelector from "./code-selector.jsx";
import CodeFileTree from "./code-file-tree.jsx";

function CodeWindow(props){

    if (props.type == 'selector'){
        return <div className='code-selector'><CodeSelector clickEvent={props.clickEvent}/></div>;
    }
    if (props.type == 'file-tree'){
        return <div className='file-tree-panel'><CodeFileTree clickEvent={props.clickEvent} documentLinks={props.destinationLinks}/></div>;
    }
}

export default CodeWindow;