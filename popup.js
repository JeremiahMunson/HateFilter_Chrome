let activate = document.getElementById('activate');

chrome.storage.sync.get('activated', function(data){
    activated = data.activated;
    if(activated){activate.src = "active48.png";}
    else{activate.src = "deactive48.png";}
});

activate.onclick = function(){
    chrome.storage.sync.get('activated', function(data){
        chrome.storage.sync.get('block', function(block){
            if(!data.activated){
                chrome.storage.sync.set({'activated': true});
                hide(block.block);
                activate.src = "active48.png";
            }
            else{
                chrome.storage.sync.set({'activated': false});
                show();
                activate.src = "deactive48.png";
            };
        });
    });
};

function hide(block){
    // Setting the arrays to be empty. Have to do it before the loop otherwise the arrays before the last loop will be lost because they'll be reset to empty each loop.
    chrome.tabs.executeScript({
        code: "lowerPars = []; badPars = []; badDisp = []; lowerComs = []; badComs = []; badComD = []; lowerSubComs = []; badSubComs = []; badSubComD = []; lowerDD = []; badDD = []; badDDisp = []; lowerDT = []; badDT = []; badTDisp = [];"
    });
    // Looping through all words/phrases to block
    for(var i = 0; i < block.length; i++){
        // Checking all paragraphs
        chrome.tabs.executeScript({
            code: "pars = document.getElementsByTagName('p');  for(var i = 0; i < pars.length; i++){lowerPars.push(pars[i].innerHTML.toLowerCase()); if(lowerPars[i].indexOf('" + block[i] + "') >= 0){ badPars.push(pars[i]); badDisp.push(pars[i].style.display); pars[i].style.display = 'none';}}"
        });
        // Checking Facebook comments
        chrome.tabs.executeScript({
            code: "fbComments = document.querySelectorAll('[aria-label = \"Comment\"]'); for (var i = 0; i < fbComments.length; i++){lowerComs.push(fbComments[i].innerHTML.toLowerCase()); if(lowerComs[i].indexOf('" + block[i] + "') >= 0){badComs.push(fbComments[i]); badComD.push(fbComments[i].style.display); fbComments[i].style.display = 'none';}}"
        });
        // Checking Facebook comment replies
        chrome.tabs.executeScript({
            code: "fbSubComments = document.querySelectorAll('[aria-label = \"Comment reply\"]'); for (var i = 0; i < fbSubComments.length; i++){lowerSubComs.push(fbSubComments[i].innerHTML.toLowerCase()); if(lowerSubComs[i].indexOf('" + block[i] + "') >= 0){badSubComs.push(fbSubComments[i]); badSubComD.push(fbSubComments[i].style.display); fbSubComments[i].style.display = 'none';}}"
        });
        // Descriptive Lists (dd)
        chrome.tabs.executeScript({
            code: "dd = document.getElementsByTagName('dd'); for(var i = 0; i < dd.length; i++){lowerDD.push(dd[i].innerHTML.toLowerCase()); if(lowerDD[i].indexOf('" + block[i] + "') >= 0){badDD.push(dd[i]); badDDisp.push(dd[i].style.display); dd[i].style.display = 'none';}}"
        });
        // Descriptive Lists (dt)
        chrome.tabs.executeScript({
            code: "dt = document.getElementsByTagName('dt'); for (var i = 0; i < dt.length; i++){lowerDT.push(dt[i].innerHTML.toLowerCase()); if(lowerDT[i].indexOf('" + block[i] + "') >= 0){badDT.push(dt[i]); badTDisp.push(dt[i].style.display); dt[i].style.display = 'none';}}"
        })
    };
};

function show(){
    // Paragraphs
    chrome.tabs.executeScript({
        code: "for(var j = 0; j < badPars.length; j++){badPars[j].style.display = badDisp[j];}"
    });
    // Facebook comments
    chrome.tabs.executeScript({
        code: "for(var j = 0; j < badComs.length; j++){badComs[j].style.display = badComD[j];}"
    });
    // Facebook comment replies
    chrome.tabs.executeScript({
        code: "for(var j = 0; j < badSubComs.length; j++){badSubComs[j].style.display = badSubComD[j];}"
    });
    // Descriptive Lists (dd)
    chrome.tabs.executeScript({
        code: "for(var j = 0; j < badDD.length; j++){badDD[j].style.display = badDDisp[j];}"
    });
    // Descriptive Lists (dt)
    chrome.tabs.executeScript({
        code: "for(var j = 0; j < badDT.length; j++){badDT[j].style.display = badTDisp[j];}"
    });
};