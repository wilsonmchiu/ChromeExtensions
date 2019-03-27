$(function(){

    chrome.storage.sync.get('limit', function(budget){
        $('#limit').val(budget.limit);
    });
    
    //when user clickes the save limit button
    $('#saveLimit').click(function(){
        //retrive the limit value
        var limit = $('#limit').val();
        if(limit){
            chrome.storage.sync.set({'limit': limit}, function(){
                //closes the tab
                close();
            });
        }
    });

    //when resetting total, just change to 0
    $('#resetTotal').click(function(){
        chrome.storage.sync.set({'total': 0}, function(){
            var notifOptions = {
                type: "basic",
                iconUrl: "icon48.png",
                title: 'Total reset!',
                message: "Total has been reset to 0!"
            };
            chrome.notifications.clear("limitNotif");
            chrome.notifications.create('limitNotif', notifOptions);
            //chrome.notifications.clear("limitNotif");
        });
    });

});