chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({})],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
    chrome.storage.sync.set({'activated': false});
    var homophobic = ['fag', 'faggot', 'queer', 'peter puffer'];
    var racist = ["cracker", "nigger", "chink", "wet back"];
    var sexist = ['bitch', 'cunt', 'whore', 'slut'];
    var other2 = ['dumbass', 'jackass', 'hick', 'hillbilly'];
    var blockOptions = homophobic.concat(racist, sexist, other2);
    chrome.storage.sync.set({'block': blockOptions});
    chrome.storage.sync.set({'homophobic':homophobic});
    chrome.storage.sync.set({'racist': racist});
    chrome.storage.sync.set({'sexist': sexist});
    chrome.storage.sync.set({'other2': other2});
/*
    chrome.storage.sync.set({'repeatHomophobic': false});
    chrome.storage.sync.set({'repeatRacist': false});
    chrome.storage.sync.set({'repeatSexist': false});
    chrome.storage.sync.set({'repeatOther2': false});*/
});

chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab){
    if(changeInfo.status == 'complete' && tab.active){
        chrome.storage.sync.get('activated', function(data){
            chrome.storage.sync.get('block', function(block){
                if(data.activated){hide(block.block);}
                else{show();};
            });
        });
    };
});

function hide(block){
    // Setting the arrays to be empty. Have to do it before the loop otherwise the arrays before the last loop will be lost because they'll be reset to empty each loop.
    chrome.tabs.executeScript({
        code: "lowerPars = []; badPars = []; badDisp = []; lowerComs = []; badComs = []; badComD = []; lowerSubComs = []; badSubComs = []; badSubComD = []; lowerDD = []; badDD = []; badDDisp = []; lowerDT = []; badDT = []; badTDisp = []; lowerQT = []; badQT = []; badQTDisp = [];"
    });
    // Looping through all words/phrases to block
    for(var i = 0; i < block.length; i++){
        // Checking paragraphs
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
        });
        // Checking twitter quoted tweets
        chrome.tabs.executeScript({
            code: "qTweet = document.getElementsByClassName('QuoteTweet-container'); for(var i = 0; i<qTweet.length; i++){lowerQT.push(qTweet[i].innerHTML.toLowerCase()); if(lowerQT[i].indexOf('"+block[i]+"') >= 0){badQT.push(qTweet[i]); badQTDisp.push(qTweet[i].style.display); qTweet[i].style.display = 'none';}}"
        });
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
    // Quoted Tweets
    chrome.tabs.executeScript({
        code: "for(var j = 0; j < badQT.length; j++){badQT[j].style.display = badQTDisp[j];}"
    });
};