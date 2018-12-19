chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({})],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
    chrome.storage.sync.set({'activated': false});
    var blockOptions = ["fag", "faggot", "queer", "peter puffer", "cracker", "nigger", "chink", "wet back"];
    chrome.storage.sync.set({'block': blockOptions});
});

chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab){
  if(changeInfo.status == 'complete' && tab.active){
    chrome.storage.sync.get('activated', function(data){activated = data.activated;
      chrome.storage.sync.get('block', function(block){wordsToBlock = block.block
        if(!activated){
            hide(wordsToBlock);
        }
        else{
            show();
        };
      });
    });
  };
});

function hide(block){
  // Looping through all words/phrases to block
  for(var i = 0; i < block.length; i++){
      // Checking all paragraphs
      chrome.tabs.executeScript({
          code: "pars = document.getElementsByTagName('p'); lowerPars = []; badPars = []; badDisp = []; for(var i = 0; i < pars.length; i++){lowerPars.push(pars[i].innerHTML.toLowerCase()); if(lowerPars[i].indexOf(" + block[i] + ") >= 0){ badPars.push(pars[i]); badDisp.push(pars[i].style.display); pars[i].style.display = 'none';}}"
      });
      // Checking Facebook comments
      chrome.tabs.executeScript({
          code: "fbComments = document.querySelectorAll('[aria-label = \"Comment\"]'); lowerComs = []; badComs = []; badComD = []; for (var i = 0; i < fbComments.length; i++){lowerComs.push(fbComments[i].innerHTML.toLowerCase()); if(lowerComs[i].indexOf(" + block[i] + ") >= 0){badComs.push(fbComments[i]); badComD.push(fbComments[i].style.display); fbComments[i].style.display = 'none';}}"
      });
      // Checking Facebook comment replies
      chrome.tabs.executeScript({
          code: "fbSubComments = document.querySelectorAll('[aria-label = \"Comment reply\"]'); lowerSubComs = []; badSubComs = []; badSubComD = []; for (var i = 0; i < fbSubComments.length; i++){lowerSubComs.push(fbSubComments[i].innerHTML.toLowerCase()); if(lowerSubComs[i].indexOf(" + block[i] + ") >= 0){badSubComs.push(fbSubComments[i]); badSubComD.push(fbSubComments[i].style.display); fbSubComments[i].style.display = 'none';}}"
      });
  };
};

function show(){
  chrome.tabs.executeScript({
      code: "for(var j = 0; j < badPars.length; j++){badPars[j].style.display = badDisp[j];}"
  });
  chrome.tabs.executeScript({
      code: "for(var j = 0; j < badComs.length; j++){badComs[j].style.display = badComD[j];}"
  });
  chrome.tabs.executeScript({
      code: "for(var j = 0; j < badSubComs.length; j++){badSubComs[j].style.display = badSubComD[j];}"
  });
};
