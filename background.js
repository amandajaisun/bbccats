console.log("Cats Everywhere - Content Script is Running");

self.onmessage = function(event) {
  if (event.data.msg === 'image') {
    fetch('https://api.thecatapi.com/v1/images/search')
      .then(response => response.json())
      .then(data => {
        const response = { data: data[0], index: event.data.index };
        event.ports[0].postMessage(response);
      })
      .catch(error => console.error('Error:', error));
  }
};
