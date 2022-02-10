// API Section

const apiKey = "87809fac923f4d67ae2a400cc7e7b85a";

const url = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc";

const search = "https://api.themoviedb.org/3/search/movie?query=";


// API Request
async function fecthMovies(endpoint, key) {
    const url = endpoint + '&api_key=' + key;
    const response = await fetch(url);
    const data = await response.json();

    renderMovies(data.results);
}

fecthMovies(url, apiKey);


// Render Data

const main = document.querySelector('.main');


function renderMovies(movies) {
    main.innerHTML = '';

    movies.map((movie) => {
        const title = movie.original_title;
        const poster = movie.poster_path;
        const rating = movie.vote_average;
        const desc = movie.overview;
        const imageUrl = "https://image.tmdb.org/t/p/w500/" + poster;
        
        let ratingClass = 'green';

        if(rating >= 5 && rating < 8){
            ratingClass = 'orange';
        }else if(rating < 5){
            ratingClass = 'red';
        }

        main.innerHTML += 
        `
            <div class="movie">
                <img
                    src="${imageUrl}"
                    alt="poster"
                />
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${ratingClass}">${rating}</span>
                </div>
                <div class="overview">
                    <h3>Overview</h3>
                    <p>${desc}</p>
                </div>
            </div>
        `
    });
}



// Search Data 

const form = document.querySelector('form');
const input = form.querySelector('#search');

form.addEventListener('submit', function(e){
    e.preventDefault();

    const inputVal = input.value.trim();
    const url = search + inputVal; 

    fecthMovies(url, apiKey);

});


// Modification 

// Pagination (url - "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&page=3", atleast 10 pages)
// Sort functionality - Popularity, Rating, Revenue, Release Date
// Detail Individual Movie Page - (url - "https://api.themoviedb.org/3/movie/id/apikey")