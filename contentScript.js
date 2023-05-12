console.log("Cats Everywhere - Content Script is Running");

let images = document.getElementsByTagName('img');
for (let i = 0; i < images.length; i++) {
  let messageChannel = new MessageChannel();
  messageChannel.port1.onmessage = function (event) {
    if (event.data.data && event.data.index != null) {
      images[event.data.index].src = event.data.data.url;
    }
  };
  if (navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({ msg: 'image', index: i }, [messageChannel.port2]);
  } else {
    // Handle the case when there is no active service worker
    console.log('No active service worker.');
  }
}
