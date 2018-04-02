
var deferredPrompt;

if (!window.Promise) {
    window.Promise = Promise;
}

// Checks whether or not the browser has SW object (supports SW?)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker
		.register('/sw.js') // register new service worker
		.then(function() {
			console.log('Service worker registered!');
		})
        .catch(function(err) {
            console.log(err)
        });
}

window.addEventListener('beforeinstallprompt', function(event) {
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    deferredPrompt = event;
    return false
});

var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        // resolve('This is executed once the timer is done!')
        reject({code: 500, message: 'An error occurred!'});
        // console.log('AFTER THREE SECONDS')
    }, 3000);
});

// ajax request example
// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'https://httpbin.or/ip');
// xhr.responseType = 'json';
//
// xhr.onload = function () {
//     console.log(xhr.response);
// };
//
// xhr.onerror = function () {
//     console.log('Error!');
// };
//
// xhr.send

fetch('https://httpbin.org/ip')     //host site to test request calls
    .then(function (response) {
        console.log(response)
        return response.json();
    })
    .then(function (data) {
        console.log(data)
    })
    .catch(function (err) {
        console.log(err);
    });

fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    mode: 'cors',
    body: JSON.stringify({message: 'Does this work?'})
})     //host site to test post calls
    .then(function (response) {
        console.log(response)
        return response.json();
    })
    .then(function (data) {
        console.log(data)
    })
    .catch(function (err) {
        console.log(err);
    });

// promise.then(function (text) {
//     return text;
//     console.log(text);
// }, function (err) {
//     console.log(err.code, err.message)
// }).then(function (newText) {
//     console.log(newText);
// });

promise.then(function (text) {
    return text;
}).then(function (newText) {        //use then to handle normal occurrences
    console.log(newText);
}).catch(function(err) {            //use catch to handle errors
    console.log(err.code, err.message)
});

console.log('This is executed right after setTimeout()');
