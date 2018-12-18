let activate = document.getElementById('activate');

chrome.storage.sync.get('activated', function(data){
    activated = data.activated;
    if(activated){activate.innerHTML = "Deactivate";}
    else{activate.innerHTML = "Activate";}
});

activate.onclick = function(){
    chrome.storage.sync.get('activated', function(data){activated = data.activated;
        if(!activated){
            chrome.storage.sync.set({'activated': true});
            chrome.tabs.executeScript({
                code: "pars = document.getElementsByTagName('p'); lowerPars = []; badPars = []; badDisp = []; for(var i = 0; i < pars.length; i++){lowerPars.push(pars[i].innerHTML.toLowerCase()); if(lowerPars[i].indexOf('it') >= 0){ badPars.push(pars[i]); badDisp.push(pars[i].style.display); pars[i].style.display = 'none';}}"
            });
            activate.innerHTML = "Deactivate";
        }
        else{
            chrome.storage.sync.set({'activated': false});
            chrome.tabs.executeScript({
                code: "for(var j = 0; j < badPars.length; j++){badPars[j].style.display = badDisp[j];}"
            });
            activate.innerHTML = "Activate";
        };
    });
    
};