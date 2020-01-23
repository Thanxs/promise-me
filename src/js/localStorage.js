
function localStorageSave(info){ //  обжект
    let data = JSON.stringify(info);
    localStorage.setItem('localInfo', data)
}

function localStorageGet(){
    let data = localStorage.getItem('localInfo');
    if(data) {
        localInfo = JSON.parse(data)
    }else{
        localInfo = {
            comments:[],  //отзывы
            trash:[]   //корзина
                        //шотоеще
        }
    }
    showItemsCounter();
    return localInfo;
}

function Reviews(...arr){
    [this.id, this.user, this.comment] = [...arr];
    this.data = new Date();
} 

function addItemComments(id, user, comment){
    localInfo.comments.push(new Reviews(id, user, comment));
    localStorageSave(localInfo);
}

function CommentsByItemId(id){
    return localStorageGet().comments.filter(item => {
        return (item.id === id) //   "id" - string
        console.log(id, (item.id === (id)) )
    })
}

function ItemInTrash(...arr){
    [this.id, this.number] = [...arr];
} 
function numberOfItemsInTrash(){
    return localInfo.trash.length;
}
function showItemsCounter(){
    const counters = document.querySelectorAll('.fa-shopping-cart');
    counters.forEach(item =>{
        item.innerHTML = numberOfItemsInTrash();
    })
}


function addItemToTrash(id, number){
    if(localStorageGet().trash.every((item) =>{
            return !(item.id === id);
            })
        ){
        localInfo.trash.push(new ItemInTrash(id, number));
        showItemsCounter();
        localStorageSave(localInfo);
    }
}
function removeItemFromTrash(id){
    localInfo.trash.forEach((item, i)=>{
        if(item.id === id){
            localInfo.trash.splice(i,1);
            showItemsCounter();
            localStorageSave(localInfo);
        }
    })
}
function ItemInTrashIncrease(id){
    localInfo.trash.forEach((item, i)=>{
        if(item.id === id){
            localInfo.trash[i].number++;
            localStorageSave(localInfo);
        }
    })
}
function ItemInTrashDecrease(id){
    localInfo.trash.forEach((item, i)=>{
        if(item.id === id){
            localInfo.trash[i].number--;
            localStorageSave(localInfo);
        }
    })
}






function otziv(product){
    let otz = document.createElement('div');
    otz.innerHTML =`
<div class="reviews none-displayed" tabindex="-1" role="dialog">
	<div class="modal-dialog " role="document">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">${product[0].name}</h5>
			</div>
			<div class="modal-body">
				<div class=""><img src="${product[0].src}"></div>
				<p></p>
			</div>

			<div class="input-group input-group-sm mb-3">
				<div class="input-group-prepend">
					<span class="input-group-text" id="inputGroup-sizing-sm">Выше имя</span>
				</div>
				<input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
			</div>
			<div class="input-group">
				<div class="input-group-prepend">
					<span class="input-group-text">Оставить отзыв</span>
				</div>
				<textarea class="form-control" aria-label="With textarea"></textarea>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Закрыть</button>
				<button type="button" class="btn btn-primary">Сохранить отзыв</button>
			</div>
		</div>
	</div>
</div>
`
    document.querySelector('#wrapper').append(otz);
    document.querySelector('.reviews').classList.remove('none-displayed');
    let btnSave = document.querySelector('.reviews .btn-primary');
    let btnClose = document.querySelector('.reviews .btn-secondary');

    let reviewsText = document.querySelector('.reviews textarea');
    let reviewsName = document.querySelector('.reviews input');
    btnClose.addEventListener('click',()=>{
        otz.remove();
    })
    btnSave.addEventListener('click', (e)=>{
        if((reviewsName.value)&&(reviewsText.value)){
            addItemComments(product[0].id, reviewsName.value, reviewsText.value)
            console.log(reviewsText.value)
            otz.remove();
        }
    })
}



function showProductReviews(product){
    let productReviewsWindow = document.querySelector('.product__info');

    let arrayComments = CommentsByItemId(product[0].id);
    console.log(product[0].id, arrayComments)
    if(arrayComments.length > 0){

        let productRevwies = document.createElement('div');
        productRevwies.innerHTML = `<div class="product-card_information_product-reviews">
        <h2>Отзывы</h2>
        <div class="product-reviews-content"></div>
        </div>`;

        productReviewsWindow.appendChild(productRevwies);
        let productReviwsContent = document.querySelector('.product-reviews-content')

        arrayComments.forEach(item => {
            // console.log('items')
            let div = document.createElement('div');
            div.innerHTML=`
            <div class="product-review-window">
                <div>
                <p class="review-name">${item.user}</p>
                <p class="review-date">${moment(Date.parse(item.data)).format('MMMM Do YYYY , h:mm:ss a')} </p>
                </div>
                    <p class="comment">${item.comment}</p>
                    
                </div>
                  `;
            productReviwsContent.appendChild(div);    
        })
    }
}


function orderForm(){ // при появлеии формы
    const btnFormOrder = document.querySelector('.button_basket_price');
    const checkoutContent = document.querySelector('.checkoutContent_main');

    let namesArray = [
        'name',
        'last-name',
        'tel',
        'e-mail'
    ]
    let patternsArray = [
        /^[А-ЯЁ][а-яё]*$/,
        /^[А-ЯЁ][а-яё]*$/,
        /^\+38\d{3}\d{7}$/,
        /^\w+@\w+.\w{2,4}$/
    ]
    btnFormOrder.addEventListener('click', checkOrderForm);

    function checkOrderForm(){
               
        
        initNormalInputs();

        let valuesArray = namesArray.map( item =>{
            return checkoutContent.elements[item].value;
        })

        let checkTrigger = 0;
        valuesArray.forEach( (item , i ) =>{
            if (!verifyInputValue (item, i)){
                showFalseInputs(i);
                checkTrigger++; 
            }
        })
            if (checkTrigger === 0 ){
                formInputAccess();
            }
        function formInputAccess(){
            console.log('data recieved saccessfuly');
        }
       function verifyInputValue(item , i){
           return patternsArray[i].test(item);
       }

       function showFalseInputs(i){
        checkoutContent.elements[namesArray[i]].classList.add('error');
       }
       function initNormalInputs(){
        namesArray.forEach(item => {
            checkoutContent.elements[item].classList.remove('error');
        })

       }
    }
}