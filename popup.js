let activate = document.getElementById('activate');

activated = false;

activate.onclick = function(){
    if(!activated){
        activated = true;
        chrome.tabs.executeScript({
            code: "pars = document.getElementsByTagName('p'); badPars = []; badDisp = []; for(var i = 0; i < pars.length; i++){pars[i].innerHTML = pars[i].innerHTML.toLowerCase(); if(pars[i].innerHTML.indexOf('it') >= 0){ badPars.push(pars[i]); badDisp.push(pars[i].style.display); pars[i].style.display = 'none';}}"
        });
        this.innerHTML = "Deactivate";
    }
    else{
        activated = false;
        chrome.tabs.executeScript({
            code: "for(var j = 0; j < badPars.length; j++){badPars[j].style.display = badDisp[j];}"
        });
        this.innerHTML = "Activate";
    };
};