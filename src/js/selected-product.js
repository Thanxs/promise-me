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

<div class="product">
    <div class="container">
    <div class="product__img">
        <img src="${product[0].src}">
    </div>
    <div class="product__info">
        <div class="product__code">Код товара: <b>${product[0].id + 23800}</b></div>
        <h2 class="product__title">${product[0].name}</h2>
        <div class="product__available">Есть в наличии</div>
        <div class="product__price">${product[0].newPrice} грн.</div>
        <div class="product__btn-block">
            <button type="button" class="product-buy_button" data-product-id="${product[0].id}" data-toggle="modal" data-target=".bd-example-modal-lg">Купить</button>
            <button type="button" class="product-reviews_button">Оставить отзыв</button>
        </div>
        <div class="product__delivery">
        <h2 class="product__delivery-title">Доставка в Одессу</h2>
        <div class="row">
            <div class="col-4">Самовывоз из магазина Promise ME</div>
            <div class="col-4">Бесплатно</div>
            <div class="col-4">Забрать в шоуруме через 5 минут</div>
        </div>
        <div class="row">
            <div class="col-4">Курьер по вашему адресу</div>
            <div class="col-4">Бесплатно</div>
            <div class="col-4">Доставим сегодня</div>
        </div>
        <div class="row">
            <div class="col-4">Самовывоз из Новой Почты</div>
            <div class="col-4">Бесплатно</div>
            <div class="col-4">Отправим сегодня</div>
        </div>   
        </div>
        <div class="product__payment">
            <h2 class="product__payment-title">Оплата</h2>
            <ul class="product__payment-list">
                <li class="product__payment-item">Наличными курьеру,&nbsp;</li>
                <li class="product__payment-item">Наложенный платеж,&nbsp;</li>
                <li class="product__payment-item">Наличными/ картой в магазине,&nbsp;</li>
                <li class="product__payment-item">Оплата картой на сайте</li>
            </ul>
        </div>
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
        showOrderInformation(product);

    });

}

function showOrderInformation(product) {
    const selectedProduct = document.querySelector('.products');
    let basket = localStorageGet();
    let testorder = basket.trash[0].id;
    let testorderNumber = basket.trash[0].number;
    selectedProduct.innerHTML =`
<div class="checkout-title_basket">
<div class="checkout-title">
        <span class="checkout-content__shadow_basketOne">Контактные данные</span>
    
    <div class="checkoutContent">
    <div class="checkoutContent_main">
        <div class="form__label">Имя *</div>
            <input type="text" class="checkoutContent_inform" placeholder=""></Имя>
            <div class="form__label">Фамилия</div>
            <input type="text" class="checkoutContent_inform" placeholder="">
            <div class="form__label">Телефон *</div>
            <input type="text" class="checkoutContent_inform" placeholder="+38 (___) ___-__-__">
            <div class="form__label">E-Mail *</div>
            <input type="text" class="checkoutContent_inform" placeholder="">
            <div>
            <button class="button_basket_price"><span>Оформить заказ</span></button>       
            </div></div>
            </div>
           </div>
            
            <div class="checkoutContent_main_tov_basket">
             <div class="checkout-content__shadow">
            <span class="checkout-content__shadow_basketTwo">В вашей корзине</span>
            <div class="checkoutContent_main_tov">
               
                    <div class="pic_img_content_basket">
                        <img class="pic_content" src="${product[0].src}">
          
                    <div class="product_title-basket">
                    <div class="product-code_title_baskets">
                    <span class="product-code_title_basket">Код товара:</span>
                    <span class="product-code_figures_basket">${product[0].id + 23800}</span>
                    <span class="basketTov_clean">Удалить</span>
                    </div>
                    <div class="pic_content_text_basket">
                        <div class="product_pic_content_text_basket">
                            <a class="product_title_basket">${product[0].name}
                            </a>
                        </div>
                        <div class="product__row_basket">
                            <div class="product__counter_basket">
                                <div class="counter_basket">
                                    <div class="counter__sign counter_inline counter_border counter_cursor"
                                         id="counterminus">-
                                    </div>
                                    <div class="counter__number counter_inline" id="counternumber">1</div>
                                    <div class="counter__sign counter_inline counter_border counter_cursor"
                                         id="counterplus">+
                                    </div>
                                    <div class="product__price counter_inline price_basket" id="priceinmainwindow">
                                        ${product[0].newPrice}<span> грн.</span>
                                    </div></div>
                                    <div class="product__counter_basket_prices">
                                    <div class="product__counter_basket_price">Общая стоимость :</div>
                                
                                    <div class="product__counter_basket_priceSumm">5 199 грн.</div>
                                    </div></div>
                                </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                    </div>
                 </div>
          </div>
                </div>`;

}




// <div class="product-card_information">
//     <img src="${product[0].src}">
//     </div>
//     <div class="product-card_information_product-code">
//     <span class="product-code_title">Код товара:</span>
// <span class="product-code_figures">${product[0].id + 23800}</span>
//     <h1 class="product-card_information-header">${product[0].name}</h1>
//     <div class="product-card_information-avaible">
//     <span class="product-card_information-avaible-stock">Есть в наличии</span>
// </div>
// <div class="product-card_price">
//     <div class="product-card_price-block">
//     <p class="product-card_price-current">${product[0].newPrice}<span> грн.</span>
//     </p>
//
//     <div class="product_button-click">
//     <div class="product-buy">
//     <button type="button" class="product-buy_button" data-product-id="${product[0].id}" data-toggle="modal" data-target=".bd-example-modal-lg">Купить</button>
//     </div>
//     <div class="product-reviews">
//     <button type="button" class="product-reviews_button">Оставить отзыв</button>
// </div>
// </div>
// <div class="product-description">
//     <div class="product-delivery">
//     <span class="product-town">Доставка в Одессу</span>
// </div>
// <div class="product-card_delivery">
//     <div class="product-card_delivery-next1">
//     <span class="product-card_delivery-text1">Самовывоз из магазина Promise Me</span>
// <span class="product-card_delivery-text2">Бесплатно</span>
//     <span class="product-card_delivery-text3">Забрать в шоуруме через 5 мин</span>
// </div>
// <br>
// <div class="product-card_delivery-next2">
//     <span class="product-card_delivery-text4">Курьер по вашему адресу</span>
// <span class="product-card_delivery-text5">Бесплатно</span>
//     <span class="product-card_delivery-text6">Доставим сегодня</span>
// </div>
// <br>
// <div class="product-card_delivery-next3">
//     <span class="product-card_delivery-text4">Самовывоз из Новой Почты</span>
// <span class="product-card_delivery-text5">Бесплатно</span>
//     <span class="product-card_delivery-text6">Отправим сегодня</span>
// </div>
// </div>
// <div class="product-card_information-block">
//     <p class="information_block">Оплата</p>
//     <span>Наличными курьеру, Наложенный платеж, Наличными / картой в магазине,
//     Оплата картой на сайте
// </div>
// </div>
// </div>
// <div class="product-card_information_product-reviews">
//     <h5>Отзывы</h5>
//     <div class="product-reviews-content"></div>
//     </div>
//     </div>
