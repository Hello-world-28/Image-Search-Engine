//stores API key (for authentication with the API).

const accessKey = "Dr5EhL5yo4CMTzc-EJzdJvmOuSKWfuwsbPh2Fzo1qZ8"

//HTML elements
//Each variable here holds a reference to a DOM element
//pointers to elements in the page
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");//where images will be shown
const showMoreBtn = document.getElementById("show-more-btn");


let keyword = ""; //stores the current search word entered by user
let page = 1;//keeps track of which page of results you’re on
async function searchImage(){ //asynchronous, meaning you can use await inside it
    keyword = searchBox.value;//reads what user typed in the input box

    //Backticks (`) → template literal (allows embedding variables directly)
    //${page}, ${keyword}, ${accessKey} → substituted with their current values
    //per_page=12 → asks API to return 12 results at once.
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    
    //await → pauses until response comes back
    const response = await fetch(url); //sends an HTTP request to the API
    const data = await response.json();//response.json() → converts raw response (JSON text) into a JS object
    //now holds parsed data (probably an object with results array)

    if(page == 1){
        searchResult.innerHTML = "";//clears old results before adding new ones (so new search doesn’t append to old images)
    }

    const results = data.results; // Stores only the results array from the data

    //data is what you got back from the API call (await response.json()).
    //results is assumed to be an array inside that JSON response.
    //Each result is one object in that array.
    results.map((result) =>{//.map() → goes through each item in the array results.Each result contains image data from API.

        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";//target="_blank" → opens link in a new tab.
        
        imageLink.appendChild(image);//First: put <img> inside <a>.
        searchResult.appendChild(imageLink);//Then: put <a> inside the searchResult div.
    })
    showMoreBtn.style.display = "block";//Makes the "Show More" button visible after results are loaded.
    //(Probably hidden by default in CSS: display: none;)
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();//e.preventDefault() → stops form from reloading page (default HTML form behavior).
    page = 1;
    searchImage();
})

showMoreBtn.addEventListener("click", ()=>{
    page++;
    searchImage();
})

/*
It’s “by default” because that’s how HTML forms were designed from the very beginning: to submit data to the server and reload with a new page.
We cancel it with e.preventDefault() when we want to handle the submission ourselves using JavaScript.
*/