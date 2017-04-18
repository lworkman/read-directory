var xhrDirectory = new XMLHttpRequest();
var xhrFiles = new XMLHttpRequest();
var arrayOfPaths = [];
var codeURL = '';


xhrFiles.addEventListener("readystatechange", renderText, false);
xhrDirectory.addEventListener("readystatechange", buildDirectoryList, false);

function getTextFromURL(url){
    xhrFiles.open('Get',url,true);
    xhrFiles.send();
}
function getDirectoryFromURL(){
    xhrDirectory.open('GET',codeURL,true);
    xhrDirectory.send();
}

function renderText(e){
    if (xhrFiles.readyState == 4 && xhrFiles.status == 200) {

        console.log(xhrFiles.response);

        // var codeblock = document.getElementById("code");
        // codeblock.innerText = xhrFiles.response;
    }
}

// function buildListOfLinksToDocuments(){
//         document.getElementById('left-panel-list').innerHTML = '';
//         arrayOfPaths.forEach(function(element){
//             var anchor = document.createElement("button");
//             var listItem = document.createElement("li");
//             anchor.href = element;
//             anchor.innerText = element;
//             anchor.addEventListener('click',getTextFromURL,false);
//             listItem.appendChild(anchor);
//             document.getElementById('left-panel-list').appendChild(listItem);
//         })
// }

function buildDirectoryList() {
    if (xhrDirectory.readyState == 4 && xhrDirectory.status == 200) {

        var parser = new DOMParser();
        var parsedResponse = parser.parseFromString(xhrDirectory.response,"text/html");

        var list = parsedResponse.getElementsByTagName('a');

        arrayOfPaths = [];

        Object.keys(list).forEach(function (key){
           if (list[key].innerHTML != " Parent Directory"){
               arrayOfPaths.push(codeURL+"/"+list[key].innerHTML.replace(/\s/g,''));
           }
        });

        // buildListOfLinksToDocuments();
    }
}

function changeCodeType(e){
    codeURL = "./code/"+e.value;
    getDirectoryFromURL();
}