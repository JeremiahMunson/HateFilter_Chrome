saveButton = document.getElementById('saveItems');
homophobic = document.getElementsByClassName('homophobia');
racist = document.getElementsByClassName('racism');

chrome.tabs.onUpdated.addListener( function(tabId, changeInfo, tab){
    if(changeInfo.status == 'complete' && tab.active){
        chrome.storage.sync.get('block', function(data){
            blockedWords = data.block;
            if(Array.isArray(blockedWords)){window.alert(blockedWords.length);}
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
    chrome.storage.sync.set({'block':wordsToBlock})
};