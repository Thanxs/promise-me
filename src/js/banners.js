function addBanners() {
    const banner = document.createElement('section');
    const slider = document.querySelector('.slider');
    banner.classList.add('banner');
    banner.innerHTML = `
                            <div class="container">
                                <ul class="banner__list"></ul>
                            </div>`;
    slider.after(banner);
    const bannerList = document.querySelector('.banner__list');
    const amountOfBanners = 3;
    for (let i = 0; i < amountOfBanners; i++) {
        bannerList.innerHTML += `<li class="banner__item"><img src="../images/banners/${i+1}.png" alt="banner"></li>`
    }    
}
