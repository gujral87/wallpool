// Listen message from popupjs
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
 set_wallpaper(request.url);
});

// Set it
const set_wallpaper = (img) => {
 chrome.wallpaper.setWallpaper({
  'url': img,
  'layout': 'CENTER_CROPPED',
  'filename': 'OS_wallpaper'
 }, function() {});
}