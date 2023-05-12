console.log("background Cats Everywhere - Content Script is Running");

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === "fetchData") {
      fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(data => sendResponse({data: data}))
        .catch(error => sendResponse({error: error}));
      return true;  // Will respond asynchronously.
    }
  });

