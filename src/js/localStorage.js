
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
