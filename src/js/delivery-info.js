const headerDelivery = document.querySelector('.header__delivery');

headerDelivery.addEventListener('click', () => {
    $(wrapper).append(`<div class="modal fade" id="deliveryModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                       <div class="modal-dialog" role="document">
                         <div class="modal-content header__service-modal">
                           <div class="modal-header">
                             <h3 class="modal-title" id="exampleModalLongTitle">Выбирайте способ доставки</h3>                             
                             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                               <span aria-hidden="true">&times;</span>
                             </button>
                           </div>
                           <div class="modal-body">                            
                                <div>
                                    <div class="header__delivery-img"><img src="../images/delivery/delivery-bus.svg" alt=""></div>
                                    <h5>Забрать из магазина (Одесса)</h5>
                                    <div>Заказывайте на сайте – забирайте на месте. Если удобно, покупку можно получить лично в магазине «Шо». Для этого необходимо всего лишь оформить заказ на сайте и обратиться по адресу: г. Одесса, ул. Канатная, 22.
Стоимость - Бесплатно;

Срок доставки на следующий день с 13:00 до 20:00 (кроме субботы и воскресенья, в таком случае доставка переносится на понедельник)</div>
                                </div>
                                <div>
                                    <div class="header__delivery-img"><img src="../images/delivery/delivery-box.svg" alt=""></div>
                                    <h5>Доставка курьером</h5>
                                    <div>Курьерская служба магазина «Promise ME» осуществляет адресную доставку по Одессе. Чтобы получить заказ в любом удобном месте, во время оформления заказа просто выберите этот способ доставки.
Стоимость курьерской доставки:
- от 1000 грн. - бесплатно;
- до 1000 грн.- 45 грн.

Заказ до 12 часов - доставка товара в день заказа с 14:00 до 18:00. Заказ после 12:00 - доставка товара на следующий день (кроме воскресенья, в таком случае доставка переносится на понедельник)</div>
                                </div>
                                <div>
                                    <div class="header__delivery-img"><img src="../images/delivery/delivery-nova-poshta-color.svg" alt=""></div>
                                    <h5>“Новая почта”</h5>
                                    <div>Воспользовавшись услугами службы доставки «Новая почта», вы сможете получить посылку в кратчайшие сроки, предварительно указав номер ближайшего отделения в вашем населенном пункте. Оплата осуществляется в соответствии с условиями компании перевозчика.
Стоимость доставки:
- от 1500 грн. - бесплатно;
- до 1500 грн.- 60 грн.
Обычно доставка занимает 1- 3 дня. Точную дату доставки товара Вам сообщит менеджер интернет-магазина при оформлении заказа.</div>
                                </div>                                                        
                           </div>                           
                         </div>
                       </div>
</div>`);
});
