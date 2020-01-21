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
                    return item.categoryNumber === categoryNumber
                }
            );
            showPreloader(400);
            setTimeout(() => {
                showProductsSection(arrayOfProductsFromSelectedCategory);
                const productsSection = document.querySelector(".products");
                productsSection.scrollIntoView(300);
            }, 400);
        }));
}

function showProductsSection(productsOfSelectedCategory) {
    const productsSection = document.querySelector('.products');
    const selectedCategory = productsOfSelectedCategory[0].category;

    let minPriceFromSelectedProducts = findMinPriceOfSelectedProducts(productsOfSelectedCategory);
    let maxPriceFromSelectedProducts = findMaxPriceOfSelectedProducts(productsOfSelectedCategory);

    productsSection.innerHTML = `<div class="container">
                                    <h1 class="products__title">${selectedCategory}</h1>
                                    <div class="products__wrap">
                                        <div class="products__filters">
                                            <h3 class="products__filters-title">Фильтры характеристик</h3>
                                            <form>
                                                <div class="form-group">
                                                    <label for="formControlRange" class="price-title">Цена</label>
                                                    <div class="price-range-block">
                                                        <span>от</span><input class="price-from" value="${minPriceFromSelectedProducts}">
                                                        <span>до</span><input class="price-to" value="${maxPriceFromSelectedProducts}">
                                                    </div>
                                                    <button type="button" class="btn btn-outline-dark price-range-btn">Показать</button>
                                                    <div id="price-range"></div>
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
                                                <button class="products__sort-btn products__sort-btn-active products__sort-btn-popular">по популярности</button>
                                                <button class="products__sort-btn products__sort-btn-cheap">сначала дешевле</button>
                                                <button class="products__sort-btn products__sort-btn-expensive">сначала дороже</button>    
                                            </div>
                                            <div class="products__entities">
                                                <ul class="products__entities__list"></ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;

    // const priceRange = document.getElementById('price-range');
    //
    // noUiSlider.create(priceRange, {
    //     start: [1, 100],
    //     range: {
    //         'min': [10],
    //         'max': [90]
    //     }
    // });

    showProductsOfSelectedCategory(productsOfSelectedCategory);
    showBrandsOfSelectedCategory(productsOfSelectedCategory);
    filterProductsByPriceRange(minPriceFromSelectedProducts, maxPriceFromSelectedProducts, productsOfSelectedCategory);
}

function showProductsOfSelectedCategory(products) {
    const amountOfProductsOnOnePage = 12;
    const numberOfPages = (products.lenght % amountOfProductsOnOnePage === 0)
        ? Math.floor(products.length / amountOfProductsOnOnePage)
        : Math.floor(products.length / amountOfProductsOnOnePage) + 1;

    refreshInfo('.products__pagination');

    if (products.length > 12) {
        createPagination(numberOfPages);
    }

    const productsEntitiesList = document.querySelector('.products__entities__list');
    products.forEach((product, idx) => {
        productsEntitiesList.innerHTML += `<li class="products__entities__item" data-number="${idx + 1}" data-product-id="${product.id}">
                                                <div class="products__img">
                                                    <img src="${product.src}" alt="${product.name}">
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

    const productsPaginationItems = document.querySelectorAll('.products__pagination-item');
    const productsEntitiesItems = document.querySelectorAll('.products__entities__item');

    for (let i = 1; i <= amountOfProductsOnOnePage; i++) {
        productsEntitiesItems[i - 1].classList.add('products__entities__item_active');
        if (!productsEntitiesItems[i]) {
            break;
        }
    }

    productsPaginationItems.forEach((page, idx) => {
        page.addEventListener('click', (event) => {
            showPreloader(300);
            setTimeout(() => {
                const pageNumber = parseInt(event.target.dataset.page);

                const arrayOfRangeBreakPoints = [];
                for (let i = 1; i <= products.length; i+=amountOfProductsOnOnePage) {
                    arrayOfRangeBreakPoints.push(i);
                }

                if (pageNumber === (idx +1)) {
                    for (let i = 0; i < products.length; i++) {
                        productsEntitiesItems[i].classList.remove('products__entities__item_active');
                        if(!productsEntitiesItems[i]) {
                            break;
                        }
                    }
                    for (let i = arrayOfRangeBreakPoints[idx]; i <= amountOfProductsOnOnePage*(idx+1); i++) {
                        productsEntitiesItems[i-1].classList.add('products__entities__item_active');
                        if(!productsEntitiesItems[i]) {
                            break;
                        }
                    }
                }
            }, 300);
        })
    });

    productsEntitiesItems.forEach(productEntity => productEntity.addEventListener('click', (event) =>
    {
            const entityId = parseInt(productEntity.getAttribute('data-product-id'));
            const productFromBD = products.filter(item => {
                    return item.id === entityId
                }
            );
            showSelectedProduct(productFromBD);
        }));
}

