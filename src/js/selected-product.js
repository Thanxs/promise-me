function showSelectedProduct(product, products) {
    const selectedProduct = document.querySelector('.products');
    selectedProduct.innerHTML = `
<div class="breadscrumbs">
    <div class="container">
    <div class="breadscrumbs-scroll">
        <span class="counter_cursor breadscrumbs_scrolls " id="spanmarket" onclick="window.location.reload();"> Интернет-магазин Promise Me &gt;</span>
        <span class="counter_cursor breadscrumbs_scrolls" id="spancategory">${product[0].category} &gt;</span>
        <span class="counter_cursor breadscrumbs_scrolls" id="spanbrand">${product[0].brand} &gt;</span>
        <span id="spanproduct">${product[0].name}</span>
        </div>
    </div>    
</div>
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
                <p class="product-card_price-current">${product[0].newPrice}<span> грн.</span>
                </p>
            
            <div class="product_button-click">
            <div class="product-buy">
                <button type="button" class="product-buy_button" data-product-id="${product[0].id}" data-toggle="modal" data-target=".bd-example-modal-lg">Купить</button>
            </div>
            <div class="product-reviews">
                <button type="button" class="product-reviews_button">Оставить отзыв</button>
            </div>
            </div>
            <div class="product-description">
                <div class="product-delivery">
                    <span class="product-town">Доставка в Одессу</span>
                </div>
                <div class="product-card_delivery">
                <div class="product-card_delivery-next1">
                         <span class="product-card_delivery-text1">Самовывоз из магазина Promise Me</span>
                           <span class="product-card_delivery-text2">Бесплатно</span>
                             <span class="product-card_delivery-text3">Забрать в шоуруме через 5 мин</span>
                             </div>
                             <br>
                           <div class="product-card_delivery-next2">
                             <span class="product-card_delivery-text4">Курьер по вашему адресу</span>
                           <span class="product-card_delivery-text5">Бесплатно</span>
                             <span class="product-card_delivery-text6">Доставим сегодня</span>
                            </div>
                             <br>
                           <div class="product-card_delivery-next3">
                             <span class="product-card_delivery-text4">Самовывоз из Новой Почты</span>
                           <span class="product-card_delivery-text5">Бесплатно</span>
                             <span class="product-card_delivery-text6">Отправим сегодня</span>
                            </div>
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
    buttonBuy.addEventListener('click', (event) => {
        showModalToBuy(product);
    });

    /*    let products=0;
        sendRequest('GET', 'products.json')
            .then(data => {
                const test = data;
                products=test;
            });*/



    const spancategory = document.getElementById('spancategory');
    spancategory.addEventListener('click', (event) => {
        const arrayOfProductsFromSelectedCategory = products.filter(item => {
                return item.categoryNumber === product[0].categoryNumber;
            }
        );
        showProductsSection(arrayOfProductsFromSelectedCategory);
    });

    const spanbrand = document.getElementById('spanbrand');
    spanbrand.addEventListener('click', (event) => {
        const arrayOfProductsFromSelectedBrand = products.filter(item => {
                return item.brand === product[0].brand;
            }
        );
        showProductsSection(arrayOfProductsFromSelectedBrand);
    });

    document.querySelector('.products .product-reviews_button').addEventListener('click', (e) => {
        otziv(product);
    });
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
                                    <div class="product__row">
                                        <div class="product__counter">
                                            <div class="counter">
                                                <div class="counter__sign counter_inline counter_border counter_cursor" id="counterminus">-
                                                </div>
                                                <div class="counter__number counter_inline" id="counternumber">1</div>
                                                <div class="counter__sign counter_inline counter_border counter_cursor" id="counterplus">+
                                                </div>
                                                <div class="product__price counter_inline" id="priceinmainwindow">${product[0].newPrice}<span> грн.</span>
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
                            <span class="modal-title_price" id="totalsumm">К оплате: ${product[0].newPrice} </span>
                            <span class="title_price" id="totaloldsumm">${product[0].oldPrice}  грн</span></a>
                    </div>
                    <div>
                        <a class="btn pic_red " id="makeOrder" class="close" data-dismiss="modal" aria-label="Close">Оформить заказ</a>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
    const price = product[0].newPrice;
    const buttonMinus = document.getElementById('counterminus');
    const buttonNumber = document.getElementById('counternumber');
    const buttonPlus = document.getElementById('counterplus');
    const makeOrder = document.getElementById('makeOrder');

    const priceinmainwindow = document.getElementById('priceinmainwindow');
    const totalsumm = document.getElementById('totalsumm');
    const totaloldsumm = document.getElementById('totaloldsumm');

    buttonMinus.addEventListener('click', (event) => {
        let numberOfItem = parseInt(buttonNumber.innerHTML);
        if (numberOfItem > 1) {
            buttonNumber.innerHTML = numberOfItem - 1;
            priceinmainwindow.innerHTML = (numberOfItem - 1) * price + ' грн.';
            totalsumm.innerHTML = (numberOfItem - 1) * price;
            totaloldsumm.innerHTML = (numberOfItem - 1) * price + ' грн.';
        }
    });

    buttonPlus.addEventListener('click', (event) => {
        let numberOfItem = parseInt(buttonNumber.innerHTML);
        buttonNumber.innerHTML = numberOfItem + 1;
        priceinmainwindow.innerHTML = (numberOfItem + 1) * price + ' грн.';
        totalsumm.innerHTML = (numberOfItem + 1) * price;
        totaloldsumm.innerHTML = (numberOfItem + 1) * price + ' грн.';
    });

    makeOrder.addEventListener('click', (event) => {

        const numberOfItem = parseInt(buttonNumber.innerHTML);
        console.log('Product Id: ' + product[0].id);
        console.log('numberOfItem: ' + numberOfItem);
        addItemToTrash(product[0].id, numberOfItem);
    });
}