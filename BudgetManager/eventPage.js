var contextMenuItem = {
    "id": "spendMoney", 
    "title": "SpendMoney",
    "contexts": ["selection"]
};
chrome.contextMenus.create(contextMenuItem);

function isInt(value) {
    return !isNaN(value) &&
            parseInt(Number(value)) == value &&
            !isNaN(parseInt(value, 10));        
}

chrome.contextMenus.onClicked.addListener(function(clickData){
    //if user clicked on the option thing and has selected something
    if (clickData.menuItemId == "spendMoney" && clickData.selectionText){
        //if selected text is an integer
        if(isInt(clickData.selectionText)){
            chrome.storage.sync.get(['total', 'limit'], function(budget){
                var newTotal = 0;
                if(budget.total){
                    newTotal += parseInt(budget.total);
                }

                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({'total': newTotal}, function(){
                    if(newTotal >= budget.limit){
                        var notifOptions = {
                            type: "basic",
                            iconUrl: "icon48.png",
                            title: 'Total reset!',
                            message: "Total has been reset to 0!"
                        };
                        chrome.notifications.create('limitNotif', notifOptions);
                    }
                });
            });
        }
    }
});

chrome.storage.onChanged.addListener(function(changes, storageName){
    chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()});

}); 