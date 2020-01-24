'use strict';
function sendRequest(method, url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.responseType = 'json';

        xhr.addEventListener('load', () => {
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                resolve(xhr.response);
            }
        });
        xhr.send();
    });
}

function makeUniqueArray(arr) {
    return Array.from(new Set(arr));
}

function refreshInfo(...selectors) {
    $(selectors).each((i, selector) => {
        if ($(selector)) {
            $(selector).remove();
        }
    });
}

function playSound(name) {
    const sound = new Audio();
    sound.src = `./audio/${name}.mp3`;
    sound.autoplay = true;
}