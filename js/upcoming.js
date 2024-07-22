document.querySelector("#UPcoming").addEventListener("click", () => upMovies(20));
document.querySelector("#search").addEventListener("input", search);

async function upMovies(numberOfMovies) {
    try {
        let response = await fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDAzNmZjZWE3ZTdjNDUxODRmYTZiOWIzNmZmMTEyYiIsIm5iZiI6MTcyMTU5MDc1My41MTg1NTgsInN1YiI6IjY2OWQ0ZDNjZDA2NDAyZGEwNTRmZmJlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zbFuGCJ3oakGoXG4_NWjs-olxjjr_3WtfZgHGCkK5v4',
                'Accept': 'application/json'
            }
        });
        let upResponse = await response.json();
        
        let upMovies = upResponse.results.slice(0, numberOfMovies); 
        console.log(upMovies);
        window.upmovies = upMovies;
        displayupMovies(upMovies); 
    } catch (error) {
        console.log(error);
    }
}

upMovies(20);

function displayupMovies(movies) {
    let upcontainer = '';
    for (let i = 0; i < movies.length; i++) {
        const rating = movies[i].vote_average / 2; 
        const fullStars = Math.floor(rating);
        const halfStar = rating - fullStars >= 0.5 ? 1 : 0;
        const emptyStars = 5 - fullStars - halfStar;
        
        let starsHtml = '';
        for (let j = 0; j < fullStars; j++) {
            starsHtml += '<i class="fa-solid fa-star text-warning"></i>';
        }
        if (halfStar) {
            starsHtml += '<i class="fa-solid fa-star-half-alt text-warning"></i>';
        }
        for (let k = 0; k < emptyStars; k++) {
            starsHtml += '<i class="fa-regular fa-star"></i>';
        }
        
        upcontainer += `
        <div class="col-md-4 main-card">
        <div class="m-2 film-card">
            <img src="https://image.tmdb.org/t/p/w500${movies[i].poster_path}" class="w-100" alt="${movies[i].title}">
            <div class="layer">
                <h2 class="text-center">${movies[i].title}</h2>
                <p>${movies[i].overview}</p>
                <p>Release Date: ${movies[i].release_date}</p>
                <div class="rating">
                <span class=" d-block my-1">${starsHtml}</span>
                <span class="rate">${(rating * 2).toFixed(1)}</span>
                </div>
            </div>
        </div>
        </div>
        `;
    }
    document.getElementById("up-movie-card").innerHTML = upcontainer;
}

function search(event) {
    const searchValue = event.target.value.toLowerCase();
    const filteredMovies = window.upmovies.filter(movie => movie.title.toLowerCase().includes(searchValue));
    displayupMovies(filteredMovies);
}
