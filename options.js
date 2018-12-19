var saveButton = document.getElementById('saveItems');
var addHomophobic = document.getElementById('addHomophobic');
var addRacist = document.getElementById('addRacist');
var addSexist = document.getElementById('addSexist');
var addOther2 = document.getElementById('addOther2')

var homophobic = [];
var homophobia = document.getElementById('homophobia');
var racist = [];
var racism = document.getElementById('racism');
var sexist = [];
var sexism = document.getElementById('sexism');
var other2 = [];
var other1 = document.getElementById('other1');

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

        chrome.storage.sync.get('other2', function(storedOther2){
            other2Words = storedOther2.other2;
            for(var i = 0; i < other2Words.length; i++){
                var lab = document.createElement("label");
                var input = document.createElement("input");
                input.type = "checkbox";
                input.class = "other2";
                input.value = other2Words[i];
                var node = document.createTextNode(other2Words[i]);
                other2.push(input);
                lab.appendChild(input);
                lab.appendChild(node);
                other1.appendChild(lab);
                other1.appendChild(document.createElement("br"));
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
                };
            };
            for(var i = 0; i < other2.length; i++){
                other2[i].checked = false;
                for(var j = 0; j < blockedWords.length; j++){
                    if(other2[i].value == blockedWords[j]){other2[i].checked = true;};
                };
            };
        });
    };
});


saveButton.onclick = function(){
    var wordsToBlock = [];
    for(var i = 0; i < homophobic.length; i++){
        if(homophobic[i].checked){
            wordsToBlock.push(homophobic[i].value);
        };
    };
    for(var i = 0; i < racist.length; i++){
        if(racist[i].checked){
            wordsToBlock.push(racist[i].value);
        };
    };
    for(var i = 0; i < sexist.length; i++){
        if(sexist[i].checked){
            wordsToBlock.push(sexist[i].value);
        };
    };
    for(var i = 0; i < other2.length; i++){
        if(other2[i].checked){
            wordsToBlock.push(other2[i].value);
        };
    };
    chrome.storage.sync.set({'block':wordsToBlock})
};

addHomophobic.onclick = function(){
    var homophobicToAdd = document.getElementById('homophobicWord').value.toLowerCase();
    chrome.storage.sync.get('homophobic', function(homophobicWords){
        var words = homophobicWords.homophobic;
        words.push(homophobicToAdd);
        chrome.storage.sync.set({'homophobic': words});
    });
    chrome.storage.sync.get('block', function(blocking){
        var block = blocking.block;
        block.push(homophobicToAdd);
        chrome.storage.sync.set({'block': block});
    });
    chrome.tabs.reload();
};

addRacist.onclick = function(){
    var racistToAdd = document.getElementById('racistWord').value.toLowerCase();
    chrome.storage.sync.get('racist', function(racistWords){
        var words = racistWords.racist;
        words.push(racistToAdd);
        chrome.storage.sync.set({'racist':words});
    });
    chrome.storage.sync.get('block', function(blocking){
        var block = blocking.block;
        block.push(racistToAdd);
        chrome.storage.sync.set({'block': block});
    });
    chrome.tabs.reload();
};

addSexist.onclick = function(){
    var sexistToAdd = document.getElementById('sexistWord').value.toLowerCase();
    chrome.storage.sync.get('sexist', function(sexistWords){
        var words = sexistWords.sexist;
        words.push(sexistToAdd);
        chrome.storage.sync.set({'sexist':words});
    });
    chrome.storage.sync.get('block', function(blocking){
        var block = blocking.block;
        block.push(sexistToAdd);
        chrome.storage.sync.set({'block': block});
    });
    chrome.tabs.reload();
};

addOther2.onclick = function(){
    var other2ToAdd = document.getElementById('other2Word').value.toLowerCase();
    chrome.storage.sync.get('other2', function(other2Words){
        var words = other2Words.other2;
        words.push(other2ToAdd);
        chrome.storage.sync.set({'other2':words});
    });
    chrome.storage.sync.get('block', function(blocking){
        var block = blocking.block;
        block.push(other2ToAdd);
        chrome.storage.sync.set({'block':block});
    });
    chrome.tabs.reload();
};