function showBrandsOfSelectedCategory(productsOfSelectedCategory) {
    const brandsFilterArea = document.querySelector('.products__brand-filter');
    const arrayOfBrandsFromSelectedCategory = productsOfSelectedCategory.map(product => product.brand);
    const uniqueBrands = makeUniqueArray(arrayOfBrandsFromSelectedCategory);
    uniqueBrands.forEach((brand, idx) => {
        brandsFilterArea.innerHTML += `<div class="form-check products__brand-form-check">
                                          <input class="form-check-input products__brand-input" type="checkbox" id="defaultCheck${idx}" name="brand" data-id="${idx + 1}" data-name="${brand}">
                                          <label class="form-check-label products__brand-label" for="defaultCheck${idx}">
                                                <span class="products__brand-item">${brand}</span>
                                          </label>
                                       </div> `
    });

    const btnToFilterByBrand = createBtnToWorkWithBrandFilters(brandsFilterArea, 'products__brand-filter-btn', 'Применить');
    const btnToResetBrandFilters = createBtnToWorkWithBrandFilters(btnToFilterByBrand, 'products__brand-reset-btn', 'Сбросить фильтры');

    const brandCheckBoxes = document.querySelectorAll('.products__brand-input');
    let arrayOfSelectedBrandsForFilter = [];

    const brandCheckBoxesArray = Array.from(brandCheckBoxes);

    brandCheckBoxes.forEach(brand => {
        brand.addEventListener('click', (event) => {
            if (brandCheckBoxesArray.some((checkBox) => checkBox.checked)) {
                btnToFilterByBrand.classList.add('products__brand-filter-btn_active');
            } else  {
                btnToFilterByBrand.classList.remove('products__brand-filter-btn_active');
            }

            if (event.target.checked) {
                arrayOfSelectedBrandsForFilter.push(event.target.dataset.name);
                arrayOfSelectedBrandsForFilter = makeUniqueArray(arrayOfSelectedBrandsForFilter);
            } else {
                let idxWhichHasToBeDeleted = arrayOfSelectedBrandsForFilter.indexOf(event.target.dataset.name);
                arrayOfSelectedBrandsForFilter.splice(idxWhichHasToBeDeleted, 1);
            }
        });
    });

    const productsEntitiesList = document.querySelector('.products__entities__list');

    const buttonsOfSort = document.querySelectorAll('.products__sort-btn');
    buttonsOfSort.forEach(btn => {
        btn.addEventListener('click', event => {
            buttonsOfSort.forEach(btn => btn.classList.remove('products__sort-btn-active'));
            event.target.classList.add('products__sort-btn-active');
            productsEntitiesList.innerHTML = '';
            checkSortFeature(productsOfSelectedCategory, event.target);
            showProductsOfSelectedCategory(productsOfSelectedCategory);
        });
    });

    btnToFilterByBrand.addEventListener('click', (event) => {
        showPreloader(300);
        setTimeout(() => {
            let allCheckedBrands = [];
            for (let i = 0; i < arrayOfSelectedBrandsForFilter.length; i++) {
                allCheckedBrands.push([...productsOfSelectedCategory.filter(brand => {
                    return brand.brand === arrayOfSelectedBrandsForFilter[i];
                })]);
            }

            let allCheckedBrandsInOneArray = [];

            allCheckedBrands.forEach(arrayOfBrands => {
                return allCheckedBrandsInOneArray.push(...arrayOfBrands);
            });

            productsEntitiesList.innerHTML = '';

            showProductsOfSelectedCategory(allCheckedBrandsInOneArray);

            let arrayFromBrandsOfCheckBoxes = Array.from(brandCheckBoxes);
            const isAllCheckBoxesEmpty = arrayFromBrandsOfCheckBoxes.every(checkBox => checkBox.checked === false);

            if (isAllCheckBoxesEmpty) {
                showProductsOfSelectedCategory(productsOfSelectedCategory);
            }

            buttonsOfSort.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    if (allCheckedBrandsInOneArray.length) {
                        productsEntitiesList.innerHTML = '';

                        checkSortFeature(allCheckedBrandsInOneArray, event.target);
                        showProductsOfSelectedCategory(allCheckedBrandsInOneArray);
                    }
                });
            });
        },300)
    });

    btnToResetBrandFilters.addEventListener('click', () => {
        showPreloader(300);
        setTimeout(() => {
            brandCheckBoxes.forEach(checkBox => {
                    checkBox.checked = false;
                    arrayOfSelectedBrandsForFilter = [];
                }
            );
            productsEntitiesList.innerHTML = '';
            showProductsOfSelectedCategory(productsOfSelectedCategory);
        }, 300);
    });
}

