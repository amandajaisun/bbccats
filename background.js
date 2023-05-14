// Currently not using this background.js file
console.log("background Cats Everywhere - Content Script is Running");
const accessToken = 'nutNj9DtZp2R8U1fJgeeO47uDx17vkNEnJhVFDT6oaFOxWwFEY';

// Set your category, action and parameters
const category = 'animals';
const action = 'search';
const parameters = {
  type: 'cat',
  location: 'San Francisco, CA'
};
const params = new URLSearchParams(parameters);
const url = `https://api.petfinder.com/v2/${category}/${action}?${params.toString()}`;

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.message === "fetchData") {
      fetch('https://api.thecatapi.com/v1/images/search')
        .then(response => response.json())
        .then(data => sendResponse({ data: data }))
        .catch(error => sendResponse({ error: error }));
      return true;  // Will respond asynchronously.
    }
    if (request.message === "fetchAdopt") {
      // Call the API
      fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error:', error));
    }
  });

