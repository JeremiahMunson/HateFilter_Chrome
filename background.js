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
});

chrome.webNavigation.onCompleted.addListener(function(){
    if(true){//changeInfo.status == 'complete' && tab.active){
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
        code:   "lowerPars = []; badPars = []; badDisp = [];" +
                "lowerComs = []; badComs = []; badComD = [];" +
                "lowerSubComs = []; badSubComs = []; badSubComD = [];" +
                "lowerDD = []; badDD = []; badDDisp = [];" +
                "lowerDT = []; badDT = []; badTDisp = [];" +
                "lowerQT = []; badQT = []; badQTDisp = [];" +
                "lowerH1 = []; badH1 = []; badH1Disp = [];" +
                "lowerYTD = []; badYTD = []; badYTDDisp = [];" +
                "lowerYTC = []; badYTC = []; badYTCDisp = [];" +
                "lowerTable = []; badTable = []; badTableDisp = [];" +
                "lowerTableHead = []; badTableHead = []; badTableHeadDisp = [];"
    });
    // Looping through all words/phrases to block
    for(var i = 0; i < block.length; i++){
        // Checking paragraphs
        chrome.tabs.executeScript({
            code:   "pars = document.getElementsByTagName('p');" +
                    "for(var i = 0; i < pars.length; i++){" +
                    "   lowerPars.push(pars[i].innerHTML.toLowerCase());" +
                    "   if(lowerPars[i].indexOf('" + block[i] + "') >= 0){" +
                    "       badPars.push(pars[i]);" +
                    "       badDisp.push(pars[i].style.display);" +
                    "       pars[i].style.display = 'none';" +
                    "   }" +
                    "}"
        });
        // Checking Facebook comments
        chrome.tabs.executeScript({
            code:   "fbComments = document.querySelectorAll('[aria-label = \"Comment\"]');" +
                    "for (var i = 0; i < fbComments.length; i++){" +
                    "   lowerComs.push(fbComments[i].innerHTML.toLowerCase());" +
                    "   if(lowerComs[i].indexOf('" + block[i] + "') >= 0){" +
                    "       badComs.push(fbComments[i]);" +
                    "       badComD.push(fbComments[i].style.display);" +
                    "       fbComments[i].style.display = 'none';" +
                    "   }" +
                    "}"
        });
        // Checking Facebook comment replies
        chrome.tabs.executeScript({
            code:   "fbSubComments = document.querySelectorAll('[aria-label = \"Comment reply\"]');" +
                    "for (var i = 0; i < fbSubComments.length; i++){" +
                    "   lowerSubComs.push(fbSubComments[i].innerHTML.toLowerCase());" +
                    "   if(lowerSubComs[i].indexOf('" + block[i] + "') >= 0){" +
                    "       badSubComs.push(fbSubComments[i]);" +
                    "       badSubComD.push(fbSubComments[i].style.display);" +
                    "       fbSubComments[i].style.display = 'none';" +
                    "   }" +
                    "}"
        });
        // Descriptive Lists (dd)
        chrome.tabs.executeScript({
            code:   "dd = document.getElementsByTagName('dd');" +
                    "for(var i = 0; i < dd.length; i++){" +
                    "   lowerDD.push(dd[i].innerHTML.toLowerCase());" +
                    "   if(lowerDD[i].indexOf('" + block[i] + "') >= 0){" +
                    "       badDD.push(dd[i]);" +
                    "       badDDisp.push(dd[i].style.display);" +
                    "       dd[i].style.display = 'none';" +
                    "   }" +
                    "}"
        });
        // Descriptive Lists (dt)
        chrome.tabs.executeScript({
            code:   "dt = document.getElementsByTagName('dt');" +
                    "for (var i = 0; i < dt.length; i++){" +
                    "   lowerDT.push(dt[i].innerHTML.toLowerCase());" +
                    "   if(lowerDT[i].indexOf('" + block[i] + "') >= 0){" +
                    "       badDT.push(dt[i]);" +
                    "       badTDisp.push(dt[i].style.display);" +
                    "       dt[i].style.display = 'none';" +
                    "   }" +
                    "}"
        });
        // Checking twitter quoted tweets
        chrome.tabs.executeScript({
            code:   "qTweet = document.getElementsByClassName('QuoteTweet-container');" +
                    "for(var i = 0; i<qTweet.length; i++){" +
                    "   lowerQT.push(qTweet[i].innerHTML.toLowerCase());" +
                    "   if(lowerQT[i].indexOf('"+block[i]+"') >= 0){" +
                    "       badQT.push(qTweet[i]);" +
                    "       badQTDisp.push(qTweet[i].style.display);" +
                    "       qTweet[i].style.display = 'none';" +
                    "   }" +
                    "}"
        });
        // Checking H1
        chrome.tabs.executeScript({
            code:   "header1 = document.getElementsByTagName('h1');" +
                    "for(var i = 0; i < header1.length; i++){" +
                    "   lowerH1.push(header1[i].innerHTML.toLowerCase());" +
                    "   if(lowerH1[i].indexOf('"+block[i]+"') >= 0){" +
                    "       badH1.push(header1[i]);" +
                    "       badH1Disp.push(header1[i].style.display);" +
                    "       header1[i].style.display = 'none';" +
                    "   }" +
                    "}"
        });
        // Youtube description (DOESN'T WORK)
        chrome.tabs.executeScript({
            code:   "descYT = document.getElementByTagName('yt-formatted-string');" +
                    "for(var i = 0; i < descYT.length; i++){" +
                    "   lowerYTD.push(descYT[i].innerHTML.toLowerCase());" +
                    "   if(lowerYTD[i].indexOf('"+block[i]+"') >= 0){" +
                    "       badYTD.push(descYT[i]);" +
                    "       badYTDDisp.push(descYT[i].style.display);" +
                    "       descYT[i].style.display = 'none';" + 
                    "   }" +
                    "}"
        });
        // YouTube comments
        chrome.tabs.executeScript({
            code:   "commentYT = document.getElementsByClassName('style-scope ytd-comment-thread-renderer');" +
                    "for(var i = 0; i < commentYT.length; i++){" +
                    "   lowerYTC.push(commentYT[i].innerHTML.toLowerCase());" +
                    "   if(lowerYTC[i].indexOf('"+block[i]+"') >= 0){" +
                    "       badYTC.push(commentYT[i]);" +
                    "       badYTCDisp.push(commentYT[i].style.display);" +
                    "       commentYT[i].style.display = 'none';" +
                    "   }" +
                    "}"
        });
        // table contents
        chrome.tabs.executeScript({
            code:   "table = document.getElementsByTagName('td');" +
                    "for(var i = 0; i < table.length; i++){"+
                    "   lowerTable.push(table[i].innerHTML.toLowerCase());" +
                    "   if(lowerTable[i].indexOf('"+block[i]+"') >= 0){" +
                    "       badTable.push(table[i]);" +
                    "       badTableDisp.push(table[i].style.display);" +
                    "       table[i].style.display = 'none';" +
                    "   }" +
                    "}"
        });
        // table heading
        chrome.tabs.executeScript({
            code:   "tableHead = document.getElementsByTagName('th');" +
                    "for(var i = 0; i < tableHead.length; i++){"+
                    "   lowerTableHead.push(tableHead[i].innerHTML.toLowerCase());" +
                    "   if(lowerTableHead[i].indexOf('"+block[i]+"') >= 0){" +
                    "       badTableHead.push(tableHead[i]);" +
                    "       badTableHeadDisp.push(tableHead[i].style.display);" +
                    "       tableHead[i].style.display = 'none';"+
                    "   }" +
                    "}"
        });
    };
};

// This function shows hidden content. I'm thinking this isn't necessary, when the user turns off the extension they can reload the page to see it
// Although this could be problematic for things like facebook were reloading the page changes what's on the page
// Maybe show will be something for later versions
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
    // H1
    chrome.tabs.executeScript({
        code: "for(var j = 0; j < badH1.length; j++){badH1[j].style.display = badH1Disp[j];}"
    });
    //YouTube Description
    chrome.tabs.executeScript({
        code: "for(var j = 0; j < badYTD.length; j++){badYTD[j].style.display = badYTDDisp[j];}"
    });
    //YouTube Comments
    chrome.tabs.executeScript({
        code: "for(var j = 0; j < badYTC.length; j++){badYTC[j].style.display = badYTCDisp[j];}"
    });
    // table contents
    chrome.tabs.executeScript({
        code: "for(var j = 0; j < badTable.length; j++){badTable[j].style.display = badTableDisp[j];}"
    });
    // table header
    chrome.tabs.executeScript({
        code: "for(var j = 0; j < badTableHead.length; j++){badTableHead[j].style.display = badTableHeadDisp[j];}"
    });
};