const wrapper = document.getElementById('wrapper');
const headerPayment = document.querySelector('.header__payment');

headerPayment.addEventListener('click', () => {
    $(wrapper).append(`<div class="modal fade" id="paymentModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                       <div class="modal-dialog" role="document">
                         <div class="modal-content header__service-modal">
                           <div class="modal-header">
                             <h3 class="modal-title" id="exampleModalLongTitle">Вы можете воспользоваться любым вариантом оплаты</h3>                             
                             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                               <span aria-hidden="true">&times;</span>
                             </button>
                           </div>
                           <div class="modal-body">                            
                                <div>
                                    <div class="header__payment-img"><img src="../images/payment/payment-money.svg" alt=""></div>
                                    <h5>Наличными</h5>
                                    <div>Такой способ оплаты возможен только в магазине, при получении покупки. Оплата производится только в гривне – национальной валюте. Чек, подтверждающий покупку, выдается обязательно каждому покупателю.</div>
                                </div>
                                <div>
                                    <div class="header__payment-img"><img src="../images/payment/payment-bill.svg" alt=""></div>
                                    <h5>Безналичная оплата</h5>
                                    <div>Во время оформления заказа можно выбрать способ "Безналичная оплата". После обработки заказа, Вы получите на почту счет-фактуру. Её можно оплатить в любом отделении банка или с помощью Вашего расчетного счета.</div>
                                </div>
                                <div>
                                    <div class="header__payment-img"><img src="../images/payment/payment-card.svg" alt=""></div>
                                    <h5>Оплата банковской картой на сайте</h5>
                                    <div>С помощью любой банковской карты Visa или MasterCard на сайте можно осуществить быструю оплату заказа. Во время оформления покупки, выбрав способ «Оплата картой», Вы перейдете на страницу системы безопасных платежей банка, где Вам необходимо будет подтвердить оплату.</div>
                                </div>
                                <div>
                                    <div class="header__payment-img"><img src="../images/payment/payment-after.svg" alt=""></div>
                                    <h5>Наложенный платеж</h5>
                                    <div>Оплата наложенным платежом осуществляется после проверки Вами посылки на целостность содержимого, его надлежащего состояния, по прибытию её на место назначения. Обратите внимание, что во время получения заказа, Вам необходимо будет подписать акт приема-передачи, который подтвердит тот факт, что Вас лично всё устраивает.</div>
                                </div>                                
                                <div>
                                    <div class="header__payment-img"><img src="../images/payment/payment-timer.svg" alt=""></div>
                                    <h5>Мгновенная рассрочка</h5>
                                    <div>В нашем Интернет-магазине вы можете купить дорогие товары в рассрочку, на более длительный срок - до 24 месяцев с минимальной комиссией. Плата за сервис составляет 2,9% от суммы покупки и списывается вместе с ежемесячным платежом по сервису.</div>
                                </div>                            
                           </div>                           
                         </div>
                       </div>
</div>`);
});
