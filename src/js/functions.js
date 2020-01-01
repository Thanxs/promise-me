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

function createArrayOfCategories(data) {
    const arrayOfCategories = data.map(item => item.category);

    return makeUniqueArray(arrayOfCategories);
}

function makeUniqueArray(arr) {
    return Array.from(new Set(arr));
}

function showListOfCategoriesInDropDownMenu(data) {
    const dropdownMenuCategories = document.querySelectorAll('.dropdown-menu-categories');
    data.forEach((element, idx) => {
        dropdownMenuCategories[0].innerHTML += `<a class="dropdown-item header__dropdown-item" data-category-number="${idx + 1}" href="#">${element}</a>`
        dropdownMenuCategories[1].innerHTML += `<a class="dropdown-item header__dropdown-item" data-category-number="${idx + 1}" href="#">${element}</a>`
    });
}

function setEventListenersOnCategories(products) {
    const categories = document.querySelectorAll('.header__dropdown-item');
    categories.forEach(category => category
        .addEventListener('click', (event) => {
            const categoryNumber = parseInt(event.target.getAttribute('data-category-number'));
            const arrayOfProductsFromSelectedCategory = products.filter(item => {
                return item.categoryNumber === categoryNumber}
            );
            showProductsSection(arrayOfProductsFromSelectedCategory);
        }));
}

function showProductsSection(productsOfSelectedCategory) {
    const productsSection = document.querySelector('.products');
    const selectedCategory = productsOfSelectedCategory[0].category;

    productsSection.innerHTML = `<div class="container">
                                    <h1 class="products__title">${selectedCategory}</h1>
                                    <div class="products__wrap">
                                        <div class="products__filters">
                                            <h3 class="products__filters-title">Фильтры характеристик</h3>
                                            <form>
                                                <div class="form-group">
                                                    <label for="formControlRange">Цена</label>
                                                    <input type="range" class="form-control-range price-range" id="formControlRange">
                                                </div>
                                            </form>
                                            <div class="products__brand">
                                                <a data-toggle="collapse" href="#collapseExample" class="products__brand-link" aria-expanded="false" aria-controls="collapseExample">
                                                    <span>Бренд</span>
                                                    <i class="fas fa-angle-down"></i>
                                                </a>                                                
                                                <div class="collapse brands-area" id="collapseExample">
                                                    <div class="card card-body products__brand-filter"></div>
                                                </div>
                                                </div>
                                        </div>
                                        <div class="products__main">
                                            <div class="products__sort">
                                                <span>Сортировать</span>
                                                <button class="products__sort-btn products__sort-btn-active">по популярности</button>
                                                <button class="products__sort-btn">сначала дешевле</button>
                                                <button class="products__sort-btn">сначала дороже</button>    
                                            </div>
                                            <div class="products__entities">
                                                <ul class="products__entities__list"></ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
    showProductsOfSelectedCategory(productsOfSelectedCategory);
    showBrandsOfSelectedCategory(productsOfSelectedCategory);
}

function showProductsOfSelectedCategory(products) {
    const productsEntitiesList = document.querySelector('.products__entities__list');
    products.forEach(product => {
        productsEntitiesList.innerHTML += `<li class="products__entities__item">
                                                <div class="products__img">
                                                    <img src="${product.src}" alt="">
                                                </div>
                                                <p class="products__name">${product.name}</p>
                                                <div class="products__order-info">
                                                    <div class="products__prices">
                                                        <p class="products__price-new">${product.newPrice} грн.</p>
                                                        <p class="products__price-old">${product.oldPrice} грн.</p>
                                                    </div>
                                                    <div class="products__cart">
                                                        <i class="fas fa-shopping-cart"></i>
                                                    </div>                                                                                                  
                                                </div>                                                
                                            </li>`;
    });
}

function showBrandsOfSelectedCategory(productsOfSelectedCategory) {
    const brandsFilterArea = document.querySelector('.products__brand-filter');
    const arrayOfBrandsFromSelectedCategory = productsOfSelectedCategory.map(product => product.brand);
    const uniqueBrands = makeUniqueArray(arrayOfBrandsFromSelectedCategory);
    uniqueBrands.forEach((brand, idx )=> {
        brandsFilterArea.innerHTML += `<div class="form-check products__brand-form-check">
                                          <input class="form-check-input products__brand-input" type="checkbox" id="defaultCheck${idx}" name="brand" data-id="${idx+1}" data-name="${brand}">
                                          <label class="form-check-label products__brand-label" for="defaultCheck${idx}">
                                                <span class="products__brand-item">${brand}</span>
                                          </label>
                                       </div> `
    });

    const btnToFilterByBrand = document.createElement('button');
    btnToFilterByBrand.classList.add('btn-outline-dark');
    btnToFilterByBrand.classList.add('btn');
    btnToFilterByBrand.classList.add('products__brand-filter-btn');
    btnToFilterByBrand.textContent = 'Применить';
    brandsFilterArea.after(btnToFilterByBrand);

    const brandInputs = document.querySelectorAll('.products__brand-input');
    let arrayOfSelectedBrandsForFilter = [];
    brandInputs.forEach(brand => {
        brand.addEventListener('click', (event) => {
            if (event.target.checked) {
                arrayOfSelectedBrandsForFilter.push(event.target.dataset.name);
                arrayOfSelectedBrandsForFilter = makeUniqueArray(arrayOfSelectedBrandsForFilter);
                console.log(arrayOfSelectedBrandsForFilter);
            } else {
                let idxWhichHasToBeDeleted = arrayOfSelectedBrandsForFilter.indexOf(event.target.dataset.name);
                arrayOfSelectedBrandsForFilter.splice(idxWhichHasToBeDeleted, 1);
                console.log(arrayOfSelectedBrandsForFilter);
            }
        });
    });

    btnToFilterByBrand.addEventListener('click', (event) => {
        let allCheckedBrands = [];
        for (let i = 0; i < arrayOfSelectedBrandsForFilter.length; i++) {
            allCheckedBrands.push([...productsOfSelectedCategory.filter(brand => {
                return brand.brand === arrayOfSelectedBrandsForFilter[i];
            })]);
        }

        console.log(...allCheckedBrands);
    } );
}