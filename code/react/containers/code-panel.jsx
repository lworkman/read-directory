import React from "react";
import CodeWindow from "../components/code-window.jsx";

export default class CodePanel extends React.Component{

    constructor(){
        super();
        this.state = {
            'code': 'react',
            'directoryList': {},
            'loaded': false
        }
        this.retrieveDirectoryFromURL('code/');
        this.changeCodeState = this.changeCodeState.bind(this);
        this.sentRequests = 0;
        this.loadedRequests = 0;
    }

    changeCodeState(value){
        this.setState({'code':value});
    }

    retrieveDirectoryFromURL(URL,parent){
        const xhrDirectory = new XMLHttpRequest();
        xhrDirectory.onreadystatechange = this.readDirectoryResponse.bind(this,xhrDirectory,URL,parent);
        xhrDirectory.open('GET',URL,true);
        xhrDirectory.send();
        this.sentRequests ++;
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
                    this.loadedRequests ++;
                    this.retrieveDirectoryFromURL(URL+listOfAnchors[key].innerHTML.replace(/\s/g,''),URL);
                }
            },this)

            let item = {
                'url': URL,
                'paths': directoryHierarchy
            };

            let tempDirectoryList = Object.assign({},this.state.directoryList);

            if (typeof parent != 'undefined'){
                let parentArray = parent.split('/');
                let URLArray = URL.split('/');
                let properParent = tempDirectoryList;
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
                tempDirectoryList[URL] = item;
            }

            if (this.loadedRequests == this.sentRequests && this.sentRequests != 0){
                this.setState({'loaded': true})
            }

            this.setState({'directoryList': tempDirectoryList});
            console.log(tempDirectoryList);
        }
    }

    render() {

            return (<div className='code-panel'>
                    <CodeWindow type='selector' clickEvent={this.changeCodeState} />
                    <CodeWindow type='file-tree' destinationLinks={this.state.directoryList} clickEvent={this.retrieveDirectoryFromURL} />
                    </div>)
    }
}
