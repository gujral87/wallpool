/************
 *  Fetch  image request from Unsplash
 * ********/

"use strict";
var wallpaperCategory = localStorage.getItem("WallPool_Category") || "nature";
// API config
const unsplashAPIConfig = {
 query: wallpaperCategory,
 featured: true,
 orientation: "landscape",
 width: 600,
 key: "#######################################################",
 count: 1
}

// Request for wallpaper
const __request_Wallpaper = async function() {
 animation();
 let image_URL = 'https://api.unsplash.com/photos/random?query=' + unsplashAPIConfig.query + '&count=' + unsplashAPIConfig.count + '&featured=' + unsplashAPIConfig.featured + '&w=' + unsplashAPIConfig.width + '&orientation=' + unsplashAPIConfig.orientation + '&client_id=' + unsplashAPIConfig.key;
 fetch(image_URL).then((response) => {
  return response.json();
 }).then((res) => {
  show_wallpaper(res);
  animation();
 }).catch((error) => {
  console.error(error, "error");
 });
}

__request_Wallpaper();

// Show fetched Image on UI
const show_wallpaper = (data) => {
 document.querySelector("#imageBlock").style.backgroundImage = `url('${data[0].urls.custom}')`;
 document.querySelector("#authorLink").setAttribute("href", `${data[0].user.links.html}?utm_source=WallPool&utm_medium=referral`);
 document.querySelector("#authorLink").innerText = `${data[0].user.name}`;
 document.querySelector("#setWallpaper").setAttribute("data-image", data[0].urls.full);
}

// Send background request to set wall
document.querySelector("#setWallpaper").addEventListener("click", function() {
 chrome.runtime.sendMessage({
  "message": "setmage",
  "url": this.getAttribute("data-image")
 });
});


// Set Category
document.querySelector("#category").addEventListener("keydown", function(key) {
 if (key.keyCode == 13) {
  localStorage.setItem("WallPool_Category", this.value);
  unsplashAPIConfig.query = this.value;
  this.value = "";
  __request_Wallpaper();
 }
});

// Fresh animation
function animation() {
 document.querySelector(".fa-sync").classList.toggle("fa-spin");
}

// Refresh image on button click 
document.querySelector("#refreshImage").addEventListener("click", __request_Wallpaper);
