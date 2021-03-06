sendRequest('GET', 'js/products.json')
    .then(data => {
        const products = data;
        const arrayOfCategories = createArrayOfCategories(products);
        showListOfCategoriesInDropDownMenu(arrayOfCategories);
        setEventListenersOnCategories(products);
        search(products);
        createSlider();
        addBanners();
        localStorageGet();
        eventListenerForBasket(products);
    });
