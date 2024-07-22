


$(document).ready(function() {
    $('#bar').on('click', function() {
        $(".side-bar-menus").animate({ left: "0%" }, 1000);
        $(".side-bar").animate({ left: "17%" }, 1000);
        $("ul").slideDown(1000);
       
        
        openSide();
    });

    $('#close').on('click', function() {
        $(".side-bar-menus").animate({ left: "-17%" }, 1000);
        $(".side-bar").animate({ left: "0%" }, 1000);
        $("ul").slideUp(1000);
        
        closeSide();

    });

    function openSide() {
        let opn = document.querySelector("#bar");
        let close = document.querySelector("#close");
        close.classList.remove('d-none');
        opn.classList.add('d-none');
    }

    function closeSide() {
        let opn = document.querySelector("#bar");
        let close = document.querySelector("#close");
        close.classList.add('d-none');
        opn.classList.remove('d-none');
    }
  
    $(window).scroll(function() {
        let windowTop = $(window).scrollTop();
        if (windowTop > 300) {
            $('.to-start').fadeIn(500);
        } else {
            $('.to-start').fadeOut(500);
        }
    });
    
    $('.to-start').on("click", function() {
        $('html, body').animate({ scrollTop: 0 }, 'slow');
    });




    $('#now-playing').on('click', function() {
        $('.now-playing').fadeIn(100);
        $(".main").fadeOut(100);
        $('.Popular').fadeOut(100);
        $('.top-rated').fadeOut(100);
      
        $('.Trending').fadeOut(100);
        $('.UPcoming').fadeOut(100);
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        document.querySelector(".now-playing").classList.remove('d-none')
        
    });

    $('#Popular').on('click', function() {
        $(".main").fadeOut(100);
        $('.Popular').fadeIn(100);
        $('.top-rated').fadeOut(100);
        
        $('.Trending').fadeOut(100);
        $('.now-playing').fadeOut(100);
        $('.UPcoming').fadeOut(100);
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        document.querySelector(".Popular").classList.remove('d-none')
    });

    $('#top-rated').on('click', function() {
        $(".main").fadeOut(100);
        $('.Popular').fadeOut(100);
        $('.top-rated').fadeIn(100);
       
        $('.Trending').fadeOut(100);
        $('.now-playing').fadeOut(100);
        $('.UPcoming').fadeOut(100);
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        document.querySelector(".top-rated").classList.remove('d-none')
    
    });

    $('#Trending').on('click', function() {
        $(".main").fadeOut(100);
        $('.Popular').fadeOut(100);
        $('.top-rated').fadeOut(100);
        
        $('.Trending').fadeIn(100);
        $('.now-playing').fadeOut(100);
        $('.UPcoming').fadeOut(100);
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        document.querySelector(".Trending").classList.remove('d-none')
    });

   
    $('#UPcoming').on('click', function() {
        $(".main").fadeOut(100);
        $('.Popular').fadeOut(100);
        $('.top-rated').fadeOut(100);
       
        $('.Trending').fadeOut(100);
        $('.now-playing').fadeOut(100);
        $('.UPcoming').fadeIn(100);
        $('html, body').animate({ scrollTop: 0 }, 'slow');
        document.querySelector(".UPcoming").classList.remove('d-none')
    });


})


// contact
let name = document.getElementById("#name")
let phone = document.getElementById("#phone")
let password = document.getElementById("#password")
let email = document.getElementById("#email")
let Age = document.getElementById("#Age")
let repassword = document.getElementById("#repassword")
let searchFlet = document.getElementById("#search-Flet")

function ValidateInputes(element){
    var regex = {
        name:/^[a-z0-9_-]{3,15}$/,
        phone:/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        password:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        email:/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
        Age:/^(?:[1-9]|[1-9][0-9]|1[0-9]{2}|200)$/,
        repassword:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,

    }
    if(regex[element.id].test(element.value) == true) {
        element.classList.add('is-valid')
        element.classList.remove('is-invalid')
        element.nextElementSibling.classList.replace('d-block','d-none')
        console.log('match');
        
        return true;
    }else{
        element.classList.add('is-invalid')
        element.classList.remove('is-valid')
        element.nextElementSibling.classList.replace('d-none','d-block')
        console.log('not');
        
        return false;
    }
}

  
// default 


const APIKey = `34036fcea7e7c45184fa6b9b36ff112b`
const baseURL = `https://api.themoviedb.org/3/movie/157336?`



document.querySelector("#search").addEventListener("input", search);

async function getMovies(numberOfMovies) {
    try {
        
        await new Promise(resolve => setTimeout(resolve, 2000)); 

        let response = await fetch('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', {
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNDAzNmZjZWE3ZTdjNDUxODRmYTZiOWIzNmZmMTEyYiIsIm5iZiI6MTcyMTU5MDc1My41MTg1NTgsInN1YiI6IjY2OWQ0ZDNjZDA2NDAyZGEwNTRmZmJlZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.zbFuGCJ3oakGoXG4_NWjs-olxjjr_3WtfZgHGCkK5v4',
                'Accept': 'application/json'
            }
        });
        let finalResponse = await response.json();
        
        let defaultMovies = finalResponse.results.slice(0, numberOfMovies); 
        console.log(defaultMovies);
        
        
        window.movies = defaultMovies;

        
        setTimeout(() => {
            displayMovies(defaultMovies); 
        }, 1000); 
    } catch (error) {
        console.log(error);
    }
}

getMovies(20);

function displayMovies(movies) {
    let container = '';
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
        
        container += `
        <div class="col-md-4 main-card">
            <div class="m-2 film-card">
                <img src="https://image.tmdb.org/t/p/w500${movies[i].poster_path}" class="w-100" alt="${movies[i].title}">
                <div class="layer">
                    <h2 class="text-center">${movies[i].title}</h2>
                    <p>${movies[i].overview}</p>
                    <p>Release Date: ${movies[i].release_date}</p>
                    <div class="rating d-flex align-items-center">
                        <span class="stars">${starsHtml}</span>
                        <span class="rate ms-2">${(rating * 2).toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    document.getElementById("movie-card").innerHTML = container;
}

function search(event) {
    const searchValue = event.target.value.toLowerCase();
    const filteredMovies = window.movies.filter(movie => movie.title.toLowerCase().includes(searchValue));
    displayMovies(filteredMovies);
}



