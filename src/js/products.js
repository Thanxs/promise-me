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
            showPreloader(400).then(() => {
                showProductsSection(arrayOfProductsFromSelectedCategory, products);
                const productsSection = document.querySelector(".products");
                productsSection.scrollIntoView(300);
            });
        }));
}

function showProductsSection(productsOfSelectedCategory, products) {
    playSound('../sounds/select-category');
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

    showProductsOfSelectedCategory(productsOfSelectedCategory, products);
    showBrandsOfSelectedCategory(productsOfSelectedCategory);
    filterProductsByPriceRange(minPriceFromSelectedProducts, maxPriceFromSelectedProducts, productsOfSelectedCategory);
}

function showProductsOfSelectedCategory(products,productsAll) {
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
            showPreloader(300).then(() => {
                const pageNumber = parseInt(event.target.dataset.page);
                for (let i = 0; i < productsPaginationItems.length; i++) {
                   productsPaginationItems[i].classList.remove('products__pagination-item_active'); 
                }                           
                event.target.classList.add('products__pagination-item_active');

                const arrayOfRangeBreakPoints = [];
                for (let i = 1; i <= products.length; i += amountOfProductsOnOnePage) {
                    arrayOfRangeBreakPoints.push(i);
                }

                if (pageNumber === (idx + 1)) {
                    for (let i = 0; i < products.length; i++) {
                        productsEntitiesItems[i].classList.remove('products__entities__item_active');
                        if (!productsEntitiesItems[i]) {
                            break;
                        }
                    }
                    for (let i = arrayOfRangeBreakPoints[idx]; i <= amountOfProductsOnOnePage * (idx + 1); i++) {
                        productsEntitiesItems[i - 1].classList.add('products__entities__item_active');
                        if (!productsEntitiesItems[i]) {
                            break;
                        }
                    }
                }
            });

        })
    });

    productsEntitiesItems.forEach(productEntity => productEntity.addEventListener('click', (event) => {
        const entityId = parseInt(productEntity.getAttribute('data-product-id'));
        const productFromBD = products.filter(item => {
                return item.id === entityId
            }
        );
        showSelectedProduct(productFromBD, productsAll);
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
            playSound('../sounds/brand');
            if (brandCheckBoxesArray.some((checkBox) => checkBox.checked)) {
                btnToFilterByBrand.classList.add('products__brand-filter-btn_active');
            } else {
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
        showPreloader(300).then(() => {
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
        });
    });

    btnToResetBrandFilters.addEventListener('click', () => {
        showPreloader(300).then(() => {
            brandCheckBoxes.forEach(checkBox => {
                    checkBox.checked = false;
                    arrayOfSelectedBrandsForFilter = [];
                }
            );
            productsEntitiesList.innerHTML = '';
            showProductsOfSelectedCategory(productsOfSelectedCategory);
        });
    });
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
        }, 300);
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
    selectors.forEach((selector)=> {
        if (document.querySelector(selector)) {
            document.querySelector(selector).remove();
        }
    });
}
