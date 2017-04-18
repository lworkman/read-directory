import React from "react";
import CodeWindow from "../components/code-window.jsx";

export default class CodePanel extends React.Component{

    constructor(){
        super();
        this.state = {
            'code': 'react',
            'documentLinks': ['code/']
        }
        this.directoryList = {};
        this.changeCodeState = this.changeCodeState.bind(this);
        this.retrieveDirectoryFromURL = this.retrieveDirectoryFromURL.bind(this);
    }

    changeCodeState(value){
        this.setState({'code':value});
    }

    retrieveDirectoryFromURL(URL,parent){
        const xhrDirectory = new XMLHttpRequest();
        xhrDirectory.onreadystatechange = this.readDirectoryResponse.bind(this,xhrDirectory,URL,parent);
        xhrDirectory.open('GET',URL,true);
        xhrDirectory.send();
    }
    
    readDirectoryResponse(xhr,URL,parent){
        if (xhr.readyState == 4 && xhr.status == 200){

            const parser = new DOMParser();
            const responseInHTML = parser.parseFromString(xhr.response,"text/html");
            const listOfAnchors = responseInHTML.getElementsByTagName('a');
            let directoryHierarchy = [];

            Object.keys(listOfAnchors).forEach(function (key){
                if (listOfAnchors[key].innerHTML != " Parent Directory" && listOfAnchors[key].innerHTML.indexOf('.') != -1){
                    directoryHierarchy.push(listOfAnchors[key].innerHTML.replace(/\s/g,''));
                }
                else if (listOfAnchors[key].innerHTML != " Parent Directory"){
                    this.retrieveDirectoryFromURL(URL+listOfAnchors[key].innerHTML.replace(/\s/g,''),URL);
                }
            },this)

            let item = {
                'url': URL,
                'paths': directoryHierarchy
            };
            if (typeof parent != 'undefined'){
                let parentArray = parent.split('/');
                let URLArray = URL.split('/');
                let properParent = this.directoryList;
                let displayParent = '';

                parentArray.forEach(function(element){
                    if (element != ""){
                        properParent = properParent[element+'/'];
                    }
                })

                properParent[URLArray[URLArray.length-2]+'/'] = item;
            }
            else {
                item['parent'] = undefined;
                this.directoryList[URL] = item;
            }
            console.log(this.directoryList)
        }
    }

    render() {

        return (<div className='code-panel'>
                <CodeWindow type='selector' clickEvent={this.changeCodeState} />
                <CodeWindow type='file-tree' destinationLinks={this.state.documentLinks} clickEvent={this.retrieveDirectoryFromURL} />
                </div>)
    }
}
