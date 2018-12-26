var add = true;

var saveButton = document.getElementById('saveItems');
var removeButton = document.getElementById('removeItems');
var cancelButton = document.getElementById('cancelRemove');

// The following are the add boxes for each category
var addHomophobic = document.getElementById('addHomophobic');
var addRacist = document.getElementById('addRacist');
var addSexist = document.getElementById('addSexist');
var addOther2 = document.getElementById('addOther2');

// The following are the text boxes for each category
var homophobicTxt = document.getElementById('homophobicWord');
var racistTxt = document.getElementById('racistWord');
var sexistTxt = document.getElementById('sexistWord');
var other2Txt = document.getElementById('other2Word');

// Some examples of what the follow variables do...
// Example: homophobic - list of homophobic words/phrases
// Example: homophobia - div where list of homophobic words 
//  is included in webpage.
var homophobic = [];
var homophobia = document.getElementById('homophobia');
var racist = [];
var racism = document.getElementById('racism');
var sexist = [];
var sexism = document.getElementById('sexism');
var other2 = [];
var other1 = document.getElementById('other1');

// This 'begin' is so that the section below only occurs when
//  the page is manually reloaded. I had a problem where letting
//  the page sit open while doing other things it would keep
//  updating and there would be the same word/phrase shown
//  multiple times.
var begin = true;
chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab){
    if (changeInfo.status == 'complete' && tab.active && begin) {
        begin = false;
        // The following get the words/phrases from each category
        //  and adds them to the webpage.
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

        // Goes through all of the words/phrases to block
        //  and selects the words on the webpage that should be blocked.
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

        // Hides the error/alet section that should only be shown if user
        //  tries adding word/phrase that is already in that category.
        document.getElementById('HomophobicRepeat').style.display = "none";
        document.getElementById('RacistRepeat').style.display = "none";
        document.getElementById('SexistRepeat').style.display = 'none';
        document.getElementById('Other2Repeat').style.display = 'none';

        cancelButton.style.display = "none";
    };
});

// The following makes it so pressing the enter key in a text box
//  that adds a word/phrase acts as pressing the add button.
homophobicTxt.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        addHomophobic.click();
    }
});
racistTxt.addEventListener("keyup", function(event){
    event.preventDefault();
    if(event.keyCode === 13){
        addRacist.click();
    }
});
sexistTxt.addEventListener("keyup", function(event){
    event.preventDefault();
    if(event.keyCode === 13){
        addSexist.click();
    }
});
other2Txt.addEventListener("keyup", function(event){
    event.preventDefault();
    if(event.keyCode === 13){
        addOther2.click();
    }
});