function showSelectedProduct(product) {
    const selectedProduct = document.querySelector('.products');
       selectedProduct.innerHTML = `
<div class="product-card">
    <div class="product-card_information">
        <img src="${product[0].src}">
    </div>
    <div class="product-card_information_product-code">
        <span class="product-code_title">Код товара:</span>
        <span class="product-code_figures">${product[0].id + 23800}</span>
        <h1 class="product-card_information-header">${product[0].name}</h1>
        <div class="product-card_information-avaible">
            <span class="product-card_information-avaible-stock">Есть в наличии</span>
        </div>
        <div class="product-card_price">
            <div class="product-card_price-block">
                <p class="product-card_price-current">${product[0].newPrice}<span>грн</span>
                </p>
            </div>
            <div class="product-buy">
                <button type="button" class="product-buy_button" data-product-id="${product[0].id}" data-toggle="modal" data-target=".bd-example-modal-lg">Купить</button>
            </div>
            <div class="product-reviews">
                <button type="button" class="product-reviews_button">Оставить отзыв</button>
            </div>
            <div class="product-description">
                <div class="product-delivery">
                    <span class="product-town">Доставка в Одессу</span>
                </div>

                <div class="product-card_delivery">
                    <table class="table1">
                        <tr class="tr1">
                            <td class="td1">Самовывоз из магазина Promise Me</td>
                            <td class="td1">Бесплатно</td>
                            <td class="td1">Забрать в шоуруме через 5 мин</td>
                        </tr>
                        <tr class="tr1">
                            <td class="td1">Курьер по вашему адресу</td>
                            <td class="td1">Бесплатно</td>
                            <td class="td1">Доставим сегодня</td>
                        </tr>
                        <tr class="tr1">
                            <td class="td1">Самовывоз из Новой Почты</td>
                            <td class="td1">Бесплатно</td>
                            <td class="td1">Отправим сегодня</td>
                        </tr>                        
                    </table>
                </div>

                <div class="product-card_information-block">
                    <p class="information_block">Оплата</p>
                    <span>Наличными курьеру, Наложенный платеж, Наличными / картой в магазине,
                            Оплата картой на сайте
                </div>
            </div>
        </div>
        <div class="product-card_information_product-reviews">
        <h5>Отзывы</h5>
        <div class="product-reviews-content"></div>
        </div>       
    </div>
</div>
<div class="modalWindowToBuy"></div>`;


    const buttonBuy = document.querySelector('.product-buy_button');
    buttonBuy.addEventListener('click', (event) =>
    {
        showModalToBuy(product);
    });

    document.querySelector('.products .product-reviews_button').addEventListener('click', (e)=>{
    otziv(product);
 })
    showProductReviews(product);
}

