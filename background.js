chrome.runtime.onInstalled.addListener(function() {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({})],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
    chrome.storage.sync.set({'activated': false});
});

chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab){
  if(changeInfo.status == 'complete' && tab.active){
    chrome.storage.sync.get('activated', function(data){
      activated = data.activated;
      if(activated){
        chrome.tabs.executeScript({
          code: "pars = document.getElementsByTagName('p'); lowerPars = []; badPars = []; badDisp = []; for(var i = 0; i < pars.length; i++){lowerPars.push(pars[i].innerHTML.toLowerCase()); if(lowerPars[i].indexOf('it') >= 0){ badPars.push(pars[i]); badDisp.push(pars[i].style.display); pars[i].style.display = 'none';}}"
        });
      }
      else{
        chrome.tabs.executeScript({
          code: "for(var j = 0; j < badPars.length; j++){badPars[j].style.display = badDisp[j];}"
        });
      };
    });
  };
});
