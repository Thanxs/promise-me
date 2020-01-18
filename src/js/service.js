const service = document.querySelector('.header__service span');
service.addEventListener('click', () => {
   $(wrapper).append(`<div class="modal fade" id="serviceModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
                       <div class="modal-dialog" role="document">
                         <div class="modal-content header__service-modal">
                           <div class="modal-header">
                             <h3 class="modal-title" id="exampleModalLongTitle">Сервисный центр Promise Me</h3>
                             <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                               <span aria-hidden="true">&times;</span>
                             </button>
                           </div>
                           <div class="modal-body">
                            <h4>Гарантийный и послегарантийный сервис.      
                            </h4>                            
                            <div class="row">
                                <div class="col-md-6">
                                    <h5>10 рабочих дней на все</h5>
                                    <div>Любой гарантийный ремонт или плановое обслуживание займет до 10 рабочих дней</div>
                                </div>
                                <div class="col-md-6">
                                    <h5>Отслеживайте статус ремонта онлайн</h5>
                                    <div>Просто введите номер для отслеживания и контролируйте все этапы нашей работы</div>
                                </div>
                                <div class="col-md-6">
                                    <h5>Онлайн-консультации через видеочат, Viber и Telegram</h5>
                                    <div>Бесплатно проконсультируем и поможем настроить ваше устройство удаленно</div>
                                </div>
                                <div class="col-md-6">
                                    <h5>Отремонтируем даже без гарантийного талона</h5>
                                    <div>Мы можем проверить серийный номер устройства в нашей базе данных. Гарантийный срок будет исчисляться с момента отгрузки товара со склада или магазина</div>
                                </div>
                                <div class="col-md-6">
                                    <h5>Гарантия на ремонт и запчасти</h5>
                                    <div>Мы используем только оригинальные запчасти и даем гарантию на свою работу</div>
                                </div>
                                <div class="col-md-6">
                                    <h5>Сертифицированные мастера</h5>
                                    <div>У всех наших мастеров есть сертификат соответствия ISO 9001</div>
                                </div>
                            </div>
                           </div>
                           <div class="modal-footer header__service-modal-footer">
                               <h4>Адреса и телефоны</h4>
                               <h5>Сервисный центр Promise Me</h5>
                               <p>Прием на сервис, ремонт</p>
                               <div>Одесса, ул. Канатная, 22</div>                               
                               <div><a href="tel:3804829999999">+38 (0482) 999 99 99</a></div>
                               <div><a href="tel:380999999999">+38 (099) 999 99 99</a></div>   
                           </div>
                         </div>
                       </div>
</div>`);
});