function showModalToBuy(product) {
    const selectedProduct = document.querySelector('.modalWindowToBuy');
    selectedProduct.innerHTML = `<div class="modal fade bd-example-modal-lg" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
         aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <div>
                        <div class="modal-footer">
                            <div class="content_text">
                                <div class="title_text1">Товар добавлен в корзину</div>
                                <div class="pic_img_content">
                                    <img class="pic_content" src="${product[0].src}">
                                </div>
                                <div class="pic_content_text">
                                    <div class="product_pic_content_text">
                                        <a class="product_title">${product[0].name}
                                        </a>
                                        
                                    </div>
                                     <div class="product_delete">
                                            <a class="product__delete" href="javascript:void(0);"
                                               onclick="small_basket_all.removeItemFromCart(107923)">
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20px"
                                                     height="25px" viewBox="0 0 20 25">
                                                    <g>
                                                        <path fill="#d9d9d9"
                                                              d="M18,8H2C1.7,8,1.417,8.135,1.227,8.366S0.96,8.902,1.02,9.196l3,15C4.113,24.663,4.523,25,5,25h10c0.477,0,0.887-0.337,0.98-0.804l3-15c0.059-0.294-0.017-0.599-0.207-0.83S18.3,8,18,8z M14.18,23h-2l1.806-10.836c0.091-0.544-0.277-1.06-0.822-1.15c-0.548-0.097-1.06,0.278-1.151,0.822L10.153,23H9.847L7.986,11.836c-0.091-0.545-0.603-0.919-1.151-0.822c-0.544,0.091-0.913,0.606-0.822,1.15L7.82,23h-2l-2.6-13H16.78L14.18,23z"></path>
                                                        <path fill="#d9d9d9"
                                                              d="M19,4h-4.101C14.434,1.721,12.414,0,10,0S5.566,1.721,5.101,4H1C0.448,4,0,4.447,0,5s0.448,1,1,1h18c0.552,0,1-0.447,1-1S19.552,4,19,4z M10,2c1.302,0,2.402,0.839,2.816,2H7.184C7.598,2.839,8.698,2,10,2z"></path>
                                                    </g>
                                                </svg>
                                            </a>
                                            <path fill="#d9d9d9"
                                                  d="M18,8H2C1.7,8,1.417,8.135,1.227,8.366S0.96,8.902,1.02,9.196l3,15C4.113,24.663,4.523,25,5,25h10c0.477,0,0.887-0.337,0.98-0.804l3-15c0.059-0.294-0.017-0.599-0.207-0.83S18.3,8,18,8z M14.18,23h-2l1.806-10.836c0.091-0.544-0.277-1.06-0.822-1.15c-0.548-0.097-1.06,0.278-1.151,0.822L10.153,23H9.847L7.986,11.836c-0.091-0.545-0.603-0.919-1.151-0.822c-0.544,0.091-0.913,0.606-0.822,1.15L7.82,23h-2l-2.6-13H16.78L14.18,23z"></path>
                                        </div>
                                    <div class="product__row">
                                        <div class="product__counter">
                                            <div class="counter">
                                                <div class="counter__sign counter_inline counter_border"
                                                     onclick="small_basket_all.changeItemQuantity(107921, 0)">-
                                                </div>
                                                <div class="counter__number counter_inline">1</div>
                                                <div class="counter__sign counter_inline counter_border"
                                                     onclick="small_basket_all.changeItemQuantity(107921, 2)">+
                                                </div>
                                                <div class="product__price counter_inline ">${product[0].newPrice}<span> грн.</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="price-footer">
                    <div class="foot_grey">
                        <a class="btn pic_grey">
                            <span class="modal-title_price">К оплате: ${product[0].newPrice} </span>
                            <span class="title_price">${product[0].oldPrice}  грн</span></a>
                    </div>
                    <div>
                        <a class="btn pic_red ">Оформить заказ</a>
                    </div>
                </div>
            </div>
        </div>
    </div>`;

}