// This updates the storage so that the words/phrases selected
//  or deselected are updated to be blocked or not blocked.
saveButton.onclick = function(){
    var wordsToBlock = [];
    document.getElementById('HomophobicRepeat').style.display = "none";
    document.getElementById('RacistRepeat').style.display = "none";
    document.getElementById('SexistRepeat').style.display = 'none';
    document.getElementById('Other2Repeat').style.display = 'none';

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

// The following adds words/phrases to each category and selects
//  them. Also checks if word/phrase already exists in that
//  particular category and shows alert if it is already there.
addHomophobic.onclick = function(){
    var homophobicToAdd = document.getElementById('homophobicWord').value.toLowerCase();
    var wordRepeat = false;
    document.getElementById('RacistRepeat').style.display = "none";
    document.getElementById('SexistRepeat').style.display = 'none';
    document.getElementById('Other2Repeat').style.display = 'none';

    chrome.storage.sync.get('homophobic', function(homophobicWords){
        var words = homophobicWords.homophobic;
        for(var i = 0; i < words.length; i++){
            if(homophobicToAdd == words[i]){
                wordRepeat = true;
                document.getElementById('HomophobicRepeat').style.display = "block";
                break;
            };
        };
        if(!wordRepeat){
            words.push(homophobicToAdd);
            chrome.storage.sync.set({'homophobic': words});
            document.getElementById('HomophobicRepeat').style.display = "none";
        
            var lab = document.createElement("label");
            var input = document.createElement("input");
            input.type = "checkbox";
            input.class = "homophobic";
            input.value = homophobicToAdd;
            input.checked = true;
            var node = document.createTextNode(homophobicToAdd);
            homophobic.push(input);
            lab.appendChild(input);
            lab.appendChild(node);
            homophobia.appendChild(lab);
            homophobia.appendChild(document.createElement("br"));

            labels = document.getElementsByTagName("label");

            var homophobicLabels = document.getElementsByClassName('homophobic');
        };
    });
    chrome.storage.sync.get('block', function(blocking){
        var block = blocking.block;
        block.push(homophobicToAdd);
        chrome.storage.sync.set({'block': block});
    });
};
addRacist.onclick = function(){
    var racistToAdd = document.getElementById('racistWord').value.toLowerCase();
    var wordRepeat = false;
    document.getElementById('HomophobicRepeat').style.display = "none";
    document.getElementById('SexistRepeat').style.display = 'none';
    document.getElementById('Other2Repeat').style.display = 'none';

    chrome.storage.sync.get('racist', function(racistWords){
        var words = racistWords.racist;
        for(var i = 0; i < words.length; i++){
            if(racistToAdd == words[i]){
                document.getElementById('RacistRepeat').style.display = "block";
                wordRepeat = true;
                break;
            };
        };
        if(!wordRepeat){
            words.push(racistToAdd);
            chrome.storage.sync.set({'racist':words});
            document.getElementById('RacistRepeat').style.display = "none";
        
            var lab = document.createElement("label");
            var input = document.createElement("input");
            input.type = "checkbox";
            input.class = "racist";
            input.value = racistToAdd;
            input.checked = true;
            var node = document.createTextNode(racistToAdd);
            racist.push(input);
            lab.appendChild(input);
            lab.appendChild(node);
            racism.appendChild(lab);
            racism.appendChild(document.createElement("br"));

            labels = document.getElementsByTagName("label");

            var racistLabels = document.getElementsByClassName('racist');
        };
    });
    chrome.storage.sync.get('block', function(blocking){
        var block = blocking.block;
        block.push(racistToAdd);
        chrome.storage.sync.set({'block': block});
    });
};
addSexist.onclick = function(){
    var sexistToAdd = document.getElementById('sexistWord').value.toLowerCase();
    var wordRepeat = false;
    document.getElementById('HomophobicRepeat').style.display = "none";
    document.getElementById('RacistRepeat').style.display = "none";
    document.getElementById('Other2Repeat').style.display = 'none';

    chrome.storage.sync.get('sexist', function(sexistWords){
        var words = sexistWords.sexist;
        for(var i = 0; i < words.length; i++){
            if(sexistToAdd == words[i]){
                wordRepeat = true;
                document.getElementById('SexistRepeat').style.display = 'block';
                break;
            };
        };
        if(!wordRepeat){
            words.push(sexistToAdd);
            chrome.storage.sync.set({'sexist':words});
            document.getElementById('SexistRepeat').style.display = 'none';
        
            var lab = document.createElement("label");
            var input = document.createElement("input");
            input.type = "checkbox";
            input.class = "sexist";
            input.value = sexistToAdd;
            input.checked = true;
            var node = document.createTextNode(sexistToAdd);
            sexist.push(input);
            lab.appendChild(input);
            lab.appendChild(node);
            sexism.appendChild(lab);
            sexism.appendChild(document.createElement("br"));

            labels = document.getElementsByTagName("label");

            var sexistLabels = document.getElementsByClassName('sexist');
        };
    });
    chrome.storage.sync.get('block', function(blocking){
        var block = blocking.block;
        block.push(sexistToAdd);
        chrome.storage.sync.set({'block': block});
    });
};
addOther2.onclick = function(){
    var other2ToAdd = document.getElementById('other2Word').value.toLowerCase();
    var wordRepeat = false;
    document.getElementById('HomophobicRepeat').style.display = "none";
    document.getElementById('RacistRepeat').style.display = "none";
    document.getElementById('SexistRepeat').style.display = 'none';

    chrome.storage.sync.get('other2', function(other2Words){
        var words = other2Words.other2;
        for(var i = 0; i < words.length; i++){
            if(other2ToAdd == words[i]){
                wordRepeat = true;
                document.getElementById('Other2Repeat').style.display = 'block';
                break;
            };
        };
        if(!wordRepeat){
            words.push(other2ToAdd);
            chrome.storage.sync.set({'other2':words});
            document.getElementById('Other2Repeat').style.display = 'none';
        
            var lab = document.createElement("label");
            var input = document.createElement("input");
            input.type = "checkbox";
            input.class = "other2";
            input.value = other2ToAdd;
            input.checked = true;
            var node = document.createTextNode(other2ToAdd);
            other2.push(input);
            lab.appendChild(input);
            lab.appendChild(node);
            other1.appendChild(lab);
            other1.appendChild(document.createElement("br"));
            
            labels = document.getElementsByTagName("label");

            var other2Labels = document.getElementsByClassName('other2');
        };
    });
    chrome.storage.sync.get('block', function(blocking){
        var block = blocking.block;
        block.push(other2ToAdd);
        chrome.storage.sync.set({'block':block});
    });
};

removeButton.onclick = function(){
    document.getElementById('HomophobicRepeat').style.display = "none";
    document.getElementById('RacistRepeat').style.display = "none";
    document.getElementById('SexistRepeat').style.display = 'none';
    document.getElementById('Other2Repeat').style.display = 'none';
    // add == true when switching to the remove
    // add == false means selected words/phrases are removed
    if(add){
        for(var i = 0; i < homophobic.length; i++){ homophobic[i].checked = false; }
        for(var i = 0; i < racist.length; i++){ racist[i].checked = false; }
        for(var i = 0; i < sexist.length; i++){ sexist[i].checked = false; }
        for(var i = 0; i < other2.length; i++){ other2[i].checked = false; }

        saveButton.style.display = "none";
        cancelButton.style.display = "inline";
        add = false;
    }   
    else{
        chrome.storage.sync.get('block', function(data){
            blockedWords = data.block;
            homophobicNotDeleted = [];
            racistNotDeleted = [];
            sexistNotDeleted = [];
            other2NotDeleted = [];

            // HOMOPHOBIC
            for(var i = 0; i < homophobic.length; i++){
                if(homophobic[i].checked == false){
                    homophobicNotDeleted.push(homophobic[i].value);
                    for(var j = 0; j < blockedWords.length; j++){
                        if(homophobic[i].value == blockedWords[j]){homophobic[i].checked = true;};
                    };
                };
            };
            chrome.storage.sync.set({"homophobic": homophobicNotDeleted});

            // RACIST
            for(var i = 0; i < racist.length; i++){
                if(racist[i].checked == false){
                    racistNotDeleted.push(racist[i].value);
                    for(var j = 0; j < blockedWords.length; j++){
                        if(racist[i].value == blockedWords[j]){racist[i].checked = true;};
                    };
                };
            };
            chrome.storage.sync.set({"racist": racistNotDeleted});
            
            // SEXIST
            for(var i = 0; i < sexist.length; i++){
                if(sexist[i].checked == false){
                    sexistNotDeleted.push(sexist[i].value);
                    for(var j = 0; j < blockedWords.length; j++){
                        if(sexist[i].value == blockedWords[j]){sexist[i].checked = true;};
                    };
                };
            };
            chrome.storage.sync.set({"sexist":sexistNotDeleted});

            // OTHER2
            for(var i = 0; i < other2.length; i++){
                if(other2[i].checked == false){
                    other2NotDeleted.push(other2[i].value);
                    for(var j = 0; j < blockedWords.length; j++){
                        if(other2[i].value == blockedWords[j]){other2[i].checked = true;};
                    };
                };
            };
            chrome.storage.sync.set({"other2":other2NotDeleted});

            blockNotDeleted = homophobicNotDeleted.concat(racistNotDeleted, sexistNotDeleted, other2NotDeleted);
            chrome.storage.sync.set({'block': blockNotDeleted});
        });
        saveButton.style.display = "inline";
        cancelButton.style.display = "none";
        add = true;
        location.reload();
    };
};

cancelButton.onclick = function(){
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
    saveButton.style.display = "inline";
    cancelButton.style.display = "none";
}