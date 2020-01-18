function createSlider() {
    const header = document.querySelector('.header');
    const slider = document.createElement('section');
    slider.classList.add('slider');
    slider.innerHTML = `
                    <div class="container">
                        <div class="slider__inner"></div>
                    </div>`;
    header.after(slider);

    const sliderInner = document.querySelector('.slider__inner');
    const amountOfSlides = 9;
    for (let i = 0; i < amountOfSlides; i++) {
        sliderInner.innerHTML += `
                              <div><img src="../images/slider/${i+1}.jpg" alt="slide"></div>`
    }

    $('.slider__inner').slick({
        autoplay: true,
        autoplaySpeed: 2000,
        arrows: false,
    });
}

