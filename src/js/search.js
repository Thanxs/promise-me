function search(products){
    let searchInput = document.querySelector('.header__search');
    let searchButton = document.querySelector('.header__seacrh-wrap a');
    
    searchButton.addEventListener('click', searchBegin);
    searchInput.addEventListener('keypress', (e)=>{
        if (e.key === 'Enter'){
            e.preventDefault();
            searchBegin();

        }
    });

function findItems(){
    let inputArr = searchInput.value.trim().split(' ');
    let arraySearchResult = products.filter(function (item){
        return inputArr.every(function (inputItem){
            return searchWordVerification(item.name, inputItem);
        });
    });
    return arraySearchResult;
}
function searchBegin(){
        let arraySearchResult = findItems();
        if (arraySearchResult.length > 0){
            showProductsSection(arraySearchResult);
            
            searchHintsWindow.innerHTML="";
            document.querySelector(".products").scrollIntoView(300); //scroll

        }
    }

    let searchInputLast = searchInput.value;
    searchInput.addEventListener('focus', searchHints);
    function verifyChangeOfSearchInput(){
        
        if(searchInput.value !== searchInputLast){
            searchInputLast = searchInput.value;
            addHintsWindow(findItems()); 
        } 
    }

    function searchHints(){
    searchInputLast="";
    const searchIntervalId = setInterval(verifyChangeOfSearchInput, 500);
    searchInput.addEventListener('blur', () => clearInterval(searchIntervalId));
    }

    document.addEventListener('keydown', (e) => {
        if (e.code == 'Escape'){
            console.log('item')
            searchInput.blur();
            searchHintsWindow.innerHTML="";
        }
    })
    document.addEventListener('click', (e) => {
            if(e.target !== searchHintsWindow){
                searchHintsWindow.innerHTML="";
            }
        
    })

    searchHintsWindow.addEventListener('click', (event)=>{
        
        let target = event.target;
        let id;
        if ((target.getAttribute('class')) && target.getAttribute('class').includes('search-item')){
            id = target.dataset.itemId;
        }else{
            id = target.parentElement.dataset.itemId;
        }
        if(id){
            showSelectedProduct([products[id-1]]);
            searchHintsWindow.innerHTML="";
            document.querySelector(".products").scrollIntoView(300); //scroll
        }
    })
}

let searchHintsWindow = document.createElement('div');
searchHintsWindow.setAttribute('class', 'search-modal');

function addHintsWindow(itemsArray){
    const productsContainer = document.querySelector('.header__form');
    searchHintsWindow.innerHTML="";
    productsContainer.append(searchHintsWindow);

    itemsArray.slice(0,10).forEach((item)=>{
        /////  class .hint  редактирвать 
        searchHintsWindow.innerHTML +=`<div class = "dropdown-item search-item" data-item-id="${item.id}"><img src="${item.src}"><p>${item.name}</p></div>`;
    })
}

function searchWordVerification(string, word){
    if (word.length < 1) return false; // колво букв в проверке
    return (string.toUpperCase().indexOf(word.toUpperCase()) + 1);

}
