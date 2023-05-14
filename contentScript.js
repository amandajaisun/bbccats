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
  img.style.width = '200px';  
  img.style.height = '200px'; 

  let div = document.createElement('div');
  // Set the container's style to center its contents
  div.style.display = 'flex';
  div.style.justifyContent = 'center';
  div.style.alignItems = 'center';

  // Add the img to the container
  div.appendChild(img);

  parent.replaceWith(div);
});
