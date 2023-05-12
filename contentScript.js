console.log("contentScript.js Cats Everywhere - Content Script is Running");
let elements = document.getElementsByClassName('bbccom_advert');
// start by fetching one cat image at a time
elements = Array.from(elements);

elements.forEach(element => {
  let parent = element.parentElement;
  while (parent) {
    // Check if this is a div with a class that starts with "advert advert"
    if (parent.tagName.toLowerCase() === 'div' &&
      parent.className.startsWith('advert advert')) {
      // Found it! Do whatever you need with the parent div here.
      console.log(parent);

      // And stop looking for more parents.
      break;
    }

    // Not it. Move up to the next parent.
    parent = parent.parentElement;
  }

  let img = document.createElement('img');

  chrome.runtime.sendMessage({ message: "fetchData" }, function (response) {
    if (response.error) {
      console.log(`Error: ${response.error}`);
    } else {
      console.log("whole response", response);
      console.log(response.data);
      img.src = response.data[0]['url'];
      console.log('url', url)
    }
  });
  //img.src = "https://cdn2.thecatapi.com/images/baq.jpg";
  img.alt = "cat";

  // Set the image size
  img.style.width = '200px';  // or any size you want
  img.style.height = '200px'; // or any size you want

  parent.replaceWith(img);
});

// let images = document.getElementsByTagName('img');
// for (let i = 0; i < images.length; i++) {
//   let messageChannel = new MessageChannel();
//   messageChannel.port1.onmessage = function (event) {
//     if (event.data.data && event.data.index != null) {
//       images[event.data.index].src = event.data.data.url;
//     }
//   };
//   if (navigator.serviceWorker.controller) {
//     navigator.serviceWorker.controller.postMessage({ msg: 'image', index: i }, [messageChannel.port2]);
//   } else {
//     // Handle the case when there is no active service worker
//     console.log('No active service worker.');
//   }
// }
