(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    const responseContainer = document.querySelector('#response-container');
    let searchedForText;
    

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        // IMAGES
        // Unsplash API 1b1065a6955eace68bf9819685f26a8f48e397e4dad464e78f056e4a9d57e4be
        let imgRequest = new XMLHttpRequest();
        imgRequest.onload = addImage;
        imgRequest.onerror = function(err){
            resquestError(err, 'image');
        };
        imgRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        imgRequest.setRequestHeader('Authorization', 'Client-ID 1b1065a6955eace68bf9819685f26a8f48e397e4dad464e78f056e4a9d57e4be');
        imgRequest.send();

        // ARTICLES
        // NY API 7838b57900a2473b8a3660989df9766a
        let articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchedForText}&api-key=7838b57900a2473b8a3660989df9766a`);
        articleRequest.send();
    });
    
    

    function addImage(){
        const data = JSON.parse( this.responseText );
        
        if (data && data.results && data.results[0]){
            const firstImage = data.results[0];
            htmlContent = `<figure>
                <img src="${firstImage.urls.regular}" alt="${searchedForText}">
                <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`;
        } else {
            htmlContent = '<div class= "error-no-image">No images available</div>';
        }
        responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
    }
    
    function addArticles () {
        let htmlContent = '';
        const data = JSON.parse( this.responseText );
        
        if (data.response && data.response.docs && data.response.docs.length > 1){
            htmlContent = '<ul>' + data.response.docs.map(article => `<li>
                    <h2><a href="${article.web_url}">${article.headline.main}</a><h2>
                    <p>${article.snippet}</p>
                </li>`
            ).join('')+ '</ul>';
        } else {
            htmlContent = '<div class= "error-no-articles">No articles available</div>';
        }
        responseContainer.insertAdjacentHTML('beforeend', htmlContent);
    }
})();


