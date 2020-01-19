document.body.onload = function () {
    showPreloader(0); //1500
};

function showPreloader(ms) {
    const wrapper = document.getElementById('wrapper');
    const preloader = document.createElement('div');
    preloader.classList.add('preloader');
    for (let i = 0; i < 8; i++) {
        preloader.innerHTML += `<div></div>`
    }
    wrapper.prepend(preloader);

    return new Promise(() => {
        setTimeout(() => {
            if (!preloader.classList.contains('preloader-done')) {
                preloader.classList.add('preloader-done');
            }
        }, ms);
    });
}
