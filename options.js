var saveButton = document.getElementById('saveItems');
var addHomophobic = document.getElementById('addHomophobic');
var addRacist = document.getElementById('addRacist');
var addGeneral = document.getElementById('addGeneral');

var homophobic = [];
var homophobia = document.getElementById('homophobia');
var racist = [];
var racism = document.getElementById('racism');
var sexist = [];
var sexism = document.getElementById('sexism');

chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab){
    if(changeInfo.status == 'complete' && tab.active){
        chrome.storage.sync.get('homophobic', function(storedHomophobic){
            homophobicWords = storedHomophobic.homophobic;
            for(var i = 0; i < homophobicWords.length; i++){
                var lab = document.createElement("label");
                var input = document.createElement("input");
                input.type = "checkbox";
                input.class = "homophobic";
                input.value = homophobicWords[i];
                var node = document.createTextNode(homophobicWords[i]);
                homophobic.push(input);
                lab.appendChild(input);
                lab.appendChild(node);
                homophobia.appendChild(lab);
                homophobia.appendChild(document.createElement("br"));
            };
        });

        chrome.storage.sync.get('racist', function(storedRacist){
            racistWords = storedRacist.racist;
            for(var i = 0; i < racistWords.length; i++){
                var lab = document.createElement("label");
                var input = document.createElement("input");
                input.type = "checkbox";
                input.class = "racist";
                input.value = racistWords[i];
                var node = document.createTextNode(racistWords[i]);
                racist.push(input);
                lab.appendChild(input);
                lab.appendChild(node);
                racism.appendChild(lab);
                racism.appendChild(document.createElement("br"));
            };
        });

        chrome.storage.sync.get('sexist', function(storedSexist){
            sexistWords = storedSexist.sexist;
            for(var i = 0; i < sexistWords.length; i++){
                var lab = document.createElement("label");
                var input = document.createElement("input");
                input.type = "checkbox";
                input.class = "sexist";
                input.value = sexistWords[i];
                var node = document.createTextNode(sexistWords[i]);
                sexist.push(input);
                lab.appendChild(input);
                lab.appendChild(node);
                sexism.appendChild(lab);
                sexism.appendChild(document.createElement("br"));
            };
        });

        chrome.storage.sync.get('block', function(data){
            blockedWords = data.block;
            for(var i = 0; i < homophobic.length; i++){
                homophobic[i].checked = false;
                for(var j = 0; j < blockedWords.length; j++){
                    if(homophobic[i].value == blockedWords[j]){homophobic[i].checked = true;};
                };
            };
            for(var i = 0; i < racist.length; i++){
                racist[i].checked = false;
                for(var j = 0; j < blockedWords.length; j++){
                    if(racist[i].value == blockedWords[j]){racist[i].checked = true;};
                };
            };
            for(var i = 0; i < sexist.length; i++){
                sexist[i].checked = false;
                for(var j = 0; j < blockedWords.length; j++){
                    if(sexist[i].value == blockedWords[j]){sexist[i].checked = true;};
                }
            }
        });
    };
});


saveButton.onclick = function(){
    var wordsToBlock = [];
    for(var i = 0; i < homophobic.length; i++){
        if(homophobic[i].checked == true){
            wordsToBlock.push(homophobic[i].value);
        };
    };
    for(var i = 0; i < racist.length; i++){
        if(racist[i].checked == true){
            wordsToBlock.push(racist[i].value);
        };
    };
    for(var i = 0; i < sexist.length; i++){
        if(sexist[i].checked == true){
            wordsToBlock.push(sexist[i].value);
        };
    };
    chrome.storage.sync.set({'block':wordsToBlock})
};