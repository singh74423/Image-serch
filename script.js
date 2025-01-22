const accessKey = 'mVHnIk39bCh8CzQrFKwANAHesqHl9xqr2xm2Q1IHK6I';
const searchForm = document.querySelector('form');
const searchInput = document.querySelector('.search-input');
const imagesContainer = document.querySelector('.images-container');
const loadMoreBtn = document.querySelector('.loadMoreBtn');
let page = 1;
// Function to fetch images using Unsplash API
const fetchImages = async(query, pageNo ) => {
    if(pageNo === 1) {
        imagesContainer.innerHTML ='';
    }
     

    const url = `https://api.unsplash.com/search/photos?query=${query}&per_page=28&page=${pageNo}&client_id=${accessKey}`;
    
    const response = await fetch(url);
    const data = await response.json();

    // Check if data is returned correctly
    if (data.results && data.results.length > 0) {
        data.results.forEach(photo => {
            // creating image div

            const imageElement = document.createElement('div');
            imageElement.classList.add('imageDiv');
            imageElement.innerHTML = `<img src="${photo.urls.regular}" alt="${photo.alt_description}"/>`;
            
            // Creating overlay
            const overlayElement = document.createElement('div');
            overlayElement.classList.add('overlay');

            //creating overlay text
            const overlayText = document.createElement('h3');
            overlayText.innerText = `${photo.alt_description}`;

            overlayElement.appendChild(overlayText);
            imageElement.appendChild(overlayElement);  // Corrected here
            imagesContainer.appendChild(imageElement); // Append imageElement, not imagesElement
        });

        if (data.total_pages && data.total_pages === pageNo) {
            loadMoreBtn.style.display = "none";
        } else {
            loadMoreBtn.style.display = "block";
        }
        
    } else {
        imagesContainer.innerHTML = '<h2>No images found for this query.</h2>';
    }

    
}

// Adding Event Listener to Search Form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputText = searchInput.value.trim();  // Get the input value

    if (inputText !== '') {
        page = 1;
        fetchImages(inputText,page); // Fetch images if input is valid
    } else {
        imagesContainer.innerHTML = `<h2>Please enter a search query.</h2>`; // If no input
    }
});

//Adding Event Listner to Load more button to fetch more images

loadMoreBtn.addEventListener('click',() => {
    fetchImages(searchInput.value.trim(),++page);
});