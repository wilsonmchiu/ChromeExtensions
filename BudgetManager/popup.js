$(function(){

    //getting the stored value when opening it up
    chrome.storage.sync.get(['total', 'limit'], function(budget){
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    });


    //button called spendAmount
    $('#spendAmount').click(function(){

        //getting the total amount from the chrome storage
        //budget is an OBJECT with a 'quality' of total
        chrome.storage.sync.get(['total', 'limit'], function(budget){
            var newTotal = 0; 

            //checking if the budget total is 0 & present
            if(budget.total){
                newTotal+= parseInt(budget.total);
            }

            //putting in the amount of money you want to spend
            var amount = $('#amount').val();

            //adds the new amount to the total
            if(amount){
                newTotal += parseInt(amount);
            }

            //sends the information back to the chrome storage to retrieve
            chrome.storage.sync.set({'total': newTotal}, function(){               
                if (parseInt(amount) && newTotal >= parseInt(budget.limit)){
                    var notifOptions = {
                        type: "basic",
                        iconUrl: "icon48.png",
                        title: "Limit reached!",
                        message: "Uh oh, look's like you've reached your alloted limit."
                };
                chrome.notifications.create('limitNotif', notifOptions);

            }
            });

            //sets total in UI
            $('#total').text(newTotal);
            $('#amount').val('');
        });
    });
});