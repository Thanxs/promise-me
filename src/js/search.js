function search(products){
    let searchInput = document.querySelector('.header__search');
    let searchButton = document.querySelector('.header__seacrh-wrap a');

    searchButton.addEventListener('click', ()=>{
        let inputArr = searchInput.value.trim().split(' ');
        let arraySearchResult = products.filter(function (item){
            return inputArr.every(function (inputItem){
                return searchWordVerification(item.name, inputItem);
            })
        })
        if (arraySearchResult.length > 0){
            showProductsSection(arraySearchResult)
        }
    })
}

function searchWordVerification(string, word){
    if (word.length < 1) return false; // колво букв в проверке
    return (string.toUpperCase().indexOf(word.toUpperCase()) + 1);

}