function createBtnToWorkWithBrandFilters(element, className, text) {
    const btnToFilterByBrand = document.createElement('button');
    btnToFilterByBrand.classList.add('btn-outline-dark');
    btnToFilterByBrand.classList.add('btn');
    btnToFilterByBrand.classList.add(className);
    btnToFilterByBrand.textContent = text;
    element.after(btnToFilterByBrand);
    return btnToFilterByBrand;
}

function sortByPriceExpensiveFirst(arr) {
    return arr.sort((a, b) => a.newPrice < b.newPrice ? 1 : -1);
}

function sortByPriceCheapFirst(arr) {
    return arr.sort((a, b) => a.newPrice > b.newPrice ? 1 : -1);
}

function sortByPopularity(arr) {
    return arr.sort((a, b) => a.id > b.id ? 1 : -1);
}

function checkSortFeature(array, target) {
    if (target.classList.contains('products__sort-btn-cheap')) {
        array = sortByPriceCheapFirst(array);
    }
    if (target.classList.contains('products__sort-btn-expensive')) {
        array = sortByPriceExpensiveFirst(array);
    }
    if (target.classList.contains('products__sort-btn-popular')) {
        array = sortByPopularity(array);
    }
    return array;
}

function getArrayOfPrices(products) {
    const arrayOfPrices = products.map(product => {
        return product.newPrice;
    });
    return arrayOfPrices;
}

function findMaxPriceOfSelectedProducts(products) {
    const arrayOfPrices = getArrayOfPrices(products);

    function getMaxOfArray(numArray) {
        return Math.max.apply(null, numArray);
    }

    return getMaxOfArray(arrayOfPrices);
}

function findMinPriceOfSelectedProducts(products) {
    const arrayOfPrices = getArrayOfPrices(products);

    function getMinOfArray(numArray) {
        return Math.min.apply(null, numArray);
    }

    return getMinOfArray(arrayOfPrices);
}

function filterProductsByPriceRange(minPrice, maxPrice, products) {
    const inputPriceFrom = document.querySelector('.price-from');
    const inputPriceTo = document.querySelector('.price-to');

    inputPriceFrom.addEventListener('change', (event) => {
        minPrice = parseInt(event.target.value);
    });

    inputPriceTo.addEventListener('change', (event) => {
        maxPrice = parseInt(event.target.value);
    });

    const priceRangeBtn = document.querySelector('.price-range-btn');
    priceRangeBtn.addEventListener('click', () => {
        showPreloader(300);
        setTimeout(() => {
            let productsFilteredByPrice = products.filter(product => {
                return product.newPrice >= minPrice && product.newPrice <= maxPrice;
            });
            const productsEntitiesList = document.querySelector('.products__entities__list');
            productsEntitiesList.innerHTML = '';
            showProductsOfSelectedCategory(productsFilteredByPrice);
        },300);
    });
}

function createPagination(pagesAmount) {
    const pagination = document.createElement('ul');
    pagination.classList.add('pagination');
    pagination.classList.add('products__pagination');

    for (let pageNumber = 1; pageNumber <= pagesAmount; pageNumber++) {
        pagination.innerHTML += `<li class="products__pagination-item" data-page="${pageNumber}">${pageNumber}</li>`
    }

    const productsSort = document.querySelector('.products__sort');
    productsSort.after(pagination);
}

function refreshInfo(...selectors) {
    $(selectors).each((i, selector) => {
        if ($(selector)) {
            $(selector).remove();
        }
    });
}

