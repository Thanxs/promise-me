
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

function addItemToTrash(id, number){
    if(localStorageGet().trash.every((item) =>{
            return !(item.id === id);
            })
        ){
        localInfo.trash.push(new ItemInTrash(id, number));
        localStorageSave(localInfo);
    }
}
function removeItemFromTrash(id){
    localInfo.trash.forEach((item, i)=>{
        if(item.id === id){
            localInfo.trash.splice(i,1);
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
				<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				<button type="button" class="btn btn-primary">Save changes</button>
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
    let productReviewsWindow =  document.querySelector('.product-card_information_product-reviews');
    let arrayComments = CommentsByItemId(product[0].id);
    console.log(product[0].id)
    if(arrayComments){
        arrayComments.forEach(item=>{
            console.log('items')
    
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
            productReviewsWindow.appendChild(div);    
        })
    }
}

