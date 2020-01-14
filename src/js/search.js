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

}

function searchWordVerification(string, word){
    if (word.length < 1) return false; // колво букв в проверке
    return (string.toUpperCase().indexOf(word.toUpperCase()) + 1);

}

let searchHintsWindow = document.createElement('div');

function addHintsWindow(itemsArray){
    const productsContainer = document.querySelector('.products');
    searchHintsWindow.innerHTML="";
    productsContainer.before(searchHintsWindow);

    itemsArray.forEach((item)=>{
        /////  class .hint  редактирвать 
       searchHintsWindow.innerHTML +=`<div class = "dropdown-item search-item"><img src="${item.src}"><p>${item.name}</p></div>`;
    })

}


