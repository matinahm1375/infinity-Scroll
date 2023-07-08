const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready=false;
let imagesLoaded=0;
let totalImages=0;
let photoArray = [];
// Unslash API 
const count =5;
const apiKey = 'kp7RBEf2Kx1bKwc9z1n-XodaL7gXF81R-bduRllLrCU';
const apiUrl =`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`
// check if all images were loaded 
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded===totalImages){
        ready=true;
        loader.hidden=true;
    }
}
// helper function to setAttribute on dom elements 
function setAttribute(element,attributes){
    for (const key in attributes){
        element.setAttribute(key,attributes[key]);
    }
}
// create elements for links & photos,add to dom 
function displayPhoto(){
    imagesLoaded=0;
    totalImages=photoArray.length;
    // run function for each object in photosArray
    photoArray.forEach((photo)=>{
        //create <a> to links to unsplash
        const item = document.createElement('a');
      setAttribute(item,{
        href:photo.links.html,
        target:'_blank',
      });
        // create <img> for photo 
        const img = document.createElement('img');
    setAttribute(img,{
        src:photo.urls.regular,
        alt:photo.alt_description,
        title:photo.alt_description,
    });
    // Event Listener,check when each is finished loading
    img.addEventListener('load',imageLoaded);
    //   put <img> inside <a> , then put both inside imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
// get photos from unsplash API 
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhoto();
        
    } catch (error) {
        // catch error here 
    }
}
getPhotos();
// check to see if scrolling near bottm of page ,load more photos 
window.addEventListener('scroll',()=>{
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-1000 & ready){
        ready=false;
        getPhotos();
    }
});