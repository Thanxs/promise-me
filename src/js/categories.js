function createArrayOfCategories(data) {
    const arrayOfCategories = data.map(item => item.category);

    return makeUniqueArray(arrayOfCategories);
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
