
var deferredPrompt;

// Checks whether or not the browser has SW object (supports SW)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
		.register('/sw.js') // register new service worker
		.then(function() {
			console.log('Service worker registered!');
		});
}

window.addEventListener('beforeinstallprompt', function(event) {
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    deferredPrompt = event;
    return false
});