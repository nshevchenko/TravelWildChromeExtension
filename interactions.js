window.onload = function() {
    chrome.runtime.onMessage.addListener(function(msg, _, sendResponse) {
        console.log('onMessage', msg);
        if (msg.action == "hello") {
            sendResponse({response: document.getElementById(msg.classid).value});
        } else{
           sendResponse({});
        }
    });
};
