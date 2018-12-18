let activate = document.getElementById('activate');

activate.onclick = function() {
    chrome.tabs.executeScript({
        /*code: 'paragraphs = document.getElementsByTagName("p"); badParagraphs = [];',
        code: 'for (var i = 0; i < paragraphs.length; i++){paragraphs[i].innerHTML.toLowerCase(); if (paragraphs[i].innerHTML.indexOf("api") >= 0) {badParagraphs.push(paragraphs[i]);}}',
        code: 'for(var j = 0; j < badParagraphs.length; j++){badParagraphs[j].style.display = "none";}',*/
        code: "pars = document.getElementsByTagName('p'); for(var i = 0; i < pars.length; i++){pars[i].innerHTML = pars[i].innerHTML.toLowerCase(); if(pars[i].innerHTML.indexOf('api') >= 0){pars[i].style.display = 'none';}}"
    });
};