var deferredPrompt;

if(!window.Promise) {
    window.Promise = Promise;
}

if('serviceWorker' in navigator) {
    navigator.serviceWorker
        .register('/sw.js')
        .then(function() {
            console.info('Service Worker registered');
        })
        .catch(function(err) {
            console.log(err);
        });
}

window.addEventListener('beforeinstallprompt', function(event) {
    console.log('beforeinstallprompt fired');
    event.preventDefault();
    deferredPrompt = event;
    return false;
});

var promise = new Promise(function(resolve, reject) {
    setTimeout(function() {
        resolve('This is executed once the timer is done!');
        // reject({code: 500, message: 'This is an error'})
    }, 3000);
});

// promise.then(function(text) {
//     return text;
// }, function(err){
//     console.log(err);
// })
//  .then(function(newText) {
//      console.log(newText);
// });

promise.then(function(text) {
    return text;
})
.then(function(newText) {
     console.log(newText);
})
.catch(function(error){
    console.log(error);
});

fetch('https://httpbin.org/ip')
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
    .catch(function(err) {
        console.log(err);
    });

fetch('https://httpbin.org/post', {
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
        'Accept': 'application/json'
    },
    body: JSON.stringify({
        message: 'Does this work?'
    }),
    mode: 'cors'
})
    .then(function(response){
        console.log(response);
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
    .catch(function(err) {
        console.log(err);
    });



console.log('This is executed right after setTimeout()